import React from 'react';
import { injectGlobal } from 'emotion';
import Nav from './Nav';
import Board from './Board';
import Status from './Status';
import Buttons from './Buttons';

// eslint-disable-next-line
injectGlobal`
  html, body {
    margin: 0;
    padding: 0;
    background: #2db570;
    font-family: "nyt-franklin", arial, serif;
    color: #fff;
  }
`;

export default function App() {
  return [<Nav />, <Board />, <Status />, <Buttons />];
}
