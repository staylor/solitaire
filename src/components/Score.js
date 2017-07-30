import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

@connect(state => ({
  score: state.score,
}))
export default class Score extends Component {
  static propTypes = {
    score: PropTypes.number,
  };

  static defaultProps = {
    score: 0,
  };

  render() {
    const { score } = this.props;

    return (
      <div id="stats_score" className="stats">
        <div className="title">Score</div>
        <span id="score">
          {score}
        </span>
      </div>
    );
  }
}
