import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'emotion';
import { nextCard } from 'actions';
import { STACK_OFFSET } from 'utils/constants';
import Placeholder from './Placeholder';
import Stack from './Stack';
import RecycleButton from './RecycleButton';

const stockClass = css`
  top: 0;
  left: 0;
  cursor: pointer;
`;

const cardClass = css`
  margin-top: ${-1 * STACK_OFFSET};
  &:first-child {
    margin-top: 0;
  }
`;

@connect(
  ({ deck }) => ({
    stock: deck.stock,
  }),
  dispatch => ({
    onNextCard: () => {
      dispatch(nextCard());
    },
  })
)
export default class Stock extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    stock: PropTypes.array.isRequired,
    onNextCard: PropTypes.func.isRequired,
  };

  render() {
    const { stock, onNextCard } = this.props;
    return [
      <Placeholder className={stockClass} />,
      <Stack
        style={{ top: 0, left: 0 }}
        id="stock"
        key="stock"
        cardStyle={cardClass}
        stack={stock}
        onClick={onNextCard}
      />,
      stock.length === 0 && <RecycleButton />,
    ];
  }
}
