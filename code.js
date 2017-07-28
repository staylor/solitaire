/**
 *  Stack       Max Cards
 *  -----       ---------
 *  stock       24
 *  waste       24
 *  foundation  13
 *  tableau     19
 *  <dragged>   13
 *
 * To Do
 *  - Save game state history.
 *  - Support undo.
 *  - Keep track of score.
 *  - Double click to auto-place (ace, ...).
 *  - Let put ace any where in foundation.
 * Links
 *  - http://www.elated.com/articles/drag-and-drop-with-jquery-your-essential-guide/
 *  - http://jqueryui.com/draggable/
 *  - http://api.jqueryui.com/draggable/
 */

let cards = [];

// cards currently being dragged
let selected = null;

// stacks
let stock = new Stack(false);
let waste = new Stack(false);
let foundations = [];
let tableaus = [];

let moves = 0;
let start_time = null;
let score = 0;

let clock_timer = null;

$(() => {
  new_game();
});

function new_game() {
  cards = [];
  selected = null;
  stock = new Stack(false);
  waste = new Stack(false);
  foundations = [];
  tableaus = [];
  moves = 0;
  time = 0;
  score = 0;

  setup_deck();

  let ci = 0;

  for (let ti = 1; ti <= 7; ti++) {
    tableaus[ti] = new Stack(true, 101);
    for (let tci = 1; tci <= ti; tci++) {
      var face = 'back';
      if (tci == ti) {
        var face = 'front';
      }
      tableaus[ti].push(cards[ci++], face);
    }
  }
  while (ci < cards.length) {
    stock.push(cards[ci++], 'back');
  }
  // waste.push(cards[ci++], 'front');

  foundations.clubs = new Stack(false, 1);
  foundations.diamonds = new Stack(false, 1);
  foundations.hearts = new Stack(false, 1);
  foundations.spades = new Stack(false, 1);

  if (clock_timer != null) {
    clearTimeout(clock_timer);
    clock_timer = null;
  }
  start_time = Date.now();
  clock_timer = window.setInterval(update_clock, 1000);

  draw_page();

  $('#placeholder_stock').on('click', recycle_waste);

  $('#button_new_game').on('click', new_game);

  // $("#stock .card_back:last-child").on("click", next_card);
}

function update_clock() {
  const cur_time = Date.now();
  // diff time from saved time
  const diff = cur_time - start_time;
  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / 60000) % 60;
  // TBD: add hours

  let date_str = seconds;
  if (seconds < 10) {
    date_str = `0${date_str}`;
  }
  date_str = `${minutes}:${date_str}`;
  /*
    if (hours > 0) {
        if (minutes < 10) {
            date_str = "0" + date_str;
        }
        date_str = hours + ":" + date_str;
    }
*/
  $('#time').html(date_str);
}

function setup_deck() {
  for (i = 0; i < 52; i++) {
    cards.push(new Card(i));
  }
  shuffle(cards);
}

/**
 * Check any cards in tableau need to be flipped.
 */
function flip_tableau_cards() {
  let num_fronts_before = 0;
  let num_fronts_after = 0;

  for (ti in tableaus) {
    var tableau = tableaus[ti];
    for (ci in tableau.cards) {
      var card = tableau.cards[ci];
      if (card.face == 'front') {
        num_fronts_before++;
      }
    }
  }

  for (ti in tableaus) {
    var tableau = tableaus[ti];
    for (ci in tableau.cards) {
      var card = tableau.cards[ci];
      if (ci == tableau.cards.length - 1) {
        // last card in tableau stack so make sure front is showing.
        card.face = 'front';
      }
      if (card.face == 'front') {
        num_fronts_after++;
      }
    }
  }

  if (num_fronts_after > num_fronts_before) {
    score += 5;
  }
}

/**
 * Write current state of cards to the console.
 */
function dump_state() {
  console.log('---------------------');

  let str = '';
  let comma = '';
  let num_cards = 0;
  for (i in stock.cards) {
    var card = stock.cards[i];
    str += comma + card.toString();
    comma = ', ';
  }
  console.log(`stock (${stock.cards.length}): ${str}`);
  num_cards = stock.cards.length;
  str = '';
  comma = '';
  for (i in waste.cards) {
    var card = waste.cards[i];
    str += comma + card.toString();
    comma = ', ';
  }
  console.log(`waste (${waste.cards.length}): ${str}`);
  num_cards += waste.cards.length;

  for (ti in tableaus) {
    str = '';
    comma = '';
    const tableau = tableaus[ti];
    for (ci in tableau.cards) {
      var card = tableau.cards[ci];
      str += comma + card.toString();
      comma = ', ';
    }
    console.log(`tableau${ti} (${tableau.cards.length}): ${str}`);
    num_cards += tableau.cards.length;
  }

  for (fi in foundations) {
    str = '';
    comma = '';
    const foundation = foundations[fi];
    for (ci in foundation.cards) {
      var card = foundation.cards[ci];
      str += comma + card.toString();
      comma = ', ';
    }
    console.log(`${fi} (${foundation.cards.length}): ${str}`);
    num_cards += foundation.cards.length;
  }
  console.log(`number of cards: ${num_cards}`);
}

function draw_page() {
  flip_tableau_cards();
  check_won();
  dump_state();
  $('#tableau_1').html(tableaus[1].toHtml());
  $('#tableau_2').html(tableaus[2].toHtml());
  $('#tableau_3').html(tableaus[3].toHtml());
  $('#tableau_4').html(tableaus[4].toHtml());
  $('#tableau_5').html(tableaus[5].toHtml());
  $('#tableau_6').html(tableaus[6].toHtml());
  $('#tableau_7').html(tableaus[7].toHtml());

  $('#stock').html(stock.toHtml());
  $('#waste').html(waste.toHtml());

  $('#foundation_clubs').html(foundations.clubs.toHtml());
  $('#foundation_diamonds').html(foundations.diamonds.toHtml());
  $('#foundation_hearts').html(foundations.hearts.toHtml());
  $('#foundation_spades').html(foundations.spades.toHtml());

  $('#moves').html(moves);
  $('#score').html(score);

  $('.card_front').draggable({
    revert: true,
    helper: helperHandler,
    start: startHandler,
    stop: stopHandler,
    zIndex: 200,
    cursor: 'move',
    stack: '#drag_container',
  });

  $('.tableau, .foundation').droppable({
    drop: handleDropEvent,
  });
  $('#stock .card_back:last-child').on('click', next_card);
}

/**
 * Flip next card on the waste pile.
 */
function next_card() {
  console.log('Flip next card.');

  const last_card_index = stock.cards.length - 1;
  const move_card = stock.cards.slice(last_card_index);
  move_card[0].face = 'front';
  waste.cards = waste.cards.concat(move_card);
  stock.cards = stock.cards.slice(0, last_card_index);

  moves++;
  draw_page();
}

/**
 * Reshuffle cards from waste and put in stock.
 */
function recycle_waste() {
  if (
    waste.cards != null &&
    waste.cards.length > 0 &&
    (stock.cards == null || stock.cards.length == 0)
  ) {
    console.log('Recycle waste.');

    stock.cards = waste.cards;
    shuffle(stock.cards);
    waste.cards = [];

    for (i in stock.cards) {
      const card = stock.cards[i];
      card.face = 'back';
    }
    score -= 100;
    if (score < 0) {
      score = 0;
    }

    draw_page();
  } else {
    console.log("Didn't recycle waste because stock was set or waste was empty.");
  }
}

/**
 * Stack class.
 */
function Stack(splay) {
  this.cards = [];

  // Whether to splay cards when displaying.  Tableau stacks are splayed.  Other stacks aren't.
  this.splay = splay;
}

// Returns HTML representation of the card stack.
Stack.prototype.push = function(card, face) {
  card.face = face;
  this.cards.push(card);
};

Stack.prototype.toHtml = function() {
  let html = '';
  const top_margin = 0;

  zi = 1;
  for (i in this.cards) {
    const card = this.cards[i];
    html += card.toHtml(zi++);
  }
  return html;
};

/**
 * Card class. Pass value from 0 to 51 to constructor.
 *   value:      1-13
 *   value_str:  A, 1-10, J, Q, K
 *   suit:      ♣, ♦, ❤, ♠
 *   suit_name: clubs, diamonds, hearts, spades
 *   color:      red, black
 *   face:       front, back
 */
function Card(card) {
  this.id = card;
  this.face = 'front';
  this.value = card % 13 + 1;
  if (this.value == 1) {
    this.value_str = 'A';
  } else if (this.value == 11) {
    this.value_str = 'J';
  } else if (this.value == 12) {
    this.value_str = 'Q';
  } else if (this.value == 13) {
    this.value_str = 'K';
  } else {
    this.value_str = this.value;
  }
  this.suit = '♣';
  this.suit_name = 'clubs';

  this.color = 'black';

  if (card >= 39) {
    this.suit = '♠';
    this.suit_name = 'spades';
    this.color = 'black';
  } else if (card >= 26) {
    this.suit = '♦';
    this.suit_name = 'diamonds';
    this.color = 'red';
  } else if (card >= 13) {
    this.suit = '❤';
    this.suit_name = 'hearts';
    this.color = 'red';
  }
}

Card.prototype.toString = function() {
  return this.value_str + this.suit;
};

// Returns HTML representation of the card.
Card.prototype.toHtml = function(i) {
  let html = '';
  if (this.face == 'back') {
    html = `<div data-id="${this
      .id}" class="card card_back"><img src="images/nyt_logo.png"/></div>`;
  } else {
    html =
      `<div id="card_${this.id}" data-id="${this.id}" class="card card_front ${this
        .color}" style="z-index: ${i}" data-zi="${i}">` +
      `<div class="card_value">${this.value_str}</div>` +
      `<div class="card_suit">${get_suit_svg(this.suit_name)}</div>` +
      `<div class="card_center"><div class="card_center_suit">${get_suit_svg(
        this.suit_name
      )}</div></div></div>`;
  }
  return html;
};

/**
 * Shuffles an array.
 */
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/**
 * Given an array of cards, returns the index of the card with the specified id.
 */
function card_index(cards, id) {
  for (i in cards) {
    const card = cards[i];
    if (card.id == id) {
      return i;
    }
  }
  return -1;
}

/**
 * Create container (stack of cards) to be dragged.
 */
function helperHandler(event) {
  const id = $(this).data('id');
  const parent_id = $(this).parent().attr('id');
  console.log(`from: ${parent_id}->${id}`);

  const stack = get_stack(parent_id);

  let select_str = '';
  let comma = '';
  let found = -1;
  for (i in stack.cards) {
    const card = stack.cards[i];
    if (card.id == id) {
      found = i;
    }
    if (found > -1) {
      select_str += `${comma}#card_${card.id}`;
      comma = ', ';
    }
  }
  console.log(`select str: ${select_str}`);
  selected = $(select_str);
  const container = $('<div/>').attr('id', 'drag_container');
  if (found > 0) {
    container.css('margin-top', '-75px');
  }
  container.append(selected.clone());
  return container;
}

function startHandler(event, ui) {
  if (selected != null) {
    selected.hide();
    $('.card').each(function() {
      $(this).css('z-index', $(this).data('zi'));
    });
    $('#drag_container, #drag_container .card').css('z-index', '200');
  }
}

function stopHandler(event, ui) {
  if (selected != null) {
    selected.show();
    $('.card').each(function() {
      $(this).css('z-index', $(this).data('zi'));
    });
  }
}

function handleDropEvent(event, ui) {
  const draggable = ui.draggable;

  console.log(
    `${draggable.parent().attr('id')}->${draggable.attr('id')} was dropped onto ${$(this).attr(
      'id'
    )}`
  );

  const from_card_id = $(ui.draggable[0]).data('id');
  const from_stack_name = $(ui.draggable[0]).closest('.stack').attr('id');
  const to_stack_name = $(this).attr('id');

  console.log(`From: ${from_stack_name}->${from_card_id}`);
  console.log(`To:   ${to_stack_name}`);

  if (from_stack_name == null || to_stack_name == null) {
    return;
  }
  if (
    from_stack_name == to_stack_name ||
    `placeholder_${from_stack_name}` == to_stack_name ||
    `dropzone_${from_stack_name}` == to_stack_name
  ) {
    return;
  }

  // move cards from one stack to another
  const from_stack = get_stack(from_stack_name);
  const to_stack = get_stack(to_stack_name);
  const from_stack_type = get_stack_type(from_stack_name);
  const to_stack_type = get_stack_type(to_stack_name);

  // if tableau then from card has to be one less than last to card and opposite suit or king on empty stack
  const from_card_index = card_index(from_stack.cards, from_card_id);
  const from_card = from_stack.cards[from_card_index];
  let to_card = null;
  if (to_stack.cards.length > 0) {
    to_card = to_stack.cards[to_stack.cards.length - 1];
  }

  console.log(`from card: ${from_card}`);
  console.log(`to card: ${to_card}`);

  if (to_stack_type == 'tableau') {
    if (to_card == null) {
      if (from_card.value != 13) {
        console.log('Can only put king on blank tableau space.');
        return;
      }
    } else {
      if (to_card.color == from_card.color) {
        console.log("Can't put card on like colored card in tableau.");
        return;
      }
      if (to_card.value != from_card.value + 1) {
        console.log('Can only put card one less in value on card in tableau.');
        return;
      }
    }
  } else if (to_stack_type == 'foundation') {
    const to_stack_suit = get_stack_suit(to_stack_name);
    if (to_stack_suit != from_card.suit_name) {
      console.log('Suits must match.');
      return;
    }
    if (to_card == null) {
      if (from_card.value != 1) {
        console.log('Can only put ace on blank foundation space.');
        return;
      }
    } else {
      if (to_card.suit != from_card.suit) {
        console.log('Suits must match in foundation.');
        return;
      }
      if (to_card.value != from_card.value - 1) {
        console.log('Can only put card one greater in value on card in foundation.');
        return;
      }
    }
  }

  if (from_card_index >= 0) {
    const remaining_cards = from_stack.cards.slice(0, from_card_index);
    const move_cards = from_stack.cards.slice(from_card_index);
    to_stack.cards = to_stack.cards.concat(move_cards);
    from_stack.cards = remaining_cards;
  }

  $('#drag_container').remove();
  if (selected != null) {
    selected.remove();
    selected = null;
  }

  moves++;

  // scoring
  console.log(`!!!! from ${from_stack_type} to ${to_stack_type}`);
  if (from_stack_type == 'waste' && to_stack_type == 'tableau') {
    score += 5;
  } else if (from_stack_type == 'waste' && to_stack_type == 'foundation') {
    score += 10;
  } else if (from_stack_type == 'tableau' && to_stack_type == 'foundation') {
    score += 10;
  } else if (from_stack_type == 'foundation' && to_stack_type == 'tableau') {
    score -= 15;
  }
  if (score < 0) {
    score = 0;
  }

  draw_page();
}

/**
 * If game is won, show top_modal.
 */
function check_won() {
  // If all cards in tableaus.
  for (ti in tableaus) {
    const tableau = tableaus[ti];
    for (ci in tableau.cards) {
      const card = tableau.cards[ci];
      if (card.face == 'back') {
        $('#top_modal').hide();
        return;
      }
    }
  }
  $('#top_modal').show();
}

/**
 * Givn stack ID returns stack object.
 */
function get_stack(stack_id) {
  if (stack_id == null) {
    return null;
  }
  if (stack_id.startsWith('stock')) {
    return stock;
  }
  if (stack_id.startsWith('waste')) {
    return waste;
  }
  const parts = stack_id.split('_');
  let index = null;
  if (parts.length > 0) {
    index = parts[parts.length - 1];
  }
  if (
    stack_id.startsWith('tableau') ||
    stack_id.startsWith('placeholder_tableau') ||
    stack_id.startsWith('dropzone_tableau')
  ) {
    if (index != null) {
      return tableaus[index];
    }
  } else if (
    stack_id.startsWith('foundation') ||
    stack_id.startsWith('placeholder_foundation') ||
    stack_id.startsWith('dropzone_foundation')
  ) {
    if (index != null) {
      return foundations[index];
    }
  }
  return null;
}

/**
 * Given stack css id, returns stack type (stock, waste, tableau, or foundation).
 */
function get_stack_type(stack_id) {
  if (
    stack_id.startsWith('tableau') ||
    stack_id.startsWith('placeholder_tableau') ||
    stack_id.startsWith('dropzone_tableau')
  ) {
    return 'tableau';
  }
  if (
    stack_id.startsWith('foundation') ||
    stack_id.startsWith('placeholder_foundation') ||
    stack_id.startsWith('dropzone_foundation')
  ) {
    return 'foundation';
  }
  if (stack_id.startsWith('stock') || stack_id.startsWith('placeholder_stock')) {
    return 'stock';
  }
  if (stack_id.startsWith('waste') || stack_id.startsWith('placeholder_waste')) {
    return 'waste';
  }
  return 'tableau';
}

/**
 * Given foundation stack name, return foundation stack's suit.
 */
function get_stack_suit(stack_id) {
  if (stack_id == null) {
    return null;
  }
  const parts = stack_id.split('_');
  let suit = null;
  if (parts.length > 0) {
    suit = parts[parts.length - 1];
  }
  return suit;
}
