import React, { Component } from 'react';
import Nav from './Nav';
import Board from './Board';
import Buttons from './Buttons';

export default class App extends Component {
  render() {
    return (
      <main>
        <Nav />
        <Board />
        <Buttons />
      </main>
    );
  }
}
