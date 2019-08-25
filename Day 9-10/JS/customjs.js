$("span").draggable({
    revert: true,
    cursor: "move"
}).disableSelection();


$("#name, #place, #animal, #thing").droppable({
    drop: function(event, ui) {
        $(this).css('background', 'white');
        var nameElement = ui.draggable.attr("value");
        var elementId = ui.draggable.attr("id");
        var target = $(event.target);
        if (nameElement == event.target.id) {
            $('#' + elementId).draggable({
                revert: 'false'
            });
             $(ui.draggable).animate({
                 opacity: '0.9'
             }, 1000);
            $(target).last().append(ui.draggable);
            $(ui.draggable).removeClass().attr('style', '');
            $(ui.draggable).addClass("ui-state-default");
        }
    },
    over: function(event, ui) {
        var nameElement = ui.draggable.attr("value");
        if (nameElement == event.target.id) {
            $(this).css('background', 'green');
        } else {
            $(this).css('background', 'red');
        }
    },
    out: function(event, ui) {
        $(this).css('background', 'white');
    }
});