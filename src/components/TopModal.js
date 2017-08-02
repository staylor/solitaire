import React from 'react';
import { css } from 'glamor';

const styles = {
  modal: {
    position: 'absolute',
    fontSize: 100,
    left: 100,
    top: 200,
    zIndex: 300,
    color: '#fff',
    textShadow: '2px 2px #bdbdbd',
    fontFamily: '"nyt-karnak-display-130124", georgia, "times new roman", times, serif',
    display: 'none',
  },
};

export default function TopModal() {
  return <div className={css(styles.modal)}>YOU WON!!!</div>;
}
