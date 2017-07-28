import React, { Component } from 'react';
import Card from './Card';

/* eslint-disable react/prop-types */

export default class Stack extends Component {
  constructor(props) {
    super(props);

    this.cards = [props.splay];

    // Whether to splay cards when displaying.  Tableau stacks are splayed.  Other stacks aren't.
    this.splay = props.splay;
  }

  // Returns HTML representation of the card stack.
  push(card, face) {
    card.face = face;
    this.cards.push(card);
  }

  render() {
    return (
      <section>
        {this.cards.map((card, i) => <Card card={card} zi={i} />)}
      </section>
    );
  }
}
