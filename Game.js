document.addEventListener("DOMContentLoaded",load);

ya_flag=0;
window.isPlaying=false;

window.addEventListener("resize",resize);

function load() {
    let text = new Text(levels[0], 5, 20);
    text.draw();
    //init_with_lang(ya_flag, newGame, setLangText);
}

function resize() {
    var w,h;

    if (window.innerWidth >= 9/16*window.innerHeight)
    {
        w = window.innerHeight * 9 / 16;
        h = window.innerHeight;
    }
    else {
        w = window.innerWidth;
        h = window.innerWidth * 16 / 9;
    }

    document.getElementById('upper').style.top = 0 +"px";
    document.getElementById('upper').style.left = (window.innerWidth-w)/2 +"px";
    document.getElementById('upper').style.width = w +"px";
    document.getElementById('upper').style.height = h * 3/16 +"px";

    document.getElementById('canvas').style.width = w +"px";
    document.getElementById('canvas').style.height = h * 9/16 +"px";
    document.getElementById('canvas').style.top = h*3/16 +"px";
    document.getElementById('canvas').style.left = (window.innerWidth-w)/2 +"px";

    document.getElementById('lower').style.width = w +"px";
    document.getElementById('lower').style.height = h * 4/16 +"px";
    document.getElementById('lower').style.top = h*12/16 +"px";
    document.getElementById('lower').style.left = (window.innerWidth-w)/2 +"px";
}

function clicked(a) {
    console.log(a);
    console.log(`id: ${a.id}, value: ${a.textContent}`);
}