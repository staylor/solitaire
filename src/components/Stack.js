import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
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

const stackTarget = {
  canDrop(props, monitor) {
    const item = monitor.getItem();
    return item.card.suitName === props.id;
  },
  drop(props, monitor) {
    if (monitor.didDrop()) {
      return null;
    }
    return { id: props.id };
  },
};

@DropTarget(props => props.id, stackTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType(),
}))
export default class Stack extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    stack: PropTypes.array.isRequired,
    style: PropTypes.object,
    cardStyle: PropTypes.object,
    onClick: PropTypes.func,
    connectDropTarget: PropTypes.func.isRequired,
  };

  static defaultProps = {
    style: null,
    cardStyle: null,
    onClick: null,
  };

  render() {
    const { id, stack, style, cardStyle, onClick, connectDropTarget } = this.props;
    const lastIndex = stack.length - 1;
    return connectDropTarget(
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
