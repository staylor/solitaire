import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import PropTypes from 'prop-types';

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

@connect(state => ({
  moves: state.moves,
}))
export default class Moves extends Component {
  static propTypes = {
    moves: PropTypes.number,
  };

  static defaultProps = {
    moves: 0,
  };

  render() {
    const { moves } = this.props;

    return (
      <div className={css(styles.stats)}>
        <div className={css(styles.title)}>Moves</div>
        <span id="moves">
          {moves}
        </span>
      </div>
    );
  }
}
