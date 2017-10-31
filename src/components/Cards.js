import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import Card from './Card';

/* eslint-disable react/forbid-prop-types */

const styles = {
  stack: {
    position: 'absolute',
    cursor: 'pointer',
    width: 85,
    minHeight: 115,
  },
};

export default class Cards extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    stack: PropTypes.array.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    style: PropTypes.object,
    cardStyle: PropTypes.object,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    style: null,
    cardStyle: null,
    onClick: null,
  };

  static childContextTypes = {
    selected: PropTypes.array,
  };

  getChildContext() {
    return {
      selected: this.props.stack.filter(card => card.face === 'front'),
    };
  }

  render() {
    const { id, stack, style, cardStyle, onClick, connectDropTarget } = this.props;
    const lastIndex = stack.length - 1;
    return connectDropTarget(
      <div id={id} className={css(styles.stack, style)}>
        {stack.map((card, i) => (
          <Card
            stackID={id}
            // eslint-disable-next-line react/no-array-index-key
            key={`card-${i}`}
            card={card}
            zi={i}
            style={cardStyle}
            onClick={i === lastIndex ? onClick : null}
          />
        ))}
      </div>
    );
  }
}
