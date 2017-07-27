
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
 *  - Save game state history
 * Links
 *  - http://www.elated.com/articles/drag-and-drop-with-jquery-your-essential-guide/
 *  - http://jqueryui.com/draggable/
 *  - http://api.jqueryui.com/draggable/
 */

var cards = [];

// cards currently being dragged
var selected = null;

// stacks
var stock = new Stack(false);
var waste = new Stack(false);
var foundations = [];
var tableaus = [];

function setup_deck() {
    for (i=0; i<52; i++) {
        cards.push(new Card(i));
    }
    shuffle(cards);
}


$(function() {
    setup_deck();

    var ci = 0;

    for (var ti = 1; ti <= 7; ti++) {
        tableaus[ti] = new Stack(true, 101);
        for (var tci = 1; tci <= ti; tci++) {
            var face = 'back';
            if (tci == ti) {
                var face = 'front';
            }
            tableaus[ti].push(cards[ci++], face);
        }
    }
    while (ci < (cards.length - 1)) {
        stock.push(cards[ci++], 'back');
    }
    waste.push(cards[ci++], 'front');

    foundations['clubs'] = new Stack(false, 1);
    foundations['diamonds'] = new Stack(false, 1);
    foundations['hearts'] = new Stack(false, 1);
    foundations['spades'] = new Stack(false, 1);

    $("#placeholder_stock").on("click", recycle_waste);

    draw_page();
});


/**
 * Check any cards in tableau need to be flipped.
 */
function flip_tableau_cards()
{
    for (ti in tableaus) {
        var tableau = tableaus[ti];
        for (ci in tableau.cards) {
            var card = tableau.cards[ci];
            if (ci == (tableau.cards.length - 1)) {
                // last card in tableau stack so make sure front is showing.
                card.face = 'front';
            }
        }
    }
}

/**
 * Write current state of cards to the console.
 */
function dump_state()
{
    console.log("---------------------");

    var str = "";
    var comma = "";
    for (i in stock.cards) {
        var card = stock.cards[i];
        str += comma + card.toString();
        comma = ", ";
    }
    console.log("stock: " + str);

    str = "";
    comma = "";
    for (i in waste.cards) {
        var card = waste.cards[i];
        str += comma + card.toString();
        comma = ", ";
    }
    console.log("waste: " + str);

    for (ti in tableaus) {
        str = ""
        comma = ""
        var tableau = tableaus[ti];
        for (ci in tableau.cards) {
            var card = tableau.cards[ci];
            str += comma + card.toString();
            comma = ", ";
        }
        console.log("tableau" + ti + ": " + str);
    }

    for (fi in foundations) {
        str = ""
        comma = ""
        var foundation = foundations[fi];
        for (ci in foundation.cards) {
            var card = foundation.cards[ci];
            str += comma + card.toString();
            comma = ", ";
        }
        console.log(fi + ": " + str);
    }
}


function draw_page()
{
    flip_tableau_cards();
    //dump_state();
    $("#tableau_1").html(tableaus[1].toHtml());
    $("#tableau_2").html(tableaus[2].toHtml());
    $("#tableau_3").html(tableaus[3].toHtml());
    $("#tableau_4").html(tableaus[4].toHtml());
    $("#tableau_5").html(tableaus[5].toHtml());
    $("#tableau_6").html(tableaus[6].toHtml());
    $("#tableau_7").html(tableaus[7].toHtml());

    $("#stock").html(stock.toHtml());
    $("#waste").html(waste.toHtml());

    $("#foundation_clubs").html(foundations['clubs'].toHtml());
    $("#foundation_diamonds").html(foundations['diamonds'].toHtml());
    $("#foundation_hearts").html(foundations['hearts'].toHtml());
    $("#foundation_spades").html(foundations['spades'].toHtml());

    $(".card_front").draggable({
        revert: true,
        helper: helperHandler,
        start: startHandler,
        stop: stopHandler,
        zIndex: 200,
        cursor: "move",
        stack: "#drag_container"
    });

    $(".tableau, .foundation").droppable({
        drop: handleDropEvent
    });

    $("#stock .card_back:last-child").on("click", next_card);
}

/**
 * Flip next card on the waste pile.
 */
function next_card()
{
    console.log("Flip next card.");

    var last_card_index = stock.cards.length - 1;
    var move_card = stock.cards.slice(last_card_index);
    move_card[0].face = "front";
    waste.cards = waste.cards.concat(move_card);
    stock.cards = stock.cards.slice(0, last_card_index);

    draw_page();
}

/**
 * Reshuffle cards from waste and put in stock.
 */
function recycle_waste()
{
    console.log("Recycle waste.");

    stock.cards = waste.cards;
    shuffle(stock.cards);
    waste.cards = [];

    for (i in stock.cards) {
        var card = stock.cards[i];
        card.face = "back";
    }
    draw_page();
}



/**
 * Stack class.
 */
function Stack(splay)
{
    this.cards = [];

    // Whether to splay cards when displaying.  Tableau stacks are splayed.  Other stacks aren't.
    this.splay = splay;
}

// Returns HTML representation of the card stack.
Stack.prototype.push = function(card, face){
    card.face = face;
    this.cards.push(card);
};

Stack.prototype.toHtml = function(){
    var html = "";
    var top_margin = 0;

    zi = 1;
    for (i in this.cards) {
        var card = this.cards[i];
        html += card.toHtml(zi++);
    }
    return (html);
};





/**
 * Card class. Pass value from 0 to 51 to constructor.
 *   value:      1-13
 *   value_str:  A, 1-10, J, Q, K
 *   suite:      ♣, ♦, ❤, ♠
 *   color:      red, black
 *   face:       front, back
 */
function Card(card)
{
    this.id = card;
    this.face = 'front';
    this.value = (card % 13) + 1;
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
    this.suite = "♣";
    this.color = "black";

    if (card >= 39) {
        this.suite = "♠";
        this.color = "black";
    } else if (card >= 26) {
        this.suite = "♦";
        this.color = "red";
    } else if (card >= 13) {
        this.suite = "❤";
        this.color = "red";
    }
}


Card.prototype.toString = function(){
    return (this.value_str + this.suite);
}

// Returns HTML representation of the card.
Card.prototype.toHtml = function(i){
    var html = "";
    if (this.face == 'back') {
        html = "<div data-id=\"" + this.id + "\" class=\"card card_back\"><img src=\"images/nyt_logo.png\"/></div>";
    } else {
        html = "<div id=\"card_" + this.id + "\" data-id=\"" + this.id + "\" class=\"card card_front " + this.color +
            "\" style=\"z-index: " + i + "\" data-zi=\"" + i + "\">" +
            "<div class=\"card_value\">" + this.value_str + "</div>" +
            "<div class=\"card_suite\">" + this.suite + "</div>" +
            "<div class=\"card_center\"><div class=\"card_center_suite\">" + this.suite + "</div></div></div>";
    }
    return (html);
}


/**
 * Shuffles an array.
 */
function shuffle(array)
{
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
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
function card_index(cards, id)
{
    for (i in cards) {
        var card = cards[i];
        if (card.id == id) {
            return (i);
        }
    }
    return (-1);
}


/**
 * Create container (stack of cards) to be dragged.
 */
function helperHandler(event)
{
    var id = $(this).data("id");
    var parent_id = $(this).parent().attr("id");
    console.log("from: " + parent_id +  "->" + id);

    var stack = get_stack(parent_id);

    var select_str = "";
    var comma = "";
    var found = -1;
    for (i in stack.cards) {
        var card = stack.cards[i];
        if (card.id == id) {
            found = i;
        }
        if (found > -1) {
            select_str += comma + "#card_" + card.id;
            comma = ", ";
        }
    }
    console.log("select str: " + select_str);
    selected = $(select_str);
    var container = $('<div/>').attr('id', 'drag_container');
    if (found > 0) {
        container.css("margin-top", "-75px");
    }
    container.append(selected.clone());
    return container;
}

function startHandler(event, ui)
{
    if (selected != null) {
        selected.hide();
        $(".card").each(function() {
            $(this).css("z-index", $(this).data("zi"));
        });
        $("#drag_container, #drag_container .card").css("z-index", "200");
    }
}

function stopHandler(event, ui)
{
    if (selected != null) {
        selected.show();
        $(".card").each(function() {
            $(this).css("z-index", $(this).data("zi"));
        });
    }
}

function handleDropEvent( event, ui ) {
    var draggable = ui.draggable;

    console.log(draggable.parent().attr('id') + "->" + draggable.attr('id') + ' was dropped onto ' + $(this).attr("id"));

    var from_card_id = $(ui['draggable'][0]).data('id');
    var from_stack_name = $(ui['draggable'][0]).closest(".stack").attr("id");
    var to_stack_name = $(this).attr("id");

    console.log("From: " + from_stack_name + "->" + from_card_id);
    console.log("To:   " + to_stack_name);

    if ((from_stack_name == null) || (to_stack_name == null)) {
        return;
    }
    if ((from_stack_name == to_stack_name) ||
        ("placeholder_" + from_stack_name == to_stack_name) ||
        ("dropzone_" + from_stack_name == to_stack_name)) {
        return;
    }

    // move cards from one stack to another
    var from_stack = get_stack(from_stack_name);
    var to_stack = get_stack(to_stack_name);
    var to_stack_type = get_stack_type(to_stack_name);

    // if tableau then from card has to be one less than last to card and opposite suite or king on empty stack
    var from_card_index = card_index(from_stack.cards, from_card_id);
    var from_card = from_stack.cards[from_card_index];
    var to_card = null;
    if (to_stack.cards.length > 0) {
        to_card = to_stack.cards[(to_stack.cards.length - 1)];
    }
        
    console.log("from card: " + from_card);
    console.log("to card: " + to_card);

    if (to_stack_type == "tableau") {
        if (to_card == null) {
            if (from_card.value != 13) {
                console.log ("Can only put king on blank tableau space.");
                return;
            }
        } else {
            if (to_card.color == from_card.color) {
                console.log("Can't put card on like colored card in tableau.");
                return;
            }
            if (to_card.value != (from_card.value + 1)) {
                console.log("Can only put card one less in value on card in tableau.");
                return;
            }

        }
    } else if (to_stack_type == "foundation") {
        if (to_card == null) {
            if (from_card.value != 1) {
                console.log ("Can only put ace on blank foundation space.");
                return;
            }
        }
    }    
    
    if (from_card_index >= 0) {
        var remaining_cards = from_stack.cards.slice(0,from_card_index);
        var move_cards = from_stack.cards.slice(from_card_index);
        to_stack.cards = to_stack.cards.concat(move_cards);
        from_stack.cards = remaining_cards;
    }

    $("#drag_container").remove();
    if (selected != null) {
        selected.remove();
        selected = null;
    }

    draw_page();
}


/**
 * Givn stack ID returns stack object.
 */
function get_stack(stack_id)
{
    if (stack_id == null) {
        return (null);
    }
    if (stack_id.startsWith("stock")) {
        return (stock);
    }
    if (stack_id.startsWith("waste")) {
        return (waste);
    }
    var parts = stack_id.split("_");
    var index = null;
    if (parts.length > 0) {
        index = parts[parts.length - 1];
    }
    if ((stack_id.startsWith("tableau")) ||
        (stack_id.startsWith("placeholder_tableau")) ||
        (stack_id.startsWith("dropzone_tableau"))) {
        if (index != null) {
            return (tableaus[index]);
        }
    } else if ((stack_id.startsWith("foundation")) ||
               (stack_id.startsWith("placeholder_foundation")) ||
               (stack_id.startsWith("dropzone_foundation"))) {
        if (index != null) {
            return (foundations[index]);
        }
    }
    return (null);
}

/**
 * Given stack css id, returns stack type (stock, waste, tableau, or foundation).
 */
function get_stack_type(stack_id)
{
    if ((stack_id.startsWith("tableau")) ||
        (stack_id.startsWith("placeholder_tableau")) ||
        (stack_id.startsWith("dropzone_tableau"))) {
        return ("tableau");
    }
    if ((stack_id.startsWith("foundation")) ||
        (stack_id.startsWith("placeholder_foundation")) ||
        (stack_id.startsWith("dropzone_foundation"))) {       
        return ("foundation");
    }
    if ((stack_id.startsWith("stock")) ||
        (stack_id.startsWith("placeholder_stock"))) {       
        return ("stock");
    }
    if ((stack_id.startsWith("waste")) ||
        (stack_id.startsWith("placeholder_waste"))) {       
        return ("waste");
    }
    return ("tableau");
}
