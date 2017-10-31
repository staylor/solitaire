import React from 'react';
import Moves from './Moves';
import Time from './Time';
import Score from './Score';
import { getTimesIconSVG } from '../../utils/svg';
import {
  Stats,
  Wrap,
  Pipe,
  TimesIcon,
  TimesIconImage,
  NavTitle,
  NavInfo,
  Settings,
} from './styled';

export default function Nav() {
  return (
    <Wrap>
      <TimesIcon>
        <TimesIconImage alt="The New York Times" src={getTimesIconSVG()} />
      </TimesIcon>
      <Pipe />
      <NavTitle>Solitaire</NavTitle>
      <NavInfo>
        <Moves />
        <Time />
        <Score />
        <Stats>
          <a href="https://en.wikipedia.org/wiki/Klondike_(solitaire)">
            <Settings className="material-icons">settings</Settings>
          </a>
        </Stats>
      </NavInfo>
    </Wrap>
  );
}
