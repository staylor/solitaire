import React from 'react';
import { getSuitSVG } from '../utils/svg';

/* eslint-disable react/prop-types */

export default ({ card, zi }) => {
  if (card.face === 'back') {
    return (
      <div className="card card_back" data-id={card.id}>
        <img alt="" src="/images/nyt_logo.png" />
      </div>
    );
  }

  const suitSVG = getSuitSVG(card.suitName);

  return (
    <div
      id={`card_${card.id}`}
      data-id={card.id}
      className={`card card_front ${card.color}`}
      style={{ zIndex: zi }}
      data-zi={zi}
    >
      <div className="card_value">
        {card.getDisplayValue()}
      </div>
      <div className="card_suit">
        {suitSVG}
      </div>
      <div className="card_center">
        <div className="card_center_suit">
          {suitSVG}
        </div>
      </div>
    </div>
  );
};
