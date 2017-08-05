import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { winGame, ACTIVE_STATE, SUCCESS_STATE } from '../actions';

const styles = {
  modal: {
    position: 'absolute',
    fontSize: 100,
    left: 100,
    top: 200,
    zIndex: 300,
    color: '#fff',
    textShadow: '2px 2px #bdbdbd',
    fontFamily: '"nyt-karnak-display-130124", georgia, "times new roman", times, serif',
    display: 'none',
  },
};

@connect(
  ({ deck, status }) => ({ deck, gameStatus: status }),
  dispatch => ({
    onSuccess: () => {
      dispatch(winGame());
    },
  })
)
export default class TopModal extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    deck: PropTypes.object.isRequired,
    gameStatus: PropTypes.string.isRequired,
    onSuccess: PropTypes.func.isRequired,
  };

  winner = false;

  componentWillReceiveProps(nextProps) {
    if (nextProps.gameStatus !== ACTIVE_STATE) {
      return;
    }

    if (nextProps.deck.stock.length > 0 || nextProps.deck.waste.length > 0) {
      return;
    }

    const cardsLeft = nextProps.deck.tableaus.reduce((carry, tableau) => {
      carry += tableau.filter(card => card.face === 'back');
      return carry;
    }, 0);

    if (cardsLeft === 0) {
      console.log('WON');
      nextProps.onSuccess();
      this.winner = true;
    }
  }

  render() {
    const { gameStatus } = this.props;
    if (gameStatus === SUCCESS_STATE || this.winner === true) {
      return <div className={css(styles.modal)}>YOU WON!!!</div>;
    }
    return null;
  }
}
