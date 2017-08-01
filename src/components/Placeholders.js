import React from 'react';
import { css } from 'glamor';
import { getSuitSVG } from '../utils/svg';
import { STACK_OFFSET } from '../utils/constants';

const styles = {
  placeholder: {
    position: 'absolute',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '5px solid rgba(255, 255, 255, 0.2)',
    zIndex: 0,
    borderRadius: 10,
    width: 75,
    height: 105,
    userSelect: 'none',
  },
  stock: {
    top: 0,
    left: 0,
    cursor: 'pointer',
  },
  recycle: {
    fontSize: 60,
    lineHeight: '105px',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  recycleIcon: {
    ':hover': {
      color: '#ff9800',
    },
  },
  waste: {
    top: 0,
    left: 115,
  },
  suit: {
    top: 0,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  clubs: {
    ':hover': {
      color: 'black',
    },
  },
  diamonds: {
    ':hover': {
      color: '#f44336',
    },
  },
  hearts: {
    ':hover': {
      color: '#f44336',
    },
  },
  spades: {
    ':hover': {
      color: 'black',
    },
  },

  image: {
    width: 50,
    opacity: 0.3,
    marginTop: 28,
    ':hover': {
      opacity: 1,
    },
  },
};

const suits = {
  clubs: 0,
  diamonds: 1,
  hearts: 2,
  spades: 3,
};

export default () =>
  <div>
    <div className={css(styles.placeholder, styles.recycle, styles.stock)}>
      <i className={`${css(styles.recycle, styles.recycleIcon)} material-icons`}>refresh</i>
    </div>
    <div className={css(styles.placeholder, styles.waste)} />
    {Object.keys(suits).map((suit, i) => {
      const id = `suit-placeholder-${i}`;
      return (
        <div
          id={id}
          key={id}
          className={css(styles.placeholder, styles.suit, styles[suit], {
            left: 3 * STACK_OFFSET + suits[suit] * STACK_OFFSET,
          })}
        >
          <img className={css(styles.image)} alt="" src={getSuitSVG(suit)} />
        </div>
      );
    })}
    {Array.from(Array(7).keys()).map(i => {
      const id = `tableau-placeholder-${i}`;
      return (
        <div
          id={id}
          key={id}
          className={css(styles.placeholder, {
            top: 165,
            left: i * STACK_OFFSET,
          })}
        />
      );
    })}
  </div>;
