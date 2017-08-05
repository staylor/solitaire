export const NEW_STATE = 'new';
export const ACTIVE_STATE = 'active';
export const INACTIVE_STATE = 'paused';
export const SUCCESS_STATE = 'success';

export const UNDO = 'UNDO';
export const START_NEW_GAME = 'START_NEW_GAME';
export const PAUSE_GAME = 'PAUSE_GAME';
export const RESUME_GAME = 'RESUME_GAME';
export const WIN_GAME = 'WIN_GAME';
export const NEXT_CARD = 'NEXT_CARD';
export const NEW_MOVE = 'NEW_MOVE';
export const DROP_CARD = 'DROP_CARD';
export const RECYCLE = 'RECYCLE';

export const undo = () => ({
  type: UNDO,
});

export const nextCard = () => ({
  type: NEXT_CARD,
});

export const addNewMove = () => ({
  type: NEW_MOVE,
});

export const startNewGame = () => ({
  type: START_NEW_GAME,
});

export const pauseGame = () => ({
  type: PAUSE_GAME,
});

export const resumeGame = () => ({
  type: RESUME_GAME,
});

export const winGame = () => ({
  type: WIN_GAME,
});

export const dropCard = (selected, to, from) => ({
  type: DROP_CARD,
  selected,
  to,
  from,
});

export const recycleWaste = () => ({
  type: RECYCLE,
});
