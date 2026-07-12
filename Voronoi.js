EPSILON = 5;
RADIUS=10;

function getContrastColor(r, g, b) {
    // YIQ formula approximation
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

    // Return black for light backgrounds, white for dark backgrounds
    return (yiq >= 128) ? {r:0,g:0,b:0,a:255} : {r:255,g:255,b:255,a:255};
}

function point(x,y) {
    return {x:x,y:y};
}



function colorString(color) {
    return `rgba(${color.r},${color.g},${color.b},${color.a})`;
}

function color(r,g,b,a=255) {
    return {r:r,g:g,b:b,a:a};
}

function antiColor(color) {
    //return {r:255-color.r,g:255-color.g,b:255-color.b,a:color.a};
    return getContrastColor(color);
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
        this.playerStartTime=null;
        this.win=0;
        for (var i = 0; i < points_no; i++) {
            var r = (50+randomInt(160));
            var g = (50+randomInt(160));
            var b = (50+randomInt(160));
            this.colors.push({r:r,g:g,b:b, a:255});
            this.points.push({x:randomInt(canvas_width),y:randomInt(canvas_height)});
            this.speeds.push({x:-10+Math.random()*20,y:-10+Math.random()*20});
        }
        this.matrix= Array.from({ length: canvas_height }, () => Array(canvas_width).fill(0));
    }



    label(index) {
        return (index+1);
    }

    maxFoundLabel() {
        return this.label(this.maxClicked);
    }

    colorString(index) {
        return colorString(color(this.colors[index].r,this.colors[index].g,this.colors[index].b));
    }

    pt_color(index) {
        return color(this.colors[index].r-50,this.colors[index].g-50,this.colors[index].b-50);
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

    draw() {
        this.compute_matrix();
        ctx = document.getElementById('canvas').getContext('2d', { willReadFrequently: true });
        ctx.fillStyle = "rgba(255,255,255,255)";
        ctx.fillRect(0, 0, this.canvas_width, this.canvas_height);
        var colors = [];
        for (var p = 0; p < this.points_no; p++) {
            if (p <= this.maxClicked) colors.push(this.clicked_color(p));
            else colors.push(this.colors[p]);
        }

        redrawByPixels(ctx,this.canvas_width, this.canvas_height,this.matrix, colors);

        ctx.font="9vmin Arial";
        for (var p = 0; p < this.points_no; p++) {


            drawCircle(ctx, this.points[p].x,this.points[p].y, RADIUS, colorString(this.pt_color(p)));
            ctx.fillStyle = colorString(antiColor(this.pt_color(p)));
            ctx.fillText(""+this.label(p),this.points[p].x-(RADIUS/2),this.points[p].y+(RADIUS/2));
        }


    }

    clickedOn(mousePos) {
        if (mousePos.x<0 || mousePos.x>this.canvas_width) return -1;
        if (mousePos.y<0 || mousePos.y>this.canvas_height) return -1;
        return this.matrix[Math.floor(mousePos.y)][Math.floor(mousePos.x)];
    }

    clickedInto(mousePos) {
        var results=[];
        for (var p = 0; p < this.points_no; p++) {
            if (pointsDistance(this.points[p],mousePos)<RADIUS) {
                results.push(p);
            }
        }
        return results;
    }

    click(mousePos) {
        var index = this.clickedOn(mousePos);
        console.log("Clicked on " + index);
        var indices_radii=this.clickedInto(mousePos);
        console.log("Clicked into " + indices_radii);
        if (this.maxClicked+1==index || indices_radii.includes(this.maxClicked+1)) {
            this.maxClicked+=1;
            if (this.playerStartTime===null) this.playerStartTime=Date.now();
            console.log("Good click");
            if (this.maxClicked==this.points_no-1) {
                this.win=1;
            }
        }
        else {
            console.log("Wrong click");
        }

    }

    changeBallPos(index, delta) {
        var nextPoint = {x: this.points[index].x + delta * this.speeds[index].x,
            y: this.points[index].y + delta * this.speeds[index].y};
        if (nextPoint.x < RADIUS) {
            this.speeds[index].x = -this.speeds[index].x;
            nextPoint.x = RADIUS;
        }
        if (nextPoint.x > this.canvas_width-RADIUS) {
            this.speeds[index].x = -this.speeds[index].x;
            nextPoint.x = this.canvas_width-RADIUS;
        }
        if (nextPoint.y < RADIUS) {
            this.speeds[index].y = -this.speeds[index].y;
            nextPoint.y = RADIUS;
        }
        if (nextPoint.y > this.canvas_height-RADIUS) {
            this.speeds[index].y = -this.speeds[index].y;
            nextPoint.y = this.canvas_height-RADIUS;
        }
        this.points[index] = nextPoint;

    }

    update() {
        //ctx = document.getElementById('canvas').getContext('2d', { willReadFrequently: true });
        var currTime = Date.now();
        var delta = (currTime-this.timeLastUpdate)/1000;

        for (var p = 0; p < this.points_no; p++) {
            this.changeBallPos(p, delta);
        }

        this.timeLastUpdate=currTime;
        this.draw();
    }



}