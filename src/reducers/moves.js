import { NEW_MOVE, NEXT_CARD, START_NEW_GAME } from '../actions';

export default function movesReducer(state = 0, action) {
  switch (action.type) {
    case NEXT_CARD:
    case NEW_MOVE: {
      const increment = state + 1;
      return increment;
    }
    case START_NEW_GAME:
      return 0;
    default:
      break;
  }
  return state;
}
