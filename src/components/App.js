import React, { Component } from 'react';
import Stack from '../Stack';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stock: new Stack(false),
      waste: new Stack(false),
      foundations: [],
      tableaus: [],

      moves: 0,
      startTime: null,
      score: 0,
      clockTimer: null,
    };
  }

  render() {
    return <main />;
  }
}
