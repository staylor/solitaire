import React from 'react';
import { renderToString } from 'react-dom/server';
import { renderStatic } from 'glamor/server';
import template from './template';
import App from '../components/App';

export default ({ manifestJSBundle, mainJSBundle, vendorJSBundle }) => async (req, res) => {
  const { html, css, ids } = renderStatic(() => renderToString(<App />));

  res.status(200);
  res.send(
    template({
      root: html,
      css,
      ids,
      manifestJSBundle,
      mainJSBundle,
      vendorJSBundle,
    })
  );
};
