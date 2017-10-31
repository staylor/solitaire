import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Stats, Title } from './styled';

@connect(({ deck }) => ({
  score: deck.score,
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
      <Stats>
        <Title>Score</Title>
        <span id="score">{score}</span>
      </Stats>
    );
  }
}
