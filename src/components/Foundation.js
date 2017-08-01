import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import Cards from './Cards';

const stackTarget = {
  canDrop(props, monitor) {
    const item = monitor.getItem();
    let lastValue = 0;
    if (props.stack.length) {
      lastValue = props.stack[props.stack.length - 1].value;
    }
    return item.card.suitName === props.suit && item.card.value === lastValue + 1;
  },
  drop(props, monitor) {
    if (monitor.didDrop()) {
      return null;
    }
    return { id: props.id };
  },
};

@DropTarget(props => props.suit, stackTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
export default class Foundation extends Component {
  render() {
    return <Cards {...this.props} />;
  }
}
