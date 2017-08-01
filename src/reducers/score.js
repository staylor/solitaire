import { START_NEW_GAME } from '../actions';

export default function scoreReducer(state = 0, action) {
  switch (action.type) {
    case START_NEW_GAME:
      return 0;
    default:
      break;
  }
  return state;
}
