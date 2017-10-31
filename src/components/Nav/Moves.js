import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Stats, Title } from './styled';

@connect(({ moves }) => ({
  moves,
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
      <Stats>
        <Title>Moves</Title>
        <span id="moves">{moves}</span>
      </Stats>
    );
  }
}
