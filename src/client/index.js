import React from 'react';
import ReactDOM from 'react-dom';
import { rehydrate } from 'glamor';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import appReducers from '../reducers';
import App from '../components/App';

/* eslint-disable no-underscore-dangle */

rehydrate(window._glam);

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const store = createStore(appReducers, preloadedState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main')
);
