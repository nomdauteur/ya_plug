function point(x,y) {
    return {"x":x,"y":y};
}

function colorString(r,g,b,a=1) {
    return `rgba(${r},${g},${b},${a})`;
}




class Voronoi {
    constructor(points_no, canvas_width, canvas_height) {
        this.canvas_width = canvas_width;
        this.canvas_height = canvas_height;
        this.points_no=points_no;
        this.points = [];
        this.colors=[];
        this.wasClicked=[];
        for (var i = 0; i < points_no; i++) {
            var r = (40+randomInt(160));
            var g = (40+randomInt(160));
            var b = (40+randomInt(160));
            this.colors.push({r:r,g:g,b:b});
            this.points.push({"x":randomInt(canvas_width),"y":randomInt(canvas_height)});
            this.wasClicked.push(0);
        }
        this.matrix= Array.from({ length: canvas_height }, () => Array(canvas_width).fill(0));
    }

    colorString(index) {
        return colorString(this.colors[index].r,this.colors[index].g,this.colors[index].b);
    }

    pt_color(index) {
        return colorString(this.colors[index].r-20,this.colors[index].g-20,this.colors[index].b-20);
    }

    clicked_color(index) {
        return colorString(this.colors[index].r+40,this.colors[index].g+40,this.colors[index].b+40, 0.5);
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
        for (var i = 0; i < this.canvas_height; i++) {
            for (var j = 0; j < this.canvas_width; j++) {
                if (this.wasClicked[this.matrix[i][j]]==0) {
                    ctx.fillStyle = this.colorString(this.matrix[i][j]);

                }
                else {
                    ctx.fillStyle = this.clicked_color(this.matrix[i][j]);
                }
                ctx.fillRect(j, i, 1, 1);
            }
        }
        for (var p = 0; p < this.points_no; p++) {
            drawCircle(ctx, this.points[p].x,this.points[p].y, 10, this.pt_color(p));
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
        this.wasClicked[index]=1;

    }



}