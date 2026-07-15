
var LEFT_OFFSET;
var TOP_OFFSET;
var SIDE;

var lastAdShown;

ya_flag=0;

SIDE=vmin(15);

LEFT_OFFSET=(vw(100)-4.5*SIDE)/2;
TOP_OFFSET=vh(10);

// Tile: initial coordinates, color as function of
// original coordinates and side, current coordinates, misplacedness as function
// Field: array of tiles as entities, array of tiles' indices to shift

class Field {
    constructor(field_side) {
        this.field_side = field_side;
        this.tiles = [];
        this.tile_indices=[];
        for (var i = 0; i < field_side; i++) {
            this.tiles.push([]);
            this.tile_indices.push([]);
            for (var j = 0; j < field_side; j++) {
                this.tiles[i].push(new Tile(this.field_side,{x:j,y:i}));
                this.tile_indices[i].push({x:j,y:i});
            }
        }
    }

    draw_field() {
        console.log("Fuck you");

        for (var i = 0; i <this.field_side; i++) {
            for (var j=0; j < this.field_side; j++) {
                var d= document.createElement("div");
                d.id='cell_'+i+'_'+j;
                //d.className = d.className + "cell";
                d.className = "cell";
                d.style.left=(LEFT_OFFSET+j*SIDE)+"px";
                d.style.top=(TOP_OFFSET+SIDE*i)+"px";
                d.style.width=SIDE+"px";
                d.style.height=SIDE+"px";
                d.style.fontSize="16vmin";

                document.getElementById("game").appendChild(d);

            }
        }


        //start(ya_flag);
        this.draw();
    }


    draw() {
        console.log("Fuck you harder");

        for (var i = 0; i < this.field_side; i++)
            for (var j = 0; j < this.field_side; j++) {
                let index = this.tile_indices[i][j];
                console.log(this.tiles[index.y][index.x].color());
                document.getElementById("cell_"+i+"_"+j).style.backgroundColor=
                    this.tiles[index.y][index.x].color();
            }


    }


}

