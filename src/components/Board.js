import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import Stack from './Stack';
import TopModal from './TopModal';
import Dropzones from './Dropzones';
import Placeholders from './Placeholders';
import { STACK_OFFSET } from '../utils/constants';
import { nextCard } from '../actions';

/* eslint-disable react/no-array-index-key */

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

@connect(
  ({ app }) => ({
    stock: app.stock,
    waste: app.waste,
    tableaus: app.tableaus,
    foundations: app.foundations,
  }),
  dispatch => ({
    onNextCard: () => {
      dispatch(nextCard());
    },
  })
)
export default class Board extends Component {
  render() {
    const { stock, waste, tableaus, foundations, onNextCard } = this.props;
    return (
      <div className={css(styles.board)}>
        <Dropzones />
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
          const id = `foundation-${i}`;
          return (
            <Stack
              style={{ top: 0, left: i * STACK_OFFSET + STACK_OFFSET * 3 }}
              id={id}
              key={id}
              stack={foundations[foundation]}
            />
          );
        })}
        {tableaus.map((tableau, i) => {
          const id = `tableau-${i}`;
          return (
            <Stack style={{ top: 165, left: i * STACK_OFFSET }} id={id} key={id} stack={tableau} />
          );
        })}

        <TopModal />
      </div>
    );
  }
}
