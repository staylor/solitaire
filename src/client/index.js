import React from 'react';
import ReactDOM from 'react-dom';
import { hydrate } from 'emotion';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import appReducers from '../reducers';
import App from '../components/App';

/* eslint-disable no-underscore-dangle */

hydrate(window.__emotion);

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const store = createStore(
  appReducers,
  preloadedState,
  // eslint-disable-next-line
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main')
);
