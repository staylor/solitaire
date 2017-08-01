import Stack from '../Stack';
import Card from '../Card';
import { START_NEW_GAME } from '../actions';
import { shuffle } from '../utils';

function getInitialState() {
  const deck = [];
  for (let i = 0; i < 52; i += 1) {
    deck.push(new Card(i));
  }

  const stock = new Stack();
  const waste = new Stack();
  const tableaus = [];
  const cards = shuffle(deck);

  let ci = 0;

  for (let ti = 0; ti < 7; ti += 1) {
    tableaus[ti] = new Stack(true);
    for (let tci = 0; tci < ti + 1; tci += 1) {
      let face = 'back';
      if (tci === ti) {
        face = 'front';
      }
      tableaus[ti].push(cards[ci], face);
      ci += 1;
    }
  }
  while (ci < cards.length) {
    stock.push(cards[ci], 'back');
    ci += 1;
  }

  return {
    cards: shuffle(cards),
    selected: null,
    stock,
    tableaus,
    waste,
    foundations: {
      clubs: new Stack(),
      diamonds: new Stack(),
      hearts: new Stack(),
      spades: new Stack(),
    },
  };
}

export default function appReducer(state = null, action) {
  if (state === null) {
    state = getInitialState();
  }

  switch (action.type) {
    case START_NEW_GAME:
      return {
        ...getInitialState(),
      };
    default:
      break;
  }
  return state;
}
