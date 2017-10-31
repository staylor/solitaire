import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import styled from 'react-emotion';
import CardDragLayer from './CardDragLayer';
import Stock from './Stock';
import Waste from './Waste';
import Foundations from './Foundations';
import Tableaus from './Tableaus';
import TopModal from './TopModal';

const Wrap = styled.div`
  position: relative;
  width: 775px;
  height: 900px;
  margin: 40px auto;
`;

@DragDropContext(HTML5Backend)
export default class Board extends Component {
  render() {
    return (
      <Wrap>
        <Stock />
        <Waste />
        <Foundations />
        <Tableaus />
        <TopModal />
        <CardDragLayer />
      </Wrap>
    );
  }
}
