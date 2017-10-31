import {
  START_NEW_GAME,
  PAUSE_GAME,
  RESUME_GAME,
  WIN_GAME,
  ACTIVE_STATE,
  INACTIVE_STATE,
  NEW_STATE,
  SUCCESS_STATE,
} from 'actions';

export default function statusReducer(state = ACTIVE_STATE, action) {
  switch (action.type) {
    case START_NEW_GAME:
      return NEW_STATE;
    case PAUSE_GAME:
      return INACTIVE_STATE;
    case RESUME_GAME:
      return ACTIVE_STATE;
    case WIN_GAME:
      return SUCCESS_STATE;
    default:
      break;
  }
  return state;
}
