import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

export default class Stack extends Component {
  static propTypes = {
    splay: PropTypes.boolean,
  };

  static defaultProps = {
    splay: false,
  };

  constructor(props) {
    super(props);

    this.cards = [];

    // Whether to splay cards when displaying.
    // Tableau stacks are splayed.
    // Other stacks aren't.
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
