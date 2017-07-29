import React, { Component } from 'react';
import { getSuitSVG } from '../utils/svg';
import Time from './Time';

export default class App extends Component {
  static propTypes = {
    splay: PropTypes.boolean,
  };

  static defaultProps = {
    splay: false,
  };

  render() {
    return (
      <main>
        <div id="nav">
          <div className="times_icon" />
          <div className="pipe" />
          <div id="nav_left">Solitaire</div>
          <div id="nav_right">
            <div id="stats_moves" className="stats">
              <div className="title">Moves</div>
              <span id="moves">0</span>
            </div>
            <Time />
            <div id="stats_score" className="stats">
              <div className="title">Score</div>
              <span id="score">0</span>
            </div>
            <div id="help">
              <a href="https://en.wikipedia.org/wiki/Klondike_(solitaire)">
                <i className="material-icons">settings</i>
              </a>
            </div>
          </div>
        </div>
        <div id="board">
          <div id="dropzone_foundation_clubs" className="dropzone foundation" />
          <div id="dropzone_foundation_diamonds" className="dropzone foundation" />
          <div id="dropzone_foundation_hearts" className="dropzone foundation" />
          <div id="dropzone_foundation_spades" className="dropzone foundation" />
          <div id="dropzone_tableau_1" className="dropzone tableau" />
          <div id="dropzone_tableau_2" className="dropzone tableau" />
          <div id="dropzone_tableau_3" className="dropzone tableau" />
          <div id="dropzone_tableau_4" className="dropzone tableau" />
          <div id="dropzone_tableau_5" className="dropzone tableau" />
          <div id="dropzone_tableau_6" className="dropzone tableau" />
          <div id="dropzone_tableau_7" className="dropzone tableau" />

          <div id="placeholder_stock" className="placeholder ph_recycle">
            <i className="material-icons">refresh</i>
          </div>
          <div id="placeholder_waste" className="placeholder" />
          <div id="placeholder_foundation_clubs" className="placeholder ph_suit foundation">
            {getSuitSVG('clubs')}
          </div>
          <div id="placeholder_foundation_diamonds" className="placeholder ph_suit foundation">
            {getSuitSVG('diamonds')}
          </div>
          <div id="placeholder_foundation_hearts" className="placeholder ph_suit foundation">
            {getSuitSVG('hearts')}
          </div>
          <div id="placeholder_foundation_spades" className="placeholder ph_suit foundation">
            {getSuitSVG('spades')}
          </div>
          <div id="placeholder_tableau_1" className="placeholder tableau" />
          <div id="placeholder_tableau_2" className="placeholder tableau" />
          <div id="placeholder_tableau_3" className="placeholder tableau" />
          <div id="placeholder_tableau_4" className="placeholder tableau" />
          <div id="placeholder_tableau_5" className="placeholder tableau" />
          <div id="placeholder_tableau_6" className="placeholder tableau" />
          <div id="placeholder_tableau_7" className="placeholder tableau" />

          <div id="stock" className="stack" />
          <div id="waste" className="stack" />
          <div id="foundation_clubs" className="stack foundation" />
          <div id="foundation_diamonds" className="stack foundation" />
          <div id="foundation_hearts" className="stack foundation" />
          <div id="foundation_spades" className="stack foundation" />
          <div id="tableau_1" className="stack tableau" />
          <div id="tableau_2" className="stack tableau" />
          <div id="tableau_3" className="stack tableau" />
          <div id="tableau_4" className="stack tableau" />
          <div id="tableau_5" className="stack tableau" />
          <div id="tableau_6" className="stack tableau" />
          <div id="tableau_7" className="stack tableau" />

          <div id="top_modal">YOU WON!!!</div>
        </div>
        <div id="buttons">
          <div id="button_new_game" className="button">
            <i className="material-icons">star</i> New Game
          </div>
          <div id="button_undo" className="button">
            <i className="material-icons">undo</i> Undo
          </div>
        </div>
      </main>
    );
  }
}
