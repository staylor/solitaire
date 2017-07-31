import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { startNewGame } from '../actions';

const styles = {
  buttons: {
    position: 'fixed',
    bottom: 20,
    width: '100%',
    margin: '0 auto',
    textAlign: 'center',
    zIndex: 150,
  },

  button: {
    fontFamily: '"nyt-franklin", arial, serif',
    display: 'inline-block',
    color: '#fff',
    padding: '8px 20px',
    background: '#128265',
    borderRadius: 3,
    margin: 10,
    cursor: 'pointer',
    textAlign: 'middle',
    lineHeight: '20px',

    ':hover': {
      background: '#036154',
    },
  },

  i: {
    fontSize: 16,
  },
};

@connect(null, dispatch => ({
  onNewGame: () => {
    dispatch(startNewGame());
  },
}))
export default class Buttons extends Component {
  render() {
    const { onNewGame } = this.props;

    return (
      <div className={css(styles.buttons)}>
        <div className={css(styles.button)} onClick={onNewGame}>
          <i className={`material-icons ${css(styles.i)}`}>star</i> New Game
        </div>
        <div id="button_undo" className={css(styles.button)}>
          <i className={`material-icons ${css(styles.i)}`}>undo</i> Undo
        </div>
      </div>
    );
  }
}
