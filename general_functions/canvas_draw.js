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