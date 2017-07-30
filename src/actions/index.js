export const START_NEW_GAME = 'START_NEW_GAME';
export const NEW_MOVE = 'NEW_MOVE';

export const addNewMove = () => ({
  type: NEW_MOVE,
});

export const startNewGame = () => ({
  type: START_NEW_GAME,
});
