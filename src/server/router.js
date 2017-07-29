import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderStatic } from 'glamor/server';
import appReducers from '../reducers';
import template from './template';
import App from '../components/App';

export default ({ manifestJSBundle, mainJSBundle, vendorJSBundle }) => async (req, res) => {
  const store = createStore(appReducers);

  const { html, css, ids } = renderStatic(() =>
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
