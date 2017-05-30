

$(function() {
    var cards = new Array();

    for (i=0; i<=52; i++) {
        cards.push(new Card(i));
    }
    shuffle(cards);

    for (i in cards) {
        var card = cards[i];
    }

    var ci = 0;

    ts1_stack = new Stack();
    ts1_stack.push(cards[ci++], 'front');
    $("#tableau_slot_1").html(ts1_stack.toHtml());

    ts2_stack = new Stack();
    ts2_stack.push(cards[ci++], 'back');
    ts2_stack.push(cards[ci++], 'front');
    $("#tableau_slot_2").html(ts2_stack.toHtml());

    ts3_stack = new Stack();
    ts3_stack.push(cards[ci++], 'back');
    ts3_stack.push(cards[ci++], 'back');
    ts3_stack.push(cards[ci++], 'front');
    $("#tableau_slot_3").html(ts3_stack.toHtml());

    ts4_stack = new Stack();
    ts4_stack.push(cards[ci++], 'back');
    ts4_stack.push(cards[ci++], 'back');
    ts4_stack.push(cards[ci++], 'back');
    ts4_stack.push(cards[ci++], 'front');
    $("#tableau_slot_4").html(ts4_stack.toHtml());

    ts5_stack = new Stack();
    ts5_stack.push(cards[ci++], 'back');
    ts5_stack.push(cards[ci++], 'back');
    ts5_stack.push(cards[ci++], 'back');
    ts5_stack.push(cards[ci++], 'back');
    ts5_stack.push(cards[ci++], 'front');
    $("#tableau_slot_5").html(ts5_stack.toHtml());

    ts6_stack = new Stack();
    ts6_stack.push(cards[ci++], 'back');
    ts6_stack.push(cards[ci++], 'back');
    ts6_stack.push(cards[ci++], 'back');
    ts6_stack.push(cards[ci++], 'back');
    ts6_stack.push(cards[ci++], 'back');
    ts6_stack.push(cards[ci++], 'front');
    $("#tableau_slot_6").html(ts6_stack.toHtml());

    ts7_stack = new Stack();
    ts7_stack.push(cards[ci++], 'back');
    ts7_stack.push(cards[ci++], 'back');
    ts7_stack.push(cards[ci++], 'back');
    ts7_stack.push(cards[ci++], 'back');
    ts7_stack.push(cards[ci++], 'back');
    ts7_stack.push(cards[ci++], 'back');
    ts7_stack.push(cards[ci++], 'front');
    $("#tableau_slot_7").html(ts7_stack.toHtml());


    $("#stock").html(placeholderHtml(null));
    $("#revealed").html(placeholderHtml(null));

    $("#foundation_clubs").html(placeholderHtml("♣"));
    $("#foundation_diamonds").html(placeholderHtml("♦"));
    $("#foundation_hearts").html(placeholderHtml("❤"));
    $("#foundation_spades").html(placeholderHtml("♠"));

    $( ".card" ).draggable({
        opacity: 0.9,
        zIndex: 100,
        revert: "invalid"
    });
    $( ".card_back" ).draggable({
        disabled: true
    });
    $( "#tableau .pile, #foundation .pile" ).droppable({
        drop: function(event, ui) {            
            console.log("dropped event: ", event);
        }
    });
});


/**
 * Stack class.
 */
function Stack()
{
    this.cards = new Array();
}

// Returns HTML representation of the card stack.
Stack.prototype.push = function(card, face){
    card.face = face;
    this.cards.push(card);
};

Stack.prototype.toHtml = function(){
    var html = "";
    var top_margin = 0;

    /*
    for (i in this.cards) {
        var card = this.cards[i];
        html += card.toHtml(top_margin, null);
        top_margin = "-70px";
    }
    */
    for (var i=(this.cards.length-1); i>=0; i--) {
        var card = this.cards[i];
        if (i == 0) {
            top_margin = 0;
        }
        html = card.toHtml(html);
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

// Returns HTML representation of the card.
Card.prototype.toHtml = function(inner_html){
    var html = "";
    if (this.face == 'back') {
        html = "<div class=\"card card_back\">";
    } else {
        html = "<div class=\"card card_front " + this.color + "\">" +
            "<div class=\"card_value\">" + this.value_str + "</div>" +
            "<div class=\"card_suite\">" + this.suite + "</div>" +
            "<div class=\"card_center\"><div class=\"card_center_suite\">" + this.suite + "</div></div>";
    }
    if (inner_html != null) {
        html += "<div class=\"sub_cards\">" + inner_html + "</div>";
    }
    html += "</div>";
    return (html);
}

function placeholderHtml(suite)
{
    var html = "<div class=\"placeholder\">";
    if (suite != null) {
        html += "<div class=\"ph_suite\">" + suite + "</div>";
    }
    html += "</div>";
    return (html);
}



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
