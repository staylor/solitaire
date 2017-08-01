import React from 'react';
import { css } from 'glamor';
import Moves from './Moves';
import Time from './Time';
import Score from './Score';
import { getTimesIconSVG } from '../utils/svg';

const styles = {
  nav: {
    position: 'relative',
    color: '#fff',
    background: '#128265',
    width: '100%',
    height: '100%',
    zIndex: 1,

    '::after': {
      content: '" "',
      display: 'table',
      clear: 'both',
    },
  },
  pipe: {
    height: 22,
    borderLeft: '1px solid #eee',
    padding: '0 2px',
    marginTop: 9,
    marginLeft: 2,
    marginRight: 2,
    float: 'left',
    display: 'inline-block',
    verticalAlign: 'middle',
  },

  timesIcon: {
    float: 'left',
    display: 'inline-block',
    verticalAlign: 'middle',
    marginTop: 8,
    marginLeft: 20,
    width: 23,
    height: 25,
  },

  timesIconImage: {
    display: 'block',
    width: 23,
    height: 25,
  },

  title: {
    float: 'left',
    display: 'inline-block',
    verticalAlign: 'middle',
    fontFamily: '"nyt-karnak-display-130124", georgia, "times new roman", times, serif',
    fontSize: 25,
    fontWeight: 400,
    paddingTop: 12,
    paddingBottom: 10,
  },

  info: {
    float: 'right',
    textAlign: 'right',
    fontFamily: '"nyt-franklin", arial, serif',
    verticalAlign: 'middle',
  },

  link: {
    color: 'inherit',
  },

  settings: {
    fontSize: 24,
    paddingRight: 20,
    paddingTop: 10,
  },

  help: {
    display: 'inline-block',
    marginLeft: 20,
    textAlign: 'center',
  },
};

export default () =>
  <div className={css(styles.nav)}>
    <div className={css(styles.timesIcon)}>
      <img
        className={css(styles.timesIconImage)}
        alt="The New York Times"
        src={getTimesIconSVG()}
      />
    </div>
    <div className={css(styles.pipe)} />
    <div className={css(styles.title)}>Solitaire</div>
    <div className={css(styles.info)}>
      <Moves />
      <Time />
      <Score />
      <div className={css(styles.help)}>
        <a className={css(styles.link)} href="https://en.wikipedia.org/wiki/Klondike_(solitaire)">
          <i className={`${css(styles.settings)} material-icons`}>settings</i>
        </a>
      </div>
    </div>
  </div>;
