import { START_NEW_GAME, NEXT_CARD, UNDO, DROP_CARD, RECYCLE } from 'actions';
import { shuffle } from 'utils';
import Card from '../Card';

let stateHistory = [];

function getInitialState() {
  stateHistory = [];

  const deck = [];
  for (let i = 0; i < 52; i += 1) {
    deck.push(new Card(i));
  }

  const stock = [];
  const waste = [];
  const tableaus = [];
  const cards = shuffle(deck);

  let ci = 0;

  for (let ti = 0; ti < 7; ti += 1) {
    tableaus[ti] = [];
    for (let tci = 0; tci < ti + 1; tci += 1) {
      let face = 'back';
      if (tci === ti) {
        face = 'front';
      }
      cards[ci].face = face;
      tableaus[ti].push(cards[ci]);
      ci += 1;
    }
  }
  while (ci < cards.length) {
    cards[ci].face = 'back';
    stock.push(cards[ci]);
    ci += 1;
  }

  return {
    score: 0,
    selected: [],
    stock,
    waste,
    tableaus,
    foundations: {
      clubs: [],
      diamonds: [],
      hearts: [],
      spades: [],
    },
  };
}

const deepClone = obj => JSON.parse(JSON.stringify(obj));

export default function deckReducer(state = null, action) {
  if (state === null) {
    state = getInitialState();
  }

  switch (action.type) {
    case START_NEW_GAME:
      return {
        ...getInitialState(),
      };
    case RECYCLE: {
      const prevState = deepClone(state);
      stateHistory.push(prevState);

      const clonedState = deepClone(state);
      clonedState.stock = [
        ...clonedState.waste.map(card => {
          card.face = 'back';
          return card;
        }),
      ];
      clonedState.stock.reverse();
      clonedState.waste = [];
      clonedState.score = Math.max(0, clonedState.score - 100);
      return clonedState;
    }
    case NEXT_CARD: {
      const prevState = deepClone(state);
      stateHistory.push(prevState);
      const clonedState = deepClone(state);
      const lastCard = clonedState.stock.pop();
      lastCard.face = 'front';
      clonedState.waste.push(lastCard);
      return clonedState;
    }
    case UNDO:
      if (stateHistory.length) {
        return deepClone(stateHistory.pop());
      }
      break;
    case DROP_CARD: {
      const prevState = deepClone(state);
      stateHistory.push(prevState);
      const clonedState = deepClone(state);
      // $TODO: this kinda sucks
      const [toStack, toIndex = null] = action.to.split('-');
      const [fromStack, fromIndex = null] = action.from.split('-');
      action.selected.forEach(selectedCard => {
        let item;
        let itemIndex;

        const findItem = (card, i) => {
          if (card.id === selectedCard.id) {
            itemIndex = i;
            return true;
          }
          return false;
        };

        const removeAndFlip = stack => {
          item = { ...stack.find(findItem) };
          stack.splice(itemIndex, 1);
          const clonedStack = [...stack];
          if (clonedStack.length) {
            clonedStack[clonedStack.length - 1].face = 'front';
            clonedState.score += 5;
          }
          return clonedStack;
        };

        if (fromIndex === null) {
          clonedState[fromStack] = removeAndFlip(clonedState[fromStack]);
        } else {
          clonedState[fromStack][fromIndex] = removeAndFlip(clonedState[fromStack][fromIndex]);
        }

        if (toIndex === null) {
          clonedState[toStack].push(item);
        } else {
          clonedState[toStack][toIndex].push(item);
        }
        if (fromStack === 'waste' && toStack === 'tableaus') {
          clonedState.score += 5;
        } else if (fromStack === 'waste' && toStack === 'foundations') {
          clonedState.score += 10;
        } else if (fromStack === 'tableaus' && toStack === 'foundations') {
          clonedState.score += 10;
        }
      });
      return clonedState;
    }
    default:
      break;
  }
  return state;
}
