import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { INACTIVE_STATE, startNewGame, pauseGame, resumeGame, undo } from 'actions';
import { PlayButtons, Button, Icon, Text, playButton, ButtonWrap } from './styled';

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
        <PlayButtons>
          <Button tabIndex="-1" role="button" className={playButton} onClick={onResumeGame}>
            <Icon className="material-icons">play_arrow</Icon> <Text>Resume Game</Text>
          </Button>
        </PlayButtons>
      );
    }

    return (
      <ButtonWrap>
        <Button tabIndex="-1" role="button" onClick={onNewGame}>
          <Icon className="material-icons">star</Icon> <Text>New Game</Text>
        </Button>
        <Button tabIndex="-1" role="button" onClick={onPauseGame}>
          <Icon className="material-icons">pause</Icon> <Text>Pause Game</Text>
        </Button>
        <Button tabIndex="-1" role="button" onClick={onUndo}>
          <Icon className="material-icons">undo</Icon> <Text>Undo</Text>
        </Button>
      </ButtonWrap>
    );
  }
}
