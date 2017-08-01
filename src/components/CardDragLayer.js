import React, { Component } from 'react';
import { DragLayer } from 'react-dnd';
import { css } from 'glamor';
import ActiveCard from './ActiveCard';

/* eslint-disable react/prop-types */

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

function getItemStyles(props) {
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
  };
}

@DragLayer(monitor => ({
  item: monitor.getItem(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
}))
export default class CardDragLayer extends Component {
  selected = [];

  render() {
    const { item } = this.props;

    if (!item) {
      return null;
    }

    return (
      <div className={css(layerStyles)}>
        <div className={css(getItemStyles(this.props))}>
          {item.selected.map((card, i) => <ActiveCard key={card.id} card={card} zi={i} />)}
        </div>
      </div>
    );
  }
}
