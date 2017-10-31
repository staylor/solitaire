import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { extractCritical } from 'emotion-server';
import App from 'components/App';
import appReducers from 'reducers';
// eslint-disable-next-line import/no-restricted-paths
import template from './template';

export default ({ manifestJSBundle, mainJSBundle, vendorJSBundle }) => async (req, res) => {
  const store = createStore(appReducers);

  const { html, css, ids } = extractCritical(
    renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    )
  );

  const preloadedState = store.getState();

  res.status(200);
  res.send(
    template({
      root: html,
      css,
      ids,
      preloadedState,
      manifestJSBundle,
      mainJSBundle,
      vendorJSBundle,
    })
  );
};
