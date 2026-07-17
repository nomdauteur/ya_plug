document.addEventListener("DOMContentLoaded",load);



theField = new Field(4);

window.addEventListener("resize",() => {theField.resize();});

function load() {
    theField.draw_field();
    theField.make_level(5);
}
