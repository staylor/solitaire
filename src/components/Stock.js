import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { nextCard } from '../actions';
import Stack from './Stack';
import RecycleButton from './RecycleButton';
import { STACK_OFFSET } from '../utils/constants';
import placeholder from '../styles/placeholder';

const styles = {
  placeholder: {
    ...placeholder,
  },
  stock: {
    top: 0,
    left: 0,
    cursor: 'pointer',
  },
  card: {
    marginTop: -1 * STACK_OFFSET,
    ':first-child': {
      marginTop: 0,
    },
  },
};

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
      <div className={css(styles.placeholder, styles.stock)} />,
      <Stack
        style={{ top: 0, left: 0 }}
        id="stock"
        key="stock"
        cardStyle={styles.card}
        stack={stock}
        onClick={onNextCard}
      />,
      stock.length === 0 && <RecycleButton />,
    ];
  }
}
