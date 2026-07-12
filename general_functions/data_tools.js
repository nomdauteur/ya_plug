function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

function copyArr(srcArray) {
    var len = srcArray.length;
    dstArray = new Array(len); // boost in Safari
    for (var i=0; i<len; ++i)
        dstArray[i] = srcArray[i].slice(0);
    return dstArray;
}

function removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function timeString(delta) {
    int_mins = Math.floor(delta / 1000 / 60);
    secs = ("0"+Math.floor(delta / 1000 - 60* int_mins)).slice(-2);
    mins = ("0"+int_mins).slice(-2);
    return `${mins}:${secs}`;
}