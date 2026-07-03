function vh(percent) {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (percent * h) / 100;
}

function vw(percent) {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (percent * w) / 100;
}

function vmin(percent) {
    return Math.min(vh(percent), vw(percent));
}

function vmax(percent) {
    return Math.max(vh(percent), vw(percent));
}

function cvh(percent) {
    var h = document.getElementById("canvas").height||0;
    return (percent * h) / 100;
}

function cvw(percent) {
    var w = document.getElementById("canvas").width||0;
    return (percent * w) / 100;
}

function cvmin(percent) {
    return Math.min(vh(percent), vw(percent));
}

function cvmax(percent) {
    return Math.max(vh(percent), vw(percent));
}