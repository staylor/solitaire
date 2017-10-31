import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { Types } from 'utils/constants';
import Cards from './Cards';

const stackTarget = {
  canDrop(props, monitor) {
    const item = monitor.getItem();
    let lastValue = null;
    if (props.stack.length) {
      lastValue = props.stack[props.stack.length - 1];
    }
    if (lastValue) {
      return item.card.color !== lastValue.color && item.card.value === lastValue.value - 1;
    }
    return item.card.value === 13;
  },
  drop(props, monitor) {
    if (monitor.didDrop()) {
      return null;
    }
    return { id: props.id };
  },
};

@DropTarget(Object.keys(Types).map(type => Types[type]), stackTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
export default class Tableau extends Component {
  render() {
    return <Cards {...this.props} />;
  }
}
