import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import StackModel from '../Stack';
import Card from './Card';

const styles = {
  stack: {
    position: 'absolute',
  },
};

export default class Stack extends Component {
  static propTypes = {
    stack: PropTypes.instanceOf(StackModel).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    className: PropTypes.any,
    // eslint-disable-next-line react/forbid-prop-types
    cardStyle: PropTypes.object,
  };

  static defaultProps = {
    className: null,
    cardStyle: null,
  };

  render() {
    const { stack, className, cardStyle } = this.props;

    return (
      <div className={css(styles.stack, className)}>
        {stack.cards.map((card, i) =>
          // eslint-disable-next-line react/no-array-index-key
          <Card key={`card-${i}`} card={card} zi={i} style={cardStyle} />
        )}
      </div>
    );
  }
}
