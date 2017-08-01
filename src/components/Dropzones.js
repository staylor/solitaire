import React from 'react';
import { css } from 'glamor';
import { STACK_OFFSET } from '../utils/constants';

const styles = {
  dropzone: {
    position: 'absolute',
    zIndex: 0,
    width: STACK_OFFSET,
  },
};

export default () =>
  <div>
    {Array.from(Array(4).keys()).map(i => {
      const id = `dropzone-suit-${i}`;
      return (
        <div
          id={id}
          key={id}
          className={css(styles.dropzone, {
            height: 160,
            top: -25,
            left: STACK_OFFSET * 2 + i * STACK_OFFSET,
          })}
        />
      );
    })}
    {Array.from(Array(7).keys()).map(i => {
      const id = `dropzone-tableau-${i}`;
      return (
        <div
          id={id}
          key={id}
          className={css(styles.dropzone, {
            height: 900,
            top: 150,
            left: -15 + i * STACK_OFFSET,
          })}
        />
      );
    })}
  </div>;
