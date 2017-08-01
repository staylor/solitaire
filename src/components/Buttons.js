import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { startNewGame, undo } from '../actions';

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
  onNewGame: e => {
    e.preventDefault();
    e.currentTarget.blur();

    dispatch(startNewGame());
  },
  onUndo: e => {
    e.preventDefault();
    e.currentTarget.blur();

    dispatch(undo());
  },
}))
export default class Buttons extends Component {
  static propTypes = {
    onNewGame: PropTypes.func.isRequired,
    onUndo: PropTypes.func.isRequired,
  };

  render() {
    const { onNewGame, onUndo } = this.props;

    return (
      <div className={css(styles.buttons)}>
        <a tabIndex="-1" role="button" className={css(styles.button)} onClick={onNewGame}>
          <i className={`material-icons ${css(styles.i)}`}>star</i> New Game
        </a>
        <a tabIndex="-1" role="button" className={css(styles.button)} onClick={onUndo}>
          <i className={`material-icons ${css(styles.i)}`}>undo</i> Undo
        </a>
      </div>
    );
  }
}
