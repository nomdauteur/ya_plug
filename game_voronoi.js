var field;
var c;
var ctx;

var WIDTH=0;
var HEIGHT=0;

var RATIO_UP=9;
var RATIO_DOWN=16;


var isGameOn;



function resize() {
    var w,h;

    if (window.innerWidth >= RATIO_UP/RATIO_DOWN*window.innerHeight)
    {
        w = window.innerHeight * RATIO_UP/RATIO_DOWN;
        h = window.innerHeight;
    }
    else {
        w = window.innerWidth;
        h = window.innerWidth * RATIO_DOWN/RATIO_UP;
    }
    console.log(""+w+", "+h);
    WIDTH=Math.floor(w);
    HEIGHT=Math.floor(h * RATIO_UP/RATIO_DOWN);

    ctx = document.getElementById('canvas').getContext('2d');
    ctx.font="bold 5vmin Arial";
    document.getElementById('upper').style.top = 0 +"px";
    document.getElementById('upper').style.left = (window.innerWidth-w)/2 +"px";
    document.getElementById('upper').style.width = w +"px";
    document.getElementById('upper').style.height = h * (RATIO_UP/3)/RATIO_DOWN +"px";


    document.getElementById('canvas').style.width = w +"px";
    document.getElementById('canvas').style.height = h * RATIO_UP/RATIO_DOWN +"px";
    document.getElementById('canvas').width=WIDTH;
    document.getElementById('canvas').height = HEIGHT;
    document.getElementById('canvas').style.top = h*(RATIO_UP/3)/RATIO_DOWN +"px";
    document.getElementById('canvas').style.left = (window.innerWidth-w)/2 +"px";

    document.getElementById('lower').style.width = w +"px";
    document.getElementById('lower').style.height = h * (RATIO_DOWN-RATIO_UP-3)/RATIO_DOWN +"px";
    document.getElementById('lower').style.top = h*(RATIO_UP+3)/RATIO_DOWN +"px";
    document.getElementById('lower').style.left = (window.innerWidth-w)/2 +"px";
    console.log(""+WIDTH+", "+HEIGHT);


    if (ctx!=null && ctx != undefined) {
        //RESIZE CANVAS LOGIC
    }
}

document.addEventListener("DOMContentLoaded",load);

function load() {
    resize();
    var v = new Voronoi(20, WIDTH, HEIGHT);
    v.draw(ctx);
}