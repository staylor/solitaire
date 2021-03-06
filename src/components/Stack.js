import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import Cards from './Cards';

const stackTarget = {
  canDrop(props, monitor) {
    const item = monitor.getItem();
    return item.stackID === props.id;
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
  canDrop: monitor.canDrop(),
}))
export default class Stack extends Component {
  render() {
    return <Cards {...this.props} />;
  }
}
