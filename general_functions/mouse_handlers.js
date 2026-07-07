function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

function updateMouse(e) {
    let mousePos = getMousePos(canvas, e);
    return mousePos;
}

function touchMoveMouse(e) {
    let mousePos = {"x":evt.touches[0].clientX,"y":evt.touches[0].clientY};
    return mousePos;
}

function getTouches(evt) {
    return evt.touches ||             // browser API
        evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            theField.step("ArrowLeft");
            /* right swipe */
        } else {
            theField.step("ArrowRight");
            /* left swipe */
        }
    } else {
        if ( yDiff > 0 ) {
            theField.step("ArrowUp");
            /* down swipe */
        } else {
            theField.step("ArrowDown");
            /* up swipe */
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};