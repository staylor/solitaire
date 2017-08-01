/**
 * Card class. Pass value from 0 to 51 to constructor.
 *   value:      1-13
 *   displayValue:  A, 1-10, J, Q, K
 *   suit:      ♣, ♦, ❤, ♠
 *   suitName: clubs, diamonds, hearts, spades
 *   color:      red, black
 *   face:       front, back
 */

const getDisplayValue = value => {
  switch (value) {
    case 1:
      return 'A';
    case 11:
      return 'J';
    case 12:
      return 'Q';
    case 13:
      return 'K';
    default:
      return value;
  }
};

export default class Card {
  constructor(cardIndex) {
    this.id = cardIndex;
    this.face = 'front';
    this.value = cardIndex % 13 + 1;
    this.suit = '♣';
    this.suitName = 'clubs';
    this.color = 'black';

    if (cardIndex >= 39) {
      this.suit = '♠';
      this.suitName = 'spades';
      this.color = 'black';
    } else if (cardIndex >= 26) {
      this.suit = '♦';
      this.suitName = 'diamonds';
      this.color = 'red';
    } else if (cardIndex >= 13) {
      this.suit = '❤';
      this.suitName = 'hearts';
      this.color = 'red';
    }
    this.displayValue = getDisplayValue(this.value);
  }

  toString() {
    return this.getDisplayValue() + this.suit;
  }
}
