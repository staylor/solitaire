import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'react-emotion';
import { STACK_OFFSET } from 'utils/constants';
import Stack from './Stack';
import Placeholder from './Placeholder';

const placeholderClass = css`
  top: 0;
  left: 115px;
`;

const stackClass = css`
  top: 0;
  left: ${STACK_OFFSET}px;
`;

const cardClass = css`
  margin-top: ${-1 * STACK_OFFSET};
  &:first-child {
    margin-top: 0;
  }
`;

@connect(({ deck }) => ({
  waste: deck.waste,
}))
export default class Waste extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    waste: PropTypes.array.isRequired,
  };

  render() {
    const { waste } = this.props;
    return [
      <Placeholder className={placeholderClass} />,
      <Stack className={stackClass} id="waste" key="waste" cardStyle={cardClass} stack={waste} />,
    ];
  }
}
