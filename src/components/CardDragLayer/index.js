import React, { Component } from 'react';
import ActiveCard from './ActiveCard';
import DragLayer from './PerformantDragLayer';

/* eslint-disable react/prop-types */

@DragLayer(monitor => ({
  item: monitor.getItem(),
}))
export default class CardDragLayer extends Component {
  render() {
    const { item } = this.props;

    if (!item) {
      return null;
    }

    return item.selected.map((card, i) => <ActiveCard key={card.id} card={card} zi={i} />);
  }
}
