import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import Card from './Card';

/* eslint-disable react/forbid-prop-types */

const styles = {
  stack: {
    position: 'absolute',
  },
};

export default class Stack extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    stack: PropTypes.object.isRequired,
    style: PropTypes.object,
    cardStyle: PropTypes.object,
  };

  static defaultProps = {
    style: null,
    cardStyle: null,
  };

  render() {
    const { id, stack, style, cardStyle } = this.props;

    return (
      <div id={id} className={css(styles.stack, style)}>
        {stack.cards.map((card, i) =>
          // eslint-disable-next-line react/no-array-index-key
          <Card key={`card-${i}`} card={card} zi={i} style={cardStyle} />
        )}
      </div>
    );
  }
}
