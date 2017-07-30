import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
      <div className="stats">
        <div className="title">Moves</div>
        <span id="moves">
          {moves}
        </span>
      </div>
    );
  }
}
