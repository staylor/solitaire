
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
        var left = Math.floor(Math.random() * 800);
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
            zIndex: 100,
            revert: "invalid",
            cursor: "move",
            snap: ".color_box",
            stack: ".green"
        }
    );

    $('.color_box').droppable( {
        drop: handleDropEvent
    });        
});


function handleDropEvent( event, ui ) {
    var draggable = ui.draggable;
    
    console.log(draggable.attr('id') + ' was dropped onto ' + $(this).attr("id"));

    drag_color = draggable.data("color");
    drop_color = $(this).data("color")
    console.log( drag_color + " compare " + drop_color);
}


function get_color()
{
    var i = Math.floor(Math.random() * colors.length);
    return (colors[i]);
}
