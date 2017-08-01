// eslint-disable-next-line
export function getSelectedCards({ item, deck }) {
  if (!item || !item.stackID) {
    return [];
  }
  // $TODO: this kinda sucks
  const [fromStack, fromIndex = null] = item.stackID.split('-');
  let currentStack = null;
  if (fromIndex) {
    currentStack = deck[fromStack][fromIndex];
  } else {
    currentStack = deck[fromStack];
  }
  const indexSlice = currentStack.findIndex(card => card.id === item.card.id);
  const selected = [...currentStack].slice(indexSlice);
  return selected;
}
