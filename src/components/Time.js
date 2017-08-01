import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { css } from 'glamor';

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

@connect(({ startTime }) => ({
  startTime,
}))
export default class Time extends Component {
  static propTypes = {
    startTime: PropTypes.number.isRequired,
  };

  state = {
    time: null,
  };

  interval = null;

  componentDidMount() {
    this.interval = window.setInterval(() => {
      this.setState({ time: Date.now() });
    }, 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  componentWillReceiveProps() {
    window.clearInterval(this.interval);
    this.interval = window.setInterval(() => {
      this.setState({ time: Date.now() });
    }, 1000);
    this.setState({ time: null });
  }

  render() {
    const { startTime } = this.props;
    const { time } = this.state;

    let dateStr = null;
    if (time === null) {
      dateStr = '0:00';
    } else {
      const diff = time - startTime;
      const seconds = Math.floor(diff / 1000) % 60;
      const minutes = Math.floor(diff / 60000) % 60;

      dateStr = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    }

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
