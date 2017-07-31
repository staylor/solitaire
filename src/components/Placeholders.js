import React from 'react';
import { css } from 'glamor';
import { getSuitSVG } from '../utils/svg';

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
    lineHeight: 105,
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
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  clubs: {
    top: 0,
    left: 345,
    ':hover': {
      color: 'black',
    },
  },
  diamonds: {
    top: 0,
    left: 460,
    ':hover': {
      color: '#f44336',
    },
  },
  hearts: {
    top: 0,
    left: 575,
    ':hover': {
      color: '#f44336',
    },
  },
  spades: {
    top: 0,
    left: 690,
    ':hover': {
      color: 'black',
    },
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

  image: {
    width: 50,
    opacity: 0.3,
    marginTop: 28,
    ':hover': {
      opacity: 1,
    },
  },
};

export default () =>
  <div>
    <div className={css(styles.placeholder, styles.recycle, styles.stock)}>
      <i className={`${css(styles.recycle, styles.recycleIcon)} material-icons`}>refresh</i>
    </div>
    <div className={css(styles.placeholder, styles.waste)} />
    <div className={`${css(styles.placeholder, styles.suit, styles.clubs)} foundation`}>
      <img className={css(styles.image)} alt="" src={getSuitSVG('clubs')} />
    </div>
    <div className={`${css(styles.placeholder, styles.suit, styles.diamonds)} foundation`}>
      <img className={css(styles.image)} alt="" src={getSuitSVG('diamonds')} />
    </div>
    <div className={`${css(styles.placeholder, styles.suit, styles.hearts)} foundation`}>
      <img className={css(styles.image)} alt="" src={getSuitSVG('hearts')} />
    </div>
    <div className={`${css(styles.placeholder, styles.suit, styles.spades)} foundation`}>
      <img className={css(styles.image)} alt="" src={getSuitSVG('spades')} />
    </div>
    <div className={`${css(styles.placeholder, styles.tableau_1)} tableau`} />
    <div className={`${css(styles.placeholder, styles.tableau_2)} tableau`} />
    <div className={`${css(styles.placeholder, styles.tableau_3)} tableau`} />
    <div className={`${css(styles.placeholder, styles.tableau_4)} tableau`} />
    <div className={`${css(styles.placeholder, styles.tableau_5)} tableau`} />
    <div className={`${css(styles.placeholder, styles.tableau_6)} tableau`} />
    <div className={`${css(styles.placeholder, styles.tableau_7)} tableau`} />
  </div>;
