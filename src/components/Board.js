import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { css } from 'glamor';
import Stack from './Stack';
import Foundation from './Foundation';
import TopModal from './TopModal';
import Placeholders from './Placeholders';
import { STACK_OFFSET } from '../utils/constants';
import { nextCard } from '../actions';

/* eslint-disable react/no-array-index-key, react/forbid-prop-types */

const styles = {
  board: {
    position: 'relative',
    width: 775,
    height: 900,
    margin: '40px auto',
  },
  stockCard: {
    marginTop: -1 * STACK_OFFSET,
    ':first-child': {
      marginTop: 0,
    },
  },
};

@DragDropContext(HTML5Backend)
@connect(
  ({ deck }) => ({
    stock: deck.stock,
    waste: deck.waste,
    tableaus: deck.tableaus,
    foundations: deck.foundations,
  }),
  dispatch => ({
    onNextCard: () => {
      dispatch(nextCard());
    },
  })
)
export default class Board extends Component {
  static propTypes = {
    stock: PropTypes.array.isRequired,
    waste: PropTypes.array.isRequired,
    tableaus: PropTypes.array.isRequired,
    foundations: PropTypes.shape({
      clubs: PropTypes.array,
      diamonds: PropTypes.array,
      hearts: PropTypes.array,
      spades: PropTypes.array,
    }).isRequired,
    onNextCard: PropTypes.func.isRequired,
  };

  render() {
    const { stock, waste, tableaus, foundations, onNextCard } = this.props;
    return (
      <div className={css(styles.board)}>
        <Placeholders />
        <Stack
          style={{ top: 0, left: 0 }}
          id="stock"
          key="stock"
          cardStyle={styles.stockCard}
          stack={stock}
          onClick={onNextCard}
        />
        <Stack
          style={{ top: 0, left: STACK_OFFSET }}
          id="waste"
          key="waste"
          cardStyle={styles.stockCard}
          stack={waste}
        />
        {Object.keys(foundations).map((foundation, i) => {
          const id = `foundations-${foundation}`;
          return (
            <Foundation
              style={{ top: 0, left: i * STACK_OFFSET + STACK_OFFSET * 3 }}
              id={id}
              key={id}
              suit={foundation}
              stack={foundations[foundation]}
            />
          );
        })}
        {tableaus.map((tableau, i) => {
          const id = `tableaus-${i}`;
          return (
            <Stack style={{ top: 165, left: i * STACK_OFFSET }} id={id} key={id} stack={tableau} />
          );
        })}

        <TopModal />
      </div>
    );
  }
}
