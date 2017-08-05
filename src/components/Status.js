import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { INACTIVE_STATE } from '../actions';

const styles = {
  screen: {
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 125,
    background: 'rgba(18,130,101,0.95)',
  },
};

@connect(({ status }) => ({ gameStatus: status }))
export default class Status extends Component {
  static propTypes = {
    gameStatus: PropTypes.string.isRequired,
  };
  render() {
    const { gameStatus } = this.props;
    if (gameStatus === INACTIVE_STATE) {
      return <div className={css(styles.screen)} />;
    }
    return null;
  }
}
