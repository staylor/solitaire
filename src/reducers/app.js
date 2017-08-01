import Card from '../Card';
import { START_NEW_GAME, NEXT_CARD, UNDO } from '../actions';
import { shuffle } from '../utils';

function getInitialState() {
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
    cards: shuffle(cards),
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

const stateHistory = [];

const deepClone = obj => JSON.parse(JSON.stringify(obj));

export default function appReducer(state = null, action) {
  if (state === null) {
    state = getInitialState();
  }

  switch (action.type) {
    case START_NEW_GAME:
      return {
        ...getInitialState(),
      };
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
    default:
      return state;
  }
  return state;
}
