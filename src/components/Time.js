import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { NEW_STATE, INACTIVE_STATE, SUCCESS_STATE } from '../actions';

const styles = {
  stats: {
    display: 'inline-block',
    marginLeft: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 10,
    color: '#9e9e9e',
  },

  time: {
    display: 'inline-block',
  },
};

@connect(({ status }) => ({
  gameStatus: status,
}))
export default class Time extends Component {
  static propTypes = {
    gameStatus: PropTypes.string.isRequired,
  };

  state = {
    time: 0,
  };

  interval = null;

  componentDidMount() {
    this.interval = window.setInterval(() => {
      this.setState(({ time }) => ({ time: time + 1 }));
    }, 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  componentWillReceiveProps(nextProps) {
    window.clearInterval(this.interval);
    if (nextProps.gameStatus === INACTIVE_STATE || nextProps.gameStatus === SUCCESS_STATE) {
      return;
    }
    if (nextProps.gameStatus === NEW_STATE) {
      this.setState({ time: 0 });
    }
    this.interval = window.setInterval(() => {
      this.setState(({ time }) => ({ time: time + 1 }));
    }, 1000);
  }

  render() {
    const { time } = this.state;
    const seconds = time % 60;
    const minutes = Math.floor(time / 60) % 60;
    const dateStr = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

    return (
      <div className={css(styles.stats)}>
        <div className={css(styles.title)}>Time</div>
        <span className={css(styles.time)}>
          {dateStr}
        </span>
      </div>
    );
  }
}
