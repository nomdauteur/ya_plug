function drawRoundRectangle(ctx,x,y,width,height,rad) {
    ctx.beginPath();
    ctx.moveTo(x+width,y+height);
    ctx.arcTo(x,y+height,x,y,rad);
    ctx.arcTo(x,y,x+width,y,rad);
    ctx.arcTo(x+width,y,x+width,y+height,rad);
    ctx.arcTo(x+width,y+height,x,y+height,rad);
    ctx.fill();
}



function drawCircle(ctx, x, y, radius, fill) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    if (fill!=null) {
        ctx.fillStyle = fill;
        ctx.fill();
    }
}

function imageDataIndex(x,y) {
    return (x + y * canvas.width) * 4;
}

function redrawByPixels(ctx,canvas_width, canvas_height,matrix, colors) { // matrix of pointers to colors[i]
    const imageData = ctx.getImageData(0, 0, canvas_width, canvas_height);
    const data = imageData.data;

    for (let i = 0; i < canvas_height; i++) {
        for (let j = 0; j < canvas_width; j++) {
            var index = imageDataIndex(j,i);
            var color = colors[matrix[i][j]];
            data[index]     = color.r;
            data[index + 1] = color.g; // Green
            data[index + 2] = color.b; // Blue
            data[index + 3] = color.a; // Alpha
        }
    }


    ctx.putImageData(imageData, 0, 0);

}