
/*
 *  Stack       Max Cards  Start Z-Index
 *  -----       ---------  -------------
 *  stock       24         201
 *  waste       24         301
 *  foundation  13         1
 *  tableau     19         101
 *  <dragged>   13         401
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

    draw_page();
});

/**
 * Write current state of cards to the console.
 */
function dump_state()
{
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
        console.log("tableau " + ti + ": " + str);
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
        console.log("foundation " + fi + ": " + str);
    }
}


function draw_page()
{
    dump_state();
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

    $('.card').draggable({
        revert: true,
        helper: helperHandler,
        //drag: dragHandler,
        start: startHandler,
        stop: stopHandler,
        zIndex: 200,
        cursor: "move",
        stack: "#drag_container"
        });
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
    /*
    if (this.face == 'back') {
        html = "<div class=\"card card_back\">";
    } else {
    */
    html = "<div id=\"card_" + this.id + "\" data-id=\"" + this.id + "\" class=\"card card_front " + this.color +
        "\" style=\"z-index: " + i + "\" data-zi=\"" + i + "\">" +
        "<div class=\"card_value\">" + this.value_str + "</div>" +
        "<div class=\"card_suite\">" + this.suite + "</div>" +
        "<div class=\"card_center\"><div class=\"card_center_suite\">" + this.suite + "</div></div></div>";
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
 * Given stack name returns stack variable.
 */
function get_stack(name)
{
    if (name == "stock") {
        return (stock);
    }
    if (name == "waste") {
        return (waste);
    }
    if (name == "foundation_clubs") {
        return (foundations['clubs']);
    }
    if (name == "foundation_diamonds") {
        return (foundations['diamons']);
    }
    if (name == "foundation_hearts") {
        return (foundations['hearts']);
    }
    if (name == "foundation_spades") {
        return (foundations['spades']);
    }
    if (name == "tableau_1") {
        return (tableaus[1]);
    }
    if (name == "tableau_2") {
        return (tableaus[2]);
    }
    if (name == "tableau_3") {
        return (tableaus[3]);
    }
    if (name == "tableau_4") {
        return (tableaus[4]);
    }
    if (name == "tableau_5") {
        return (tableaus[5]);
    }
    if (name == "tableau_6") {
        return (tableaus[6]);
    }
    if (name == "tableau_7") {
        return (tableaus[7]);
    }
}


/**
 * Create container (stack of cards) to be dragged.
 */
function helperHandler(event)
{
    var id = $(this).attr("id");
    var parts = id.split("_");
    id = parts[1];
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


function get_stack(stack_id)
{
    if (stack_id == "stock") {
        return (stock);
    }
    if (stack_id == "waste") {
        return (waste);
    }
    if (stack_id == "tableau_1") {
        return (tableaus[1]);
    }
    if (stack_id == "tableau_2") {
        return (tableaus[2]);
    }
    if (stack_id == "tableau_3") {
        return (tableaus[3]);
    }
    if (stack_id == "tableau_4") {
        return (tableaus[4]);
    }
    if (stack_id == "tableau_5") {
        return (tableaus[5]);
    }
    if (stack_id == "tableau_6") {
        return (tableaus[6]);
    }
    if (stack_id == "tableau_7") {
        return (tableaus[7]);
    }
    if (stack_id == "foundation_clubs") {
        return (foundations['clubs']);
    }
    if (stack_id == "foundation_clubs") {
        return (foundations['diamonds']);
    }
    if (stack_id == "foundation_clubs") {
        return (foundations['hearts']);
    }
    if (stack_id == "foundation_clubs") {
        return (foundations['spades']);
    }
    return (null);
}
