import React from 'react';
import { css } from 'glamor';
import Nav from './Nav';
import Board from './Board';
import Buttons from './Buttons';

css.global('html, body', {
  margin: 0,
  padding: 0,
  background: '#2db570',
  fontFamily: '"nyt-franklin", arial, serif',
  color: '#fff',
});

export default () =>
  <main>
    <Nav />
    <Board />
    <Buttons />
  </main>;
