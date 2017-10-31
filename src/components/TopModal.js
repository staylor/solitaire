import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { winGame, ACTIVE_STATE } from 'actions';

const Modal = styled.div`
  position: absolute;
  font-size: 100px;
  left: 100;
  top: 200;
  z-index: 300;
  color: #fff;
  text-shadow: 2px 2px #bdbdbd;
  font-family: 'nyt-karnak-display-130124', georgia, 'times new roman', times, serif;
  display: none;
`;

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

  state = {
    winner: false,
  };

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
      nextProps.onSuccess();
      this.setState({ winner: true });
    }
  }

  render() {
    const { winner } = this.state;
    if (winner) {
      return <Modal>YOU WON!!!</Modal>;
    }
    return null;
  }
}
