document.addEventListener("DOMContentLoaded",load);

ya_flag=1;

theField = new Field(10);
window.fieldSize=10;
window.shiftsNo=10;
window.isPlaying=false;

window.addEventListener("resize",() => {theField.resize();});

function load() {
    init_with_lang(ya_flag, newGame, setLangText);
}

function inside_newGame() {
    theField = new Field(window.fieldSize);
    theField.draw_field();
    theField.make_level(window.shiftsNo);
    start(ya_flag);
    window.isPlaying=true;
}

function newGame() {
    window.isPlaying=false;
    while (document.getElementById("canvas").firstChild) {
        document.getElementById("canvas").removeChild(document.getElementById("canvas").lastChild);
    }
    document.getElementById("progress").textContent=setText("Ваши сдвиги: 0","Your shifts: 0");
    show_ads(ya_flag, inside_newGame);

}

function setFieldSize() {
    window.fieldSize=document.getElementById("fieldSizeSelect").value;
}

function setMovesNo() {
    window.shiftsNo=document.getElementById("shiftsNoSelect").value;
}

function setLangText() {
    document.querySelector('details summary').textContent=setText("Выберите параметры новой игры:","Select new game's parameters");
    document.querySelector('label[for="fieldSizeSelect"]').textContent=
        setText("Размер поля:","Field size:");
    document.querySelector('label[for="shiftsNoSelect"]').textContent=
        setText("Число сдвигов:","Shifts number:");
    document.getElementById("changeButton").textContent=setText("Новая игра","New game");
    document.getElementById("progress").textContent=setText("Ваши сдвиги: ","Your shifts: ")+theField.getShiftCount();
    document.getElementById("header").textContent=setText("Квадрат Рубика","Rubik's Square");
    document.getElementById("hint").innerHTML="<i>"+setText("Двигайте квадраты стрелками, чтобы расставить их по порядку.","Move the tiles with arrows to restore their order.")+"</i>";
}