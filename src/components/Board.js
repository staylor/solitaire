import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { css } from 'glamor';
import CardDragLayer from './CardDragLayer';
import Stock from './Stock';
import Waste from './Waste';
import Foundations from './Foundations';
import Tableaus from './Tableaus';
import TopModal from './TopModal';

const styles = {
  board: {
    position: 'relative',
    width: 775,
    height: 900,
    margin: '40px auto',
  },
};

@DragDropContext(HTML5Backend)
export default class Board extends Component {
  render() {
    return (
      <div className={css(styles.board)}>
        <Stock />
        <Waste />
        <Foundations />
        <Tableaus />
        <TopModal />
        <CardDragLayer />
      </div>
    );
  }
}
