import { combineReducers } from 'redux';
import app from './app';
import score from './score';
import moves from './moves';
import time from './time';

const appReducers = combineReducers({
  app,
  score,
  moves,
  startTime: time,
});

export default appReducers;
