import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import Card from './Card';

/* eslint-disable react/forbid-prop-types */

const styles = {
  stack: {
    position: 'absolute',
    cursor: 'pointer',
  },
};

export default class Stack extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    stack: PropTypes.array.isRequired,
    style: PropTypes.object,
    cardStyle: PropTypes.object,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    style: null,
    cardStyle: null,
    onClick: null,
  };

  render() {
    const { id, stack, style, cardStyle, onClick } = this.props;
    const lastIndex = stack.length - 1;
    return (
      <div id={id} className={css(styles.stack, style)}>
        {stack.map((card, i) =>
          <Card
            // eslint-disable-next-line react/no-array-index-key
            key={`card-${i}`}
            card={card}
            zi={i}
            style={cardStyle}
            onClick={i === lastIndex ? onClick : null}
          />
        )}
      </div>
    );
  }
}
