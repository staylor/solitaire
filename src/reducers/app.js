import Stack from '../Stack';
import Card from '../Card';
import { shuffle } from '../utils';

function getInitialState() {
  const cards = [];
  const stock = new Stack();
  const tableaus = [];

  for (let i = 0; i < 52; i += 1) {
    cards.push(new Card(i));
  }

  let ci = 0;

  for (let ti = 1; ti <= 7; ti += 1) {
    tableaus[ti] = new Stack(true);
    for (let tci = 1; tci <= ti; tci += 1) {
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
    waste: new Stack(),
    foundations: {
      clubs: new Stack(),
      diamonds: new Stack(),
      hearts: new Stack(),
      spades: new Stack(),
    },
    moves: 0,
    time: 0,
    score: 0,
  };
}

function appReducer(state = null, action) {
  if (state === null) {
    state = getInitialState();
  }

  switch (action.type) {
    default:
      break;
  }
  return state;
}

export default appReducer;
