

$(function() {    
    var cards = new Array();

    for (i=0; i<=52; i++) {
        cards.push(new Card(i));
    }
    shuffle(cards);
        
    for (i in cards) {
        var card = cards[i];
    }

    var card = cards[0].toHtml();

    $("#stock").html(placeholderHtml(true, null));
    $("#revealed").html(card);

    $("#foundation_clubs").html(placeholderHtml(true, "♣"));
    $("#foundation_diamonds").html(placeholderHtml(false, "♦"));
    $("#foundation_hearts").html(placeholderHtml(false, "❤"));
    $("#foundation_spades").html(placeholderHtml(false, "♠"));

    $("#tableau_slot_1").html(placeholderHtml(true, null));
    $("#tableau_slot_2").html(placeholderHtml(false, null));
    $("#tableau_slot_3").html(placeholderHtml(false, null));
    $("#tableau_slot_4").html(placeholderHtml(false, null));
    $("#tableau_slot_5").html(placeholderHtml(false, null));
    $("#tableau_slot_6").html(placeholderHtml(false, null));
    $("#tableau_slot_7").html(placeholderHtml(false, null));

});


/**
 * Constructor to create a Card object.  Pass value from 0 to 51.
 *   value:      1-13
 *   value_str:  A, 1-10, J, Q, K
 *   suite:      ♣, ♦, ❤, ♠
 *   color:      red, black
 */
function Card(card)
{
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
Card.prototype.toHtml = function(){
    return ("<div class=\"card " + this.color + "\">" +
            "<div class=\"card_value\">" + this.value_str + "</div>" +
            "<div class=\"card_suite\">" + this.suite + "</div>" +
            "<div class=\"card_center\">" + this.suite + "</div>" +
            "</div>");    
};

function placeholderHtml(left, suite)
{
    var html = "<div class=\"placeholder\">";
    if (left == true) {
        html = "<div class=\"placeholder ph_left\">";
    }
    
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
