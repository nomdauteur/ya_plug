function point(x,y) {
    return {"x":x,"y":y};
}

class Voronoi {
    constructor(points_no, canvas_width, canvas_height) {
        this.canvas_width = canvas_width;
        this.canvas_height = canvas_height;
        this.points_no=points_no;
        this.points = [];
        this.colors=[];
        this.pt_colors=[];
        for (var i = 0; i < points_no; i++) {
            var r = (40+randomInt(200));
            var g = (40+randomInt(200));
            var b = (40+randomInt(200));
            this.colors.push("rgba("+r+","+g+","+b+","+"1)");
            this.pt_colors.push("rgba("+(r-20)+","+(g-20)+","+(b-20)+","+"1)");
            this.points.push({"x":randomInt(canvas_width),"y":randomInt(canvas_height)});
        }
        this.matrix= Array.from({ length: canvas_height }, () => Array(canvas_width).fill(0));
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
                ctx.fillStyle = this.colors[this.matrix[i][j]];
                ctx.fillRect(j, i, 1, 1);
            }
        }
        for (var p = 0; p < this.points_no; p++) {
            drawCircle(ctx, this.points[p].x,this.points[p].y, 3, this.pt_colors[p]);
        }
    }



}