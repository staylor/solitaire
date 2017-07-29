import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Time extends Component {
  static propTypes = {
    startTime: PropTypes.number,
  };

  static defaultProps = {
    startTime: Date.now(),
  };

  state = {
    time: Date.now(),
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

  render() {
    const { startTime } = this.props;
    const { time } = this.state;

    const diff = time - startTime;
    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / 60000) % 60;

    let dateStr = seconds;
    if (seconds < 10) {
      dateStr = `0${dateStr}`;
    }

    return (
      <div id="stats_time" className="stats">
        <div className="title">Time</div>
        <span id="time">{`${minutes}:${dateStr}`}</span>
      </div>
    );
  }
}
