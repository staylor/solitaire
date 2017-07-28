import React from 'react';
import ReactDOM from 'react-dom';
import { rehydrate } from 'glamor';
import App from '../components/App';

// eslint-disable-next-line no-underscore-dangle
rehydrate(window._glam);

ReactDOM.render(<App />, document.getElementById('main'));
