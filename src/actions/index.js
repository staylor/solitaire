export const UNDO = 'UNDO';
export const START_NEW_GAME = 'START_NEW_GAME';
export const NEXT_CARD = 'NEXT_CARD';
export const NEW_MOVE = 'NEW_MOVE';
export const DROP_CARD = 'DROP_CARD';

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

export const dropCard = (id, to, from) => ({
  type: DROP_CARD,
  id,
  to,
  from,
});
