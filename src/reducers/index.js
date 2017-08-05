import { combineReducers } from 'redux';
import deck from './deck';
import moves from './moves';
import status from './status';

const appReducers = combineReducers({
  deck,
  moves,
  status,
});

export default appReducers;
