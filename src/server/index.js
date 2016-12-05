/* @flow */
import 'source-map-support/register';
import path from 'path';
import uuid from 'uuid';
import appRoot from 'app-root-dir';
import express from 'express';
import type { $Request, $Response, NextFunction } from 'express';
import compression from 'compression';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import httpProxy from 'http-proxy';
import { notEmpty } from '../common/core/utils/guards';
import boldrSSR from './middleware/boldrSSR';

// these values are to inform the proxy, which is running here, where our backend
// api is located.
const API_PORT = 2121;
const API_HOST = process.env.API_HOST || 'localhost';

const appRootPath = appRoot.get();
const proxyTo = `http://${API_HOST}:${API_PORT}/api/v1`;
// Create Express server.
const app = express();
app.use(compression());

// Attach a unique "nonce" to every response.  This allows use to declare
// inline scripts as being safe for execution against our content security policy.
// @see https://helmetjs.github.io/docs/csp/

app.use((req: $Request, res: $Response, next: NextFunction) => {
  res.locals.nonce = uuid(); // eslint-disable-line no-param-reassign
  next();
});
app.use(cookieParser());
const proxy = httpProxy.createProxyServer({
  target: proxyTo,
});

app.use((req: $Request, res: $Response, next: NextFunction) => {
  res.setHeader('Service-Worker-Allowed', '/');
  res.setHeader('X-Forwarded-For', req.ip);
  return next();
});
// Don't expose any software information to hackers.
app.disable('x-powered-by');

// Prevent HTTP Parameter pollution.
app.use(hpp());

// app.use(helmet.contentSecurityPolicy(cspConfig));

// The xssFilter middleware sets the X-XSS-Protection header to prevent
// reflected XSS attacks.
// @see https://helmetjs.github.io/docs/xss-filter/
app.use(helmet.xssFilter());

// Frameguard mitigates clickjacking attacks by setting the X-Frame-Options header.
// @see https://helmetjs.github.io/docs/frameguard/
app.use(helmet.frameguard('deny'));

// Sets the X-Download-Options to prevent Internet Explorer from executing
// downloads in your site’s context.
// @see https://helmetjs.github.io/docs/ienoopen/
app.use(helmet.ieNoOpen());

// Don’t Sniff Mimetype middleware, noSniff, helps prevent browsers from trying
// to guess (“sniff”) the MIME type, which can have security implications. It
// does this by setting the X-Content-Type-Options header to nosniff.
// @see https://helmetjs.github.io/docs/dont-sniff-mimetype/
app.use(helmet.noSniff());

// Proxying all requests matching this endpoint
app.use('/api/v1', (req: $Request, res: $Response) => {
  res.setHeader('Content-Type', 'application/json');
  proxy.web(req, res, { target: proxyTo });
});

proxy.on('error', (err: Object, req: $Request, res: $Response) => {
  if (err.code !== 'ECONNRESET') {
    console.log('proxy error', err);
  }

  if (!res.headersSent) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
  }

  const json = { error: 'proxy_error', reason: err.message };

  res.end(JSON.stringify(json));
});

// Configure static serving of our webpack bundled client files.
app.use(
  notEmpty(process.env.CLIENT_BUNDLE_HTTP_PATH),
  express.static(
    path.resolve(appRootPath, notEmpty(process.env.BUNDLE_OUTPUT_PATH), './client'),
    { maxAge: notEmpty(process.env.CLIENT_BUNDLE_CACHE_MAXAGE) },
  ),
);

// Configure static serving of our "public" root http path static files.
app.use(express.static(path.resolve(appRootPath, './public')));

// When in production mode, bind our service worker folder so that it can
// be served.
// Note: the service worker needs to be available at the http root of your
// application for the offline support to work.
if (process.env.NODE_ENV === 'production') {
  app.get(
    '/sw.js',
    (req: $Request, res: $Response, next: NextFunction) => { // eslint-disable-line no-unused-vars
      res.sendFile(
        path.resolve(appRootPath, notEmpty(process.env.BUNDLE_OUTPUT_PATH), './client/sw.js'),
      );
    },
  );
}

app.get('*', boldrSSR);

// Handle 404 errors.
// Note: the react application middleware hands 404 paths, but it is good to
// have this backup for paths not handled by the universal middleware. For
// example you may bind a /api path to express.
app.use((req: $Request, res: $Response, next: NextFunction) => { // eslint-disable-line no-unused-vars,max-len
  res.status(404).send('Sorry, that resource was not found.');
});

// Handle all other errors (i.e. 500).
// Note: You must provide specify all 4 parameters on this callback function
// even if they aren't used, otherwise it won't be used.
app.use((err: ?Error, req: $Request, res: $Response, next: NextFunction) => { // eslint-disable-line no-unused-vars,max-len
  if (err) {
    console.log(err);
    console.log(err.stack);
  }
  res.status(500).send('Sorry, an unexpected error occurred.');
});

// Create an http listener for our express app.
const port = parseInt(notEmpty(process.env.SSR_PORT), 10);
const listener = app.listen(port, () =>
  console.log(`Server listening on port ${port}`),
);

// We export the listener as it will be handy for our development hot reloader.
export default listener;
