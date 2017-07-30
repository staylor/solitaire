import React from 'react';
import { css } from 'glamor';
import Moves from './Moves';
import Time from './Time';
import Score from './Score';

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
    width: '100%',
    height: 'auto',
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
        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTlweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMTkgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ1LjIgKDQzNTE0KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5TaGFwZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMS4wMDAwMDAsIC0xOC4wMDAwMDApIiBmaWxsPSIjRkZGRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMS4wMDAwMDAsIDE4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTE4LjU5NywxNC41MDYgQzE3LjgxOSwxNi41MDkgMTYuMzgzLDE4LjA1NiAxNC4zMjMsMTguODc2IEwxNC4zMjMsMTQuNTA2IEwxNi43ODgsMTIuMzUyIEwxNC4zMjQsMTAuMjI3IEwxNC4zMjQsNy4yMjIgQzE2LjU3LDcuMDcyIDE4LjEzMSw1LjQ2MiAxOC4xMzEsMy40OSBDMTguMTMxLDAuOTEyIDE1LjYwMyw4Ljg4MTc4NDJlLTE1IDE0LjE2OCw4Ljg4MTc4NDJlLTE1IEMxMy44NTYsOC44ODE3ODQyZS0xNSAxMy41MTIsOC44ODE3ODQyZS0xNSAxMy4wMTMsMC4xMjMgTDEzLjAxMywwLjI0NSBDMTMuMjAxLDAuMjQ1IDEzLjQ4MywwLjIxNSAxMy41NzUsMC4yMTUgQzE0LjU3NSwwLjIxNSAxNS4zMjMsMC42NjkgMTUuMzIzLDEuNTUgQzE1LjMyMywyLjIxNyAxNC43NjEsMi44ODUgMTMuNzYzLDIuODg1IEMxMS4yOTcsMi44ODUgOC4zOTYsMC45NDMgNS4yNDMsMC45NDMgQzIuNDM1LDAuOTQyIDAuNTAxLDIuOTc1IDAuNTAxLDUuMDM5IEMwLjUwMSw3LjA3MiAxLjcxNyw3LjczOSAyLjk5Nyw4LjE5NSBMMy4wMjcsOC4wNzMgQzIuNjIzLDcuODMgMi4zNDIsNy40MDYgMi4zNDIsNi43MzcgQzIuMzQyLDUuODI3IDMuMjE1LDUuMDY3IDQuMzA4LDUuMDY3IEM2Ljk2Miw1LjA2NyAxMS4yMzYsNy4yMjIgMTMuODg4LDcuMjIyIEwxNC4xMzgsNy4yMjIgTDE0LjEzOCwxMC4yNTcgTDExLjY3MywxMi4zNSBMMTQuMTM5LDE0LjUwNiBMMTQuMTM5LDE4LjkzNiBDMTMuMTExLDE5LjMgMTIuMDQ5LDE5LjQ1MiAxMC45NTYsMTkuNDUyIEM2LjgzNiwxOS40NTIgNC4yMTYsMTcuMDIyIDQuMjE2LDEyLjk4OCBDNC4yMTYsMTIuMDE4IDQuMzQxLDExLjA3NiA0LjYyMSwxMC4xNjUgTDYuNjgxLDkuMjg1IEw2LjY4MSwxOC4yMDcgTDEwLjg2MywxNi40MTcgTDEwLjg2Myw3LjI4MSBMNC43MTUsOS45NTEgQzUuMzM3LDguMTkxIDYuNjE3LDYuOTE3IDguMTQ1LDYuMTg5IEw4LjExNSw2LjA5NyBDMy45OTUsNi45NzcgMCwxMC4wMTIgMCwxNC41NjQgQzAsMTkuODE0IDQuNTU2LDIzLjQ1NiA5Ljg2MiwyMy40NTYgQzE1LjQ3OSwyMy40NTYgMTguNjYyLDE5LjgxNiAxOC42OTIsMTQuNTAzIEwxOC41OTgsMTQuNTAzIEwxOC41OTgsMTQuNTA2IEwxOC41OTcsMTQuNTA2IFoiPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"
      />
    </div>
    <div className={css(styles.pipe)} />
    <div className={css(styles.title)}>Solitaire</div>
    <div className={css(styles.info)}>
      <Moves />
      <Time />
      <Score />
      <div className={css(styles.help)}>
        <a href="https://en.wikipedia.org/wiki/Klondike_(solitaire)">
          <i className={`${css(styles.settings)} material-icons`}>settings</i>
        </a>
      </div>
    </div>
  </div>;
