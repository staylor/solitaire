import { combineReducers } from 'redux';
import deck from './deck';
import score from './score';
import moves from './moves';
import time from './time';

const appReducers = combineReducers({
  deck,
  score,
  moves,
  startTime: time,
});

export default appReducers;
