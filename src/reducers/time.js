import { START_NEW_GAME } from '../actions';

export default function timeReducer(state = Date.now(), action) {
  switch (action.type) {
    case START_NEW_GAME:
      return Date.now();
    default:
      break;
  }
  return state;
}
