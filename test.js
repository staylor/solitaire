
//var colors = ["blue", "green", "orange", "pink", "purple", "red", "teal", "yellow"];
var colors = ["blue", "green", "red", "yellow"];


var selected = null;

$(function() {

    //var num_boxes = Math.floor(Math.random() * 10) + 6;
    var num_boxes = 10;

    
    // setup boxes
    for (var i = 1; i <= num_boxes; i++) {
        var color = get_color();
        var box = "<div id=\"box" + i + "\" data-id=\"" + i + "\" class=\"box " + color + "\" data-color=\"" + color + "\" style=\"margin-left: " + (i*10) + "px\">" + i + "</div>";
        $("#boxes").append(box);        
        $("#box" + i).css("z-index", i);
    }

    $('.box').draggable(
        {
            //revert: revertHandler,
            revert: true,
            helper: helperHandler,
            //drag: dragHandler,
            start: startHandler,
            stop: stopHandler,
            zIndex: 100,
            cursor: "move",
            //snap: "#drop_box",
            stack: "#contents"
        }
    );

    $('#drop_box').droppable( {
        hoverClass: 'hovered',
        drop: handleDropEvent
    });        
});


function dragHandler(event, ui) {
    console.log("in drag handler: " + event.pageX + ", " + event.pageY);
    //$("#container").css("margin-top", "-80px");
    if (selected != null) {
        selected.hide();
        selected.remove();
        selected = null;
    }
}

function startHandler(event, ui) {
    //console.log("in start handler");
    if (selected != null) {
        selected.hide();
        //selected.remove();
        //selected = null;
    }
}
function stopHandler(event, ui) {
    //console.log("in stop handler");
    if (selected != null) {
        selected.show();
        $(".box").each(function() {
            console.log("set z-index: " + $(this).data("id"));
            $(this).css("z-index", $(this).data("id"));
        });
    }
    
}


function helperHandler(event) {
    //console.log("event pos: " + event.pageX + ", " + event.pageY);
    var id = $(this).data("id");
    console.log("selected: " + id);
    var select_str = "";
    var comma = "";
    for (var i = id; i <= 10; i++) {        
        select_str += comma + "#box" + i;
        comma = ", ";
    }
    console.log("selecting " + select_str);
    selected = $(select_str);

    var container = $('<div/>').attr('id', 'container').css("margin-top", "-80px");
    container.append(selected.clone());    
    return container;
}


function revertHandler(ui) {
    console.log("in revert handler ", event);
    console.log(" ui ", ui);
    if(ui == false){
        // revert back 
        //selected.show();
        return true;
    } else {
        //selected.remove();
        return false;
    }
    
}



function handleDropEvent( event, ui ) {
    var draggable = ui.draggable;

    console.log(draggable.attr('id') + ' was dropped onto ' + $(this).attr("id"));

    $("#container").remove();
    selected.remove();
    
    $("#drop_box").html("DROPPED!");
    
    //ui.draggable.draggable( 'disable' );
    //$(this).droppable( 'disable' );
    //ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
    //ui.draggable.draggable( 'option', 'revert', false );

    
}


function get_color()
{
    var i = Math.floor(Math.random() * colors.length);
    return (colors[i]);
}
