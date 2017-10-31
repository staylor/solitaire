import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'glamor';
import styled from 'react-emotion';
import { recycleWaste } from 'actions';
import Placeholder from './Placeholder';

const Recycle = Placeholder.withComponent('a');
const Button = styled(Recycle)`
  cursor: pointer;
  left: 0;
  top: 0;
`;

const styles = {
  placeholder: {
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
      <Button tabIndex="-1" role="button" className={css(styles.recycle)} onClick={onRecycle}>
        <i className={`${css(styles.recycle, styles.recycleIcon)} material-icons`}>refresh</i>
      </Button>
    );
  }
}
