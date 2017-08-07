import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'glamor';
import Foundation from './Foundation';
import { STACK_OFFSET } from '../utils/constants';
import { getSuitSVG } from '../utils/svg';
import placeholder from '../styles/placeholder';

const styles = {
  placeholder: {
    ...placeholder,
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

@connect(({ deck }) => ({
  foundations: deck.foundations,
}))
export default class Foundations extends Component {
  static propTypes = {
    foundations: PropTypes.shape({
      clubs: PropTypes.array,
      diamonds: PropTypes.array,
      hearts: PropTypes.array,
      spades: PropTypes.array,
    }).isRequired,
  };

  render() {
    const { foundations } = this.props;
    return Object.keys(foundations).map((foundation, i) => {
      const id = `foundations-${foundation}`;
      return [
        <div
          key={id}
          className={css(styles.placeholder, styles.suit, styles[foundation], {
            left: 3 * STACK_OFFSET + suits[foundation] * STACK_OFFSET,
          })}
        >
          <img className={css(styles.image)} alt="" src={getSuitSVG(foundation)} />
        </div>,
        <Foundation
          style={{ top: 0, left: i * STACK_OFFSET + STACK_OFFSET * 3 }}
          id={id}
          suit={foundation}
          stack={foundations[foundation]}
        />,
      ];
    });
  }
}
