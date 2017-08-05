import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { INACTIVE_STATE, startNewGame, pauseGame, resumeGame, undo } from '../actions';

const styles = {
  buttons: {
    position: 'fixed',
    bottom: 20,
    width: '100%',
    margin: '0 auto',
    textAlign: 'center',
    zIndex: 150,
  },

  playButtons: {
    position: 'fixed',
    bottom: '50%',
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
    verticalAlign: 'middle',
    fontSize: 16,
    lineHeight: '20px',

    ':hover': {
      background: '#036154',
    },
  },

  playButton: {
    background: '#036154',
  },

  i: {
    fontSize: 16,
    lineHeight: '20px',
    verticalAlign: 'middle',
  },
  span: {
    display: 'inline-block',
    fontSize: 16,
    lineHeight: '20px',
    verticalAlign: 'middle',
  },
};

@connect(
  ({ status }) => ({
    gameStatus: status,
  }),
  dispatch => ({
    onNewGame: e => {
      e.preventDefault();
      e.currentTarget.blur();

      dispatch(startNewGame());
    },
    onPauseGame: e => {
      e.preventDefault();
      e.currentTarget.blur();

      dispatch(pauseGame());
    },
    onResumeGame: e => {
      e.preventDefault();
      e.currentTarget.blur();

      dispatch(resumeGame());
    },
    onUndo: e => {
      e.preventDefault();
      e.currentTarget.blur();

      dispatch(undo());
    },
  })
)
export default class Buttons extends Component {
  static propTypes = {
    gameStatus: PropTypes.string.isRequired,
    onNewGame: PropTypes.func.isRequired,
    onPauseGame: PropTypes.func.isRequired,
    onResumeGame: PropTypes.func.isRequired,
    onUndo: PropTypes.func.isRequired,
  };

  render() {
    const { gameStatus, onNewGame, onPauseGame, onResumeGame, onUndo } = this.props;

    if (gameStatus === INACTIVE_STATE) {
      return (
        <div className={css(styles.playButtons)}>
          <a
            tabIndex="-1"
            role="button"
            className={css(styles.button, styles.playButton)}
            onClick={onResumeGame}
          >
            <i className={`material-icons ${css(styles.i)}`}>play_arrow</i>{' '}
            <span className={css(styles.span)}>Resume Game</span>
          </a>
        </div>
      );
    }

    return (
      <div className={css(styles.buttons)}>
        <a tabIndex="-1" role="button" className={css(styles.button)} onClick={onNewGame}>
          <i className={`material-icons ${css(styles.i)}`}>star</i>{' '}
          <span className={css(styles.span)}>New Game</span>
        </a>
        <a tabIndex="-1" role="button" className={css(styles.button)} onClick={onPauseGame}>
          <i className={`material-icons ${css(styles.i)}`}>pause</i>{' '}
          <span className={css(styles.span)}>Pause Game</span>
        </a>
        <a tabIndex="-1" role="button" className={css(styles.button)} onClick={onUndo}>
          <i className={`material-icons ${css(styles.i)}`}>undo</i>{' '}
          <span className={css(styles.span)}>Undo</span>
        </a>
      </div>
    );
  }
}
