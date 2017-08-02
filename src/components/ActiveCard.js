import React from 'react';
import { css } from 'glamor';
import { getSuitSVG } from '../utils/svg';
import styles from '../styles/card';

/* eslint-disable react/prop-types */

export default function ActiveCard({ card, zi = null }) {
  const suitSVG = getSuitSVG(card.suitName);

  return (
    <div
      role="presentation"
      className={css(styles.card, styles.front, styles[card.color], {
        zIndex: zi,
      })}
    >
      <div className={css(styles.value)}>
        {card.displayValue}
      </div>
      <div className={css(styles.suit)}>
        <img className={css(styles.suitImage)} alt="" src={suitSVG} />
      </div>
      <div className={css(styles.center)}>
        <img className={css(styles.centerImage)} alt="" src={suitSVG} />
      </div>
    </div>
  );
}
