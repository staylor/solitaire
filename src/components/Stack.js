import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StackModel from '../Stack';
import Card from './Card';

export default class Stack extends Component {
  static propTypes = {
    stack: PropTypes.instanceOf(StackModel).isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    const { stack, className } = this.props;

    return (
      <div className={`stack ${className}`}>
        {stack.cards.map((card, i) =>
          // eslint-disable-next-line react/no-array-index-key
          <Card key={`card-${i}`} card={card} zi={i} />
        )}
      </div>
    );
  }
}
