import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { css } from 'glamor';
import { dropCard } from 'actions';
import { getSuitSVG } from 'utils/svg';
import styles from 'styles/card';

/* eslint-disable react/prop-types */

let selectedData = null;

const cardSource = {
  beginDrag(props, monitor, { context: { selected } }) {
    if (selectedData !== null) {
      return selectedData;
    }

    const item = { card: props.card, stackID: props.stackID, selected: [] };
    if (!selected.length) {
      selectedData = item;
      return item;
    }
    const indexSlice = selected.findIndex(card => card.id === item.card.id);
    item.selected = selected.slice(indexSlice);
    selectedData = item;
    return item;
  },

  endDrag(props, monitor) {
    selectedData = null;
    if (!monitor.didDrop()) {
      return;
    }

    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    props.onDropCard(item.selected, dropResult.id, item.stackID);
  },
};

@connect(null, dispatch => ({
  onDropCard: (id, to, from) => {
    dispatch(dropCard(id, to, from));
  },
}))
@DragSource(props => props.card.suitName, cardSource, (connection, monitor) => ({
  connectDragSource: connection.dragSource(),
  connectDragPreview: connection.dragPreview(),
  isDragging: monitor.isDragging(),
  item: monitor.getItem(),
}))
export default class Card extends Component {
  static contextTypes = {
    selected: PropTypes.array,
  };

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }

  render() {
    const {
      isDragging,
      item,
      connectDragSource,
      card,
      zi,
      style = null,
      onClick = null,
    } = this.props;
    if (card.face === 'back') {
      return (
        <div
          role="presentation"
          className={css(styles.card, styles.back, style)}
          style={{ zIndex: zi }}
          onClick={onClick}
        >
          <img className={css(styles.backImage)} alt="" src="/images/nyt_logo.png" />
        </div>
      );
    }

    const suitSVG = getSuitSVG(card.suitName);
    const isSelected =
      item &&
      item.selected &&
      item.selected.findIndex(selectedItem => selectedItem.id === card.id) > -1;

    let dragStyles = {};
    if (isDragging || isSelected) {
      dragStyles = {
        opacity: 0,
      };
    }

    return connectDragSource(
      <div
        role="presentation"
        className={css(styles.card, styles.front, styles[card.color], style, dragStyles)}
        style={{ zIndex: zi }}
      >
        <div className={css(styles.value)}>{card.displayValue}</div>
        <div className={css(styles.suit)}>
          <img className={css(styles.suitImage)} alt="" src={suitSVG} />
        </div>
        <div className={css(styles.center)}>
          <img className={css(styles.centerImage)} alt="" src={suitSVG} />
        </div>
      </div>
    );
  }
}
