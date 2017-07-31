import React from 'react';
import { css } from 'glamor';

const styles = {
  dropzone: {
    position: 'absolute',
    zIndex: 0,
    width: 115,
    height: 900,
    top: 150,
  },
  clubs: {
    top: -25,
    left: 330,
    height: 160,
  },
  diamonds: {
    top: -25,
    left: 445,
    height: 160,
  },
  hearts: {
    top: -25,
    left: 560,
    height: 160,
  },
  spades: {
    top: -25,
    left: 675,
    height: 160,
  },
  tableau_1: {
    left: -15,
  },
  tableau_2: {
    left: 100,
  },
  tableau_3: {
    left: 215,
  },
  tableau_4: {
    left: 330,
  },
  tableau_5: {
    left: 445,
  },
  tableau_6: {
    left: 560,
  },
  tableau_7: {
    left: 675,
  },
};

export default () =>
  <div>
    <div className={css(styles.dropzone, styles.clubs)} />
    <div className={css(styles.dropzone, styles.diamonds)} />
    <div className={css(styles.dropzone, styles.hearts)} />
    <div className={css(styles.dropzone, styles.spades)} />
    <div className={css(styles.dropzone, styles.tableau_1)} />
    <div className={css(styles.dropzone, styles.tableau_2)} />
    <div className={css(styles.dropzone, styles.tableau_3)} />
    <div className={css(styles.dropzone, styles.tableau_4)} />
    <div className={css(styles.dropzone, styles.tableau_5)} />
    <div className={css(styles.dropzone, styles.tableau_6)} />
    <div className={css(styles.dropzone, styles.tableau_7)} />
  </div>;
