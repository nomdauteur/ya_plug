function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

function updateMouse(canvas,e) {
    let mousePos = getMousePos(canvas, e);
    return mousePos;
}

function touchMoveMouse(e) {
    let mousePos = {"x":e.touches[0].clientX,"y":e.touches[0].clientY};
    return mousePos;
}