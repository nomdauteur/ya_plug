var field;
var c;
var ctx;

//var WIDTH=300;
//var HEIGHT=300;

var RATIO_UP=9;
var RATIO_DOWN=16;


var isGameOn;

ya_flag=1;

height_diff=0.67;


var v;
window.mousePos={x:0,y:0};
window.points_no=10;

border_style="0.5vmin solid #323232";

function WIDTH() {
    return Math.floor(window.innerWidth*0.9) * 2;
}

function HEIGHT() {
    return Math.floor(window.innerHeight*height_diff) * 2;
}

function makeTen() {
    if (window.points_no==10) return;
    window.points_no = 10;
    document.getElementById("ten").style.border=border_style;
    document.getElementById("t50").style.border="none";
    document.getElementById("t25").style.border="none";
    if (v!=null && v != undefined) newGame();
}

function makeT50() {
    if (window.points_no==50) return;
    window.points_no = 50;
    document.getElementById("ten").style.border="none";
    document.getElementById("t50").style.border=border_style;
    document.getElementById("t25").style.border="none";
    if (v!=null && v != undefined) newGame();
}

function makeT25() {
    if (window.points_no==25) return;
    window.points_no = 25;
    document.getElementById("ten").style.border="none";
    document.getElementById("t50").style.border="none";
    document.getElementById("t25").style.border=border_style;
    if (v!=null && v != undefined) newGame();
}

window.addEventListener('mousemove', updateMouse, false);



function resize() {
    var w,h;

    //This enforces strict 9x16, I want broader
    /*if (window.innerWidth >= RATIO_UP/RATIO_DOWN*window.innerHeight)
    {
        w = window.innerHeight * RATIO_UP/RATIO_DOWN;
        h = window.innerHeight;
    }
    else {
        w = window.innerWidth;
        h = window.innerWidth * RATIO_DOWN/RATIO_UP;
    }*/
    w = 0.9*window.innerWidth;
    h=window.innerHeight;

    first_border_height = 0.12*h;
    second_border_height = 0.85*h;

    ctx.font="bold 5vmin Arial";
    document.getElementById('upper').style.top = 0 +"px";
    document.getElementById('upper').style.left = (window.innerWidth-w)/2 +"px";
    document.getElementById('upper').style.width = w +"px";
    document.getElementById('upper').style.height = first_border_height +"px";


    document.getElementById('canvas').style.width = w +"px";
    document.getElementById('canvas').style.height = (second_border_height-first_border_height) +"px";
    document.getElementById('canvas').width=WIDTH();
    document.getElementById('canvas').height = HEIGHT();
    document.getElementById('canvas').style.top = first_border_height +"px";
    document.getElementById('canvas').style.left = (window.innerWidth-w)/2 +"px";

    document.getElementById('lower').style.width = w +"px";
    document.getElementById('lower').style.height = (h-second_border_height) +"px";
    document.getElementById('lower').style.top = second_border_height +"px";
    document.getElementById('lower').style.left = (window.innerWidth-w)/2 +"px";

    if (v!=null && v != undefined) {
        ctx = document.getElementById('canvas').getContext('2d', { willReadFrequently: true });
        v.resize(WIDTH(),HEIGHT());
        v.draw();
    }
}

document.addEventListener("DOMContentLoaded",load);


function load() {
    ctx = document.getElementById('canvas').getContext('2d', { willReadFrequently: true });

    document.getElementById('canvas').width=WIDTH();
    document.getElementById('canvas').height = HEIGHT();

    document.getElementById('canvas').addEventListener("click",canvasClicked);
    resize();
    init_with_lang(ya_flag, newGame, setLangText);
}

function setLangText() {
    document.getElementById("pts_hint").innerHTML="<i>"+setText("Выберите сложность:","Choose difficulty:")+"</i>";
    document.getElementById("newGame").textContent=setText("Новая игра","New game");

}

function newGame() {
    ctx = document.getElementById('canvas').getContext('2d', { willReadFrequently: true });
    document.getElementById('canvas').width=WIDTH();
    document.getElementById('canvas').height = HEIGHT();

    document.getElementById("hint").innerHTML="<i>"+setText(
        "Соберите цифры от 1 до "+points_no+" по порядку.",
        "Collect numbers from 1 to "+points_no+" in order.")+"</i>";
    document.getElementById("progress").textContent=setText("Вы нашли: 0","You found: 0");
    document.getElementById("timer").textContent="0:00";
    show_ads(ya_flag, nestedNewGame, 1);

}

function nestedNewGame() {
    v = new Voronoi(points_no, WIDTH(), HEIGHT());
    v.draw();
    window.requestAnimationFrame(update);
}

function canvasClicked() {
    console.log("Mouse click inside canvas on "+window.mousePos.x+" "+window.mousePos.y);
    v.click(window.mousePos);
    v.draw();
}

function update() {
    v.draw();
    document.getElementById("progress").textContent=setText("Вы нашли: "+v.maxFoundLabel(),
        "You found: "+v.maxFoundLabel());
    if (v.playerStartTime!=null) document.getElementById("timer").textContent=timeString(Date.now()-v.playerStartTime);
    if (v.win==1) {
        win();
    }
    window.requestAnimationFrame(update);
}



function win() {
    stop();
    document.getElementById("progress").textContent=setText("Вы выиграли!",
        "You won!");
    document.getElementById("timer").textContent=setText("Ваш результат: ", "Your result is ")+
        timeString(Date.now()-v.playerStartTime) +setText(" Хотите сыграть снова?", " Want to play again?");

}