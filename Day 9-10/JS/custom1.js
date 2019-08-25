function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    //ev.target.getAttribute("value")
    ev.dataTransfer.setData("data", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("data");
    let element = document.getElementById(data);
    if (ev.target.id == element.getAttribute("value")) {
            ev.target.appendChild(element);
    }
}