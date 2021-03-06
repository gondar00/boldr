/* eslint-disable jsx-a11y/html-has-lang, react/forbid-prop-types */
/* @flow */
import React from 'react';
import type { ReactElement } from '../../types/react';

type Props = {
  htmlAttributes?: Object,
  headerElements?: number | string | ReactElement<*> | Array<any>,
  bodyElements?: number | string | ReactElement<*> | Array<any>,
  appBodyString?: string,
};

function Html(props: Props) {
  const { htmlAttributes, headerElements, bodyElements, appBodyString } = props;

  return (
    <html {...htmlAttributes}>
      <head>
        {headerElements}
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: appBodyString }} />
        {bodyElements}
      </body>
    </html>
  );
}

Html.defaultProps = {
  htmlAttributes: null,
  headerElements: null,
  bodyElements: null,
  appBodyString: '',
};

export default Html;
