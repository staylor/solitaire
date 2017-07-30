import React, { Component } from 'react';
import Moves from './Moves';
import Time from './Time';
import Score from './Score';

export default class Nav extends Component {
  render() {
    return (
      <div id="nav">
        <div className="times_icon" />
        <div className="pipe" />
        <div id="nav_left">Solitaire</div>
        <div id="nav_right">
          <Moves />
          <Time />
          <Score />
          <div id="help">
            <a href="https://en.wikipedia.org/wiki/Klondike_(solitaire)">
              <i className="material-icons">settings</i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
