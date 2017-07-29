import React, { Component } from 'react';
import { getSuitSVG } from './utils/svg';

/* eslint-disable react/prop-types */

/**
 * Card class. Pass value from 0 to 51 to constructor.
 *   value:      1-13
 *   displayValue:  A, 1-10, J, Q, K
 *   suit:      ♣, ♦, ❤, ♠
 *   suitName: clubs, diamonds, hearts, spades
 *   color:      red, black
 *   face:       front, back
 */
export default class Card extends Component {
  constructor(props) {
    super(props);

    const card = props.card;
    this.id = card;
    this.face = 'front';
    this.value = card % 13 + 1;
    this.suit = '♣';
    this.suitName = 'clubs';
    this.color = 'black';

    if (card >= 39) {
      this.suit = '♠';
      this.suitName = 'spades';
      this.color = 'black';
    } else if (card >= 26) {
      this.suit = '♦';
      this.suitName = 'diamonds';
      this.color = 'red';
    } else if (card >= 13) {
      this.suit = '❤';
      this.suitName = 'hearts';
      this.color = 'red';
    }
  }

  getDisplayValue() {
    switch (this.value) {
      case 1:
        return 'A';
      case 11:
        return 'J';
      case 12:
        return 'Q';
      case 13:
        return 'K';
      default:
        return this.value;
    }
  }

  toString() {
    return this.getDisplayValue() + this.suit;
  }

  // Returns HTML representation of the card.
  render() {
    const { zi } = this.props;
    if (this.face === 'back') {
      return (
        <div className="card card_back" data-id={this.id}>
          <img alt="" src="/images/nyt_logo.png" />
        </div>
      );
    }
    return (
      <div
        id={`card_${this.id}`}
        data-id={this.id}
        className={`card card_front ${this.color}`}
        style={{ zIndex: zi }}
        data-zi={zi}
      >
        <div className="card_value">
          {this.getDisplayValue()}
        </div>
        <div className="card_suit">
          {getSuitSVG(this.suitName)}
        </div>
        <div className="card_center">
          <div className="card_center_suit">
            {getSuitSVG(this.suitName)}
          </div>
        </div>
      </div>
    );
  }
}
