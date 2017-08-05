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
};

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
      <div className={css(styles.stats)}>
        <div className={css(styles.title)}>Score</div>
        <span id="score">
          {score}
        </span>
      </div>
    );
  }
}
