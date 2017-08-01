import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { recycleWaste } from '../actions';
import placeholder from '../styles/placeholder';

const styles = {
  placeholder: {
    ...placeholder,
    cursor: 'pointer',
    left: 0,
    top: 0,
  },
  recycle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 60,
    lineHeight: '105px',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  recycleIcon: {
    ':hover': {
      color: '#ff9800',
    },
  },
};

@connect(null, dispatch => ({
  onRecycle: () => {
    dispatch(recycleWaste());
  },
}))
export default class RecycleButton extends Component {
  static propTypes = {
    onRecycle: PropTypes.func.isRequired,
  };

  render() {
    const { onRecycle } = this.props;

    return (
      <a
        tabIndex="-1"
        role="button"
        className={css(styles.placeholder, styles.recycle)}
        onClick={onRecycle}
      >
        <i className={`${css(styles.recycle, styles.recycleIcon)} material-icons`}>refresh</i>
      </a>
    );
  }
}
