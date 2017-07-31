import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import Stack from './Stack';
import TopModal from './TopModal';
import Dropzones from './Dropzones';
import Placeholders from './Placeholders';

const styles = {
  board: {
    position: 'relative',
    width: 775,
    height: 900,
    margin: '40px auto',
  },
  stock: {
    top: 0,
    left: 0,
  },
  waste: {
    top: 0,
    left: 115,
  },
  stockCard: {
    marginTop: -115,
    ':first-child': {
      marginTop: 0,
    },
  },
  clubs: {
    top: 0,
    left: 345,
  },
  diamonds: {
    top: 0,
    left: 460,
  },
  hearts: {
    top: 0,
    left: 575,
  },
  spades: {
    top: 0,
    left: 690,
  },
  tableau_1: {
    top: 165,
    left: 0,
  },
  tableau_2: {
    top: 165,
    left: 115,
  },
  tableau_3: {
    top: 165,
    left: 230,
  },
  tableau_4: {
    top: 165,
    left: 345,
  },
  tableau_5: {
    top: 165,
    left: 460,
  },
  tableau_6: {
    top: 165,
    left: 575,
  },
  tableau_7: {
    top: 165,
    left: 690,
  },
};

@connect(({ app }) => ({
  stock: app.stock,
  waste: app.waste,
  tableaus: app.tableaus,
  foundations: app.foundations,
}))
export default class Board extends Component {
  render() {
    const { stock, waste, tableaus, foundations } = this.props;

    return (
      <div className={css(styles.board)}>
        <Dropzones />
        <Placeholders />
        <Stack
          key="stock"
          className={css(styles.stock)}
          cardStyle={styles.stockCard}
          stack={stock}
        />
        <Stack
          key="waste"
          className={css(styles.waste)}
          cardStyle={styles.stockCard}
          stack={waste}
        />
        {Object.keys(foundations).map((foundation, i) =>
          <Stack
            // eslint-disable-next-line react/no-array-index-key
            key={`foundation-${i}`}
            className={css(styles[foundation])}
            stack={foundations[foundation]}
          />
        )}
        {tableaus.map((tableau, i) =>
          // eslint-disable-next-line react/no-array-index-key
          <Stack key={`tableau-${i}`} className={css(styles[`tableau_${i + 1}`])} stack={tableau} />
        )}

        <TopModal />
      </div>
    );
  }
}
