
//var colors = ["blue", "green", "orange", "pink", "purple", "red", "teal", "yellow"];
var colors = ["blue", "green", "red", "yellow"];

$(function() {

    var num_boxes = Math.floor(Math.random() * 10) + 6;

    // setup boxes
    for (var i = 1; i <= num_boxes; i++) {
        var color = get_color();
        var box = "<div id=\"box" + i + "\"  class=\"box " + color + "\" data-color=\"" + color + "\"></div>";
        $("#boxes").append(box);        
        var top = Math.floor(Math.random() * 500);
        //var left = Math.floor(Math.random() * 800);
        var left = 10;
        if (color == "blue") {
            left = 200;
        } else if (color == "green") {
            left = 400;
        } else if (color == "red") {
            left = 600;
        } else if (color == "yellow") {
            left = 800;
        }

        $("#box" + i).css("top", top);
        $("#box" + i).css("left", left);
        $("#box" + i).css("z-index", i);
    }

    // set color boxes
    for (var i = 0; i < colors.length; i++) {
        var color_box = "<div id=\"color_" + colors[i] + "\" class=\"color_box\" data-color=\"" + colors[i] + "\">" + colors[i] + "</div>";
        $("#colors").append(color_box);
    }

    $('.box').draggable(
        {
            helper: draggableHelper,
            zIndex: 100,
            revert: true,
            cursor: "move",
            snap: ".color_box",
            stack: "#contents"
        }
    );

    $('.color_box').droppable( {
        accept: ".box",
        hoverClass: 'hovered',
        drop: handleDropEvent
    });        
});


function draggableHelper() {
    //console.log("in draggable helper");
    var color = $(this).data("color");
    var position = $(this).position();
    var selected = $("." + color);
    console.log(color + " selected at " + position.left + ", " + position.top);
    //selected.css("position", "relative");
    //selected.css("top", "");
    //selected.css("left", "");    
    //selected.css("top", position.top);
    //selected.css("left", position.left);

    var container = $('<div/>').attr('id', 'draggingContainer');
    //container.css("top", position.top);
    //container.css("left", position.left);
    //selected.unwrap();
    container.append(selected.clone());
    return container;
}


function handleDropEvent( event, ui ) {
    var draggable = ui.draggable;
    
    console.log(draggable.attr('id') + ' was dropped onto ' + $(this).attr("id"));

    drag_color = draggable.data("color");
    drop_color = $(this).data("color")
    console.log( drag_color + " compare " + drop_color);


    if (drag_color == drop_color) {
        //ui.draggable.addClass( 'correct' );
        ui.draggable.draggable( 'disable' );
        //$(this).droppable( 'disable' );
        ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
        ui.draggable.draggable( 'option', 'revert', false );
    }     
}


function get_color()
{
    var i = Math.floor(Math.random() * colors.length);
    return (colors[i]);
}
