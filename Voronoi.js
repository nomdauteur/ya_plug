EPSILON = 0.01;

function point(x,y) {
    return {x:x,y:y};
}

function colorString(r,g,b,a=255) {
    return `rgba(${r},${g},${b},${a})`;
}

function color(r,g,b,a=255) {
    return {r:r,g:g,b:b,a:a};
}




class Voronoi {
    constructor(points_no, canvas_width, canvas_height) {
        this.canvas_width = canvas_width;
        this.canvas_height = canvas_height;
        this.points_no=points_no;
        this.points = [];
        this.colors=[];
        this.maxClicked=-1;
        this.speeds=[];
        this.timeBorn=Date.now();
        this.timeLastUpdate=Date.now();
        for (var i = 0; i < points_no; i++) {
            var r = (40+randomInt(160));
            var g = (40+randomInt(160));
            var b = (40+randomInt(160));
            this.colors.push({r:r,g:g,b:b, a:255});
            this.points.push({x:randomInt(canvas_width),y:randomInt(canvas_height)});
            this.speeds.push({x:-10+Math.random()*20,y:-10+Math.random()*20});
        }
        this.matrix= Array.from({ length: canvas_height }, () => Array(canvas_width).fill(0));
    }

    colorString(index) {
        return colorString(this.colors[index].r,this.colors[index].g,this.colors[index].b);
    }

    pt_color(index) {
        return colorString(this.colors[index].r-40,this.colors[index].g-40,this.colors[index].b-40);
    }

    clicked_color(index) {
        return color(this.colors[index].r+40,this.colors[index].g+40,this.colors[index].b+40, 255);
    }

    compute_matrix() { // for now static
        for (var i = 0; i < this.canvas_height; i++) {
            for (var j = 0; j < this.canvas_width; j++) {
                var min_distance = pointsDistance(this.points[0], point(j,i));
                for (var p = 0; p < this.points_no; p++) {
                    var dist = pointsDistance(this.points[p], point(j,i));
                    if (dist<min_distance) {
                        min_distance=dist;
                        this.matrix[i][j]=p;
                    }
                }
            }
        }
    }

    draw(ctx) {
        this.compute_matrix();
        ctx.clearRect(0, 0, this.canvas_width, this.canvas_height);
        ctx.fillStyle = "rgba(255,255,255,255)";
        ctx.fillRect(0, 0, this.canvas_width, this.canvas_height);
        var colors = [];
        for (var p = 0; p < this.points_no; p++) {
            if (p <= this.maxClicked) colors.push(this.clicked_color(p));
            else colors.push(this.colors[p]);
        }

        redrawByPixels(ctx,this.canvas_width, this.canvas_height,this.matrix, colors);

        ctx.font="7vmin Arial";
        for (var p = 0; p < this.points_no; p++) {
            //drawCircle(ctx, this.points[p].x,this.points[p].y, 10, this.pt_color(p));
            ctx.fillStyle = this.pt_color(p);
            ctx.fillText(""+p,this.points[p].x,this.points[p].y);
        }


    }

    clickedOn(mousePos) {
        if (mousePos.x<0 || mousePos.x>this.canvas_width) return -1;
        if (mousePos.y<0 || mousePos.y>this.canvas_height) return -1;
        return this.matrix[Math.floor(mousePos.y)][Math.floor(mousePos.x)];
    }

    click(mousePos) {
        var index = this.clickedOn(mousePos);
        console.log("Clicked on " + index);
        if (this.maxClicked+1==index) {
            this.maxClicked=index;
        }
        else {
            console.log("Wrong click");
        }

    }

    changeBallPos(index, delta) {
        var nextPoint = {x: this.points[index].x + delta * this.speeds[index].x,
            y: this.points[index].y + delta * this.speeds[index].y};
        if (nextPoint.x < EPSILON) {
            this.speeds[index].x = -this.speeds[index].x;
            nextPoint.x = EPSILON;
        }
        if (nextPoint.x > this.canvas_width+EPSILON) {
            this.speeds[index].x = -this.speeds[index].x;
            nextPoint.x = this.canvas_width+EPSILON;
        }
        if (nextPoint.y < EPSILON) {
            this.speeds[index].y = -this.speeds[index].y;
            nextPoint.y = EPSILON;
        }
        if (nextPoint.y > this.canvas_height+EPSILON) {
            this.speeds[index].y = -this.speeds[index].y;
            nextPoint.y = this.canvas_height+EPSILON;
        }
        this.points[index] = nextPoint;

    }

    update(ctx) {
        var currTime = Date.now();
        var delta = (currTime-this.timeLastUpdate)/1000;

        for (var p = 0; p < this.points_no; p++) {
            this.changeBallPos(p, delta);
        }

        this.timeLastUpdate=currTime;
        this.draw(ctx);
    }



}