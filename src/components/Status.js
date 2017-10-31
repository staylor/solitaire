import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { INACTIVE_STATE } from 'actions';

const Screen = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 125;
  background: rgba(18, 130, 101, 0.95);
`;

@connect(({ status }) => ({ gameStatus: status }))
export default class Status extends Component {
  static propTypes = {
    gameStatus: PropTypes.string.isRequired,
  };
  render() {
    const { gameStatus } = this.props;
    if (gameStatus === INACTIVE_STATE) {
      return <Screen />;
    }
    return null;
  }
}
