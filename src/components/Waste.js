import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'glamor';
import Stack from './Stack';
import { STACK_OFFSET } from '../utils/constants';
import placeholder from '../styles/placeholder';

const styles = {
  placeholder: {
    ...placeholder,
  },
  waste: {
    top: 0,
    left: 115,
  },
  card: {
    marginTop: -1 * STACK_OFFSET,
    ':first-child': {
      marginTop: 0,
    },
  },
};

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
      <div className={css(styles.placeholder, styles.waste)} />,
      <Stack
        style={{ top: 0, left: STACK_OFFSET }}
        id="waste"
        key="waste"
        cardStyle={styles.card}
        stack={waste}
      />,
    ];
  }
}
