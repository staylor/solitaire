export default class Stack {
  constructor(splay = false) {
    this.cards = [];

    // Whether to splay cards when displaying.
    // Tableau stacks are splayed.
    // Other stacks aren't.
    this.splay = splay;
  }

  // Returns HTML representation of the card stack.
  push(card, face) {
    card.face = face;
    this.cards.push(card);
  }
}
