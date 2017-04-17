/* @flow */

import {resolve as pathResolve} from 'path';
import express from 'express';
import appRootDir from 'app-root-dir';
import config from '../../../config';

// Middleware to server our client bundle.
export default express.static(
  // client bundle output path
  pathResolve(appRootDir.get(), config('bundles.client.outputPath')),
  {maxAge: '365d'},
);