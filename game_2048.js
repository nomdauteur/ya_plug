document.addEventListener("DOMContentLoaded",load);
window.addEventListener("resize",() => {return false;});


theField = new Field();

var xDown = null;
var yDown = null;

var border_style="0.5vmin solid #323232";

function activateMandelbrot() {
    if (SKIN=="mandelbrot") return;
    SKIN = "mandelbrot";
    document.getElementById("mandelbrot").style.border=border_style;
    document.getElementById("burning").style.border="none";
    document.getElementById("inverse").style.border="none";
    theField.draw();
}

function activateBurning() {
    if (SKIN=="burning") return;
    SKIN = "burning";
    document.getElementById("burning").style.border=border_style;
    document.getElementById("mandelbrot").style.border="none";
    document.getElementById("inverse").style.border="none";
    theField.draw();
}

function activateInverse() {
    if (SKIN=="inverse") return;
    SKIN = "inverse";
    document.getElementById("inverse").style.border=border_style;
    document.getElementById("burning").style.border="none";
    document.getElementById("mandelbrot").style.border="none";
    theField.draw();
}


function load() {
    window.dataLoadFinished=0;
    lastAdShown = new Date();


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
    };
    let foo_before=()=>{
        document.getElementById("newGame").textContent=setText("Новая игра","New game");
        document.getElementById("score").textContent=setText("Счет: ","Score: ");
    }

    init_with_lang(ya_flag, foo,foo_before);

}

function newGame() {
    if (document.getElementById("banner"))
        document.body.removeChild(document.getElementById("banner"));
    while (document.getElementById("game").firstChild) {
        document.getElementById("game").removeChild(document.getElementById("game").lastChild);
    }

    theField=this;
    show_ads(ya_flag, ()=>{ theField.init_field();});

}


