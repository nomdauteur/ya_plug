document.addEventListener("DOMContentLoaded",load);
window.addEventListener("resize",() => {resize();});


theField = new Field();

var xDown = null;
var yDown = null;

var border_style="0.5vmin solid #323232";

function activateMandelbrot() {
    if (SKIN=="Mandelbrot") return;
    SKIN = "Mandelbrot";
    document.getElementById("mandelbrot").style.border=border_style;
    document.getElementById("burning").style.border="none";
    document.getElementById("inverse").style.border="none";
    theField.draw();
}

function activateBurning() {
    if (SKIN=="BurningShip") return;
    SKIN = "BurningShip";
    document.getElementById("burning").style.border=border_style;
    document.getElementById("mandelbrot").style.border="none";
    document.getElementById("inverse").style.border="none";
    theField.draw();
}

function activateInverse() {
    if (SKIN=="Inverse") return;
    SKIN = "Inverse";
    document.getElementById("inverse").style.border=border_style;
    document.getElementById("burning").style.border="none";
    document.getElementById("mandelbrot").style.border="none";
    theField.draw();
}


function load() {
    document.addEventListener('keydown', (event) => {
        const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
        theField.step(event.key);
    });
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    let foo=()=>{
        document.getElementById("mandelbrot").textContent=setText("Фрактал Мандельброта", "Mandelbrot Fractal");
        document.getElementById("burning").textContent=setText("Пылающий корабль", "Burning Ship");
        document.getElementById("inverse").textContent=setText("Обратный фрактал Мандельброта", "Inverse Mandelbrot");
        newGame();
    };
    let foo_before=()=>{
        document.getElementById("newGame").textContent=setText("Новая игра","New game");
        document.getElementById("score").textContent=setText("Счет: ","Score: ");
        console.log("Before set");

    }

    init_with_lang(ya_flag, foo,foo_before);

}

function newGame() {
    while (document.getElementById("game").firstChild) {
        document.getElementById("game").removeChild(document.getElementById("game").lastChild);
    }

    show_ads(ya_flag, ()=>{ theField.init_field();});

}


