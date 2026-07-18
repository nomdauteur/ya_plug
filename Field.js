
var LEFT_OFFSET;
var TOP_OFFSET;
var SIDE;

var lastAdShown;



SIDE=vmin(15);

LEFT_OFFSET=(vw(100)-4.5*SIDE)/2;
TOP_OFFSET=vh(10);

// Tile: initial coordinates, color as function of
// original coordinates and side, current coordinates, misplacedness as function
// Field: array of tiles as entities, array of tiles' indices to shift

class Field {
    constructor(field_side) {
        this.field_side = parseInt(field_side);
        this.tiles = [];
        this.tile_indices=[];
        this.shift_count=0;
        this.emojis="";
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

                document.getElementById("canvas").appendChild(d);
            }
        }

        let theField = this;

        for (var i = 0; i <this.field_side; i++) {
            var d1 = document.createElement("div");
            d1.id="left_arrow_pos_"+i;
            d1.className="arrow";
            d1.innerText=String.fromCodePoint(9664);
            d1.addEventListener('click', function () {
                theField.shift(this.id)
            }, false);
            document.getElementById("canvas").appendChild(d1);

            var d2 = document.createElement("div");
            d2.id="right_arrow_pos_"+i;
            d2.className="arrow";
            d2.innerText=String.fromCodePoint(9654);
            d2.addEventListener('click', function () {
                theField.shift(this.id)
            }, false);
            document.getElementById("canvas").appendChild(d2);

            var d3 = document.createElement("div");
            d3.id="up_arrow_pos_"+i;
            d3.className="arrow";
            d3.innerText=String.fromCodePoint(9650);
            d3.addEventListener('click', function () {
                theField.shift(this.id)
            }, false);
            document.getElementById("canvas").appendChild(d3);

            var d4 = document.createElement("div");
            d4.id="down_arrow_pos_"+i;
            d4.className="arrow";
            d4.innerText=String.fromCodePoint(9660);
            d4.addEventListener('click', function () {
                theField.shift(this.id)
            }, false);
            document.getElementById("canvas").appendChild(d4);
        }
        this.resize();


        //start(ya_flag);
        this.draw();
    }


    draw() {

        for (var i = 0; i < this.field_side; i++)
            for (var j = 0; j < this.field_side; j++) {
                let index = this.tile_indices[i][j];
                document.getElementById("cell_"+i+"_"+j).style.backgroundColor=
                    this.tiles[index.y][index.x].color();
                document.getElementById("cell_"+i+"_"+j).style.color=
                    this.tiles[index.y][index.x].fontColor();
                document.getElementById("cell_"+i+"_"+j).textContent = this.tiles[index.y][index.x].value();
            }


    }

    resize() {
        var w,h;

        if (window.innerWidth >= 9/16*window.innerHeight)
        {
            w = window.innerHeight * 9 / 16;
            h = window.innerHeight;
        }
        else {
            w = window.innerWidth;
            h = window.innerWidth * 16 / 9;
        }

        document.getElementById('upper').style.top = 0 +"px";
        document.getElementById('upper').style.left = (window.innerWidth-w)/2 +"px";
        document.getElementById('upper').style.width = w +"px";
        document.getElementById('upper').style.height = h * 3/16 +"px";

        document.getElementById('canvas').style.width = w +"px";
        document.getElementById('canvas').style.height = h * 9/16 +"px";
        document.getElementById('canvas').style.top = h*3/16 +"px";
        document.getElementById('canvas').style.left = (window.innerWidth-w)/2 +"px";

        document.getElementById('lower').style.width = w +"px";
        document.getElementById('lower').style.height = h * 4/16 +"px";
        document.getElementById('lower').style.top = h*12/16 +"px";
        document.getElementById('lower').style.left = (window.innerWidth-w)/2 +"px";

        let ratio_4 = 4+parseInt(this.field_side);

        for (let i = 0; i <this.field_side; i++) {
            for (let j = 0; j <this.field_side; j++) {
                let cell = document.getElementById("cell_"+i+"_"+j);

                cell.style.width = w/ratio_4 +"px";
                cell.style.height = w/ratio_4 +"px";
                cell.style.borderRadius = "2vmin";
                cell.style.border = "0.1vmin solid #323232";
                cell.style.top = w/ratio_4*(i+2) +"px";
                cell.style.left = w/ratio_4*(j+2) +"px";
                cell.style.fontSize=w/ratio_4/2 +"px";

            }
        }

        for (let i = 0; i <this.field_side; i++) {
            let cell = document.getElementById("left_arrow_pos_"+i);
            cell.style.width = w/ratio_4 +"px";
            cell.style.height = w/ratio_4 +"px";
            cell.style.top = w/ratio_4*(i+2) +"px";
            cell.style.left = w/ratio_4 - vmin(2)+"px";
            cell.style.color="green";
            cell.style.border = "0.1vmin solid #00FF00";
            cell.style.marginRight="2vmin";
            cell.style.fontSize=w/ratio_4/2 +"px";

            cell = document.getElementById("right_arrow_pos_"+i);
            cell.style.width = w/ratio_4 +"px";
            cell.style.height = w/ratio_4 +"px";
            cell.style.top = w/ratio_4*(i+2) +"px";
            cell.style.left = w/ratio_4 * (this.field_side+2) +"px";
            cell.style.color="blue";
            cell.style.border = "0.1vmin solid #0000FF";
            cell.style.marginLeft="2vmin";
            cell.style.fontSize=w/ratio_4/2 +"px";

            cell = document.getElementById("up_arrow_pos_"+i);
            cell.style.width = w/ratio_4 +"px";
            cell.style.height = w/ratio_4 +"px";
            cell.style.top = w/ratio_4 - vmin(2) +"px";
            cell.style.left = w/ratio_4 * (i+2) +"px";
            cell.style.color="orange";
            cell.style.border = "0.1vmin solid #FFA500";
            cell.style.marginBottom="4vmin";
            cell.style.fontSize=w/ratio_4/2 +"px";

            cell = document.getElementById("down_arrow_pos_"+i);
            cell.style.width = w/ratio_4 +"px";
            cell.style.height = w/ratio_4 +"px";
            cell.style.top = w/ratio_4*(parseInt(this.field_side)+2) +"px";
            cell.style.left = w/ratio_4 * (i+2) +"px";
            cell.style.color="red";
            cell.style.border = "0.1vmin solid #FF0000";
            cell.style.marginTop="2vmin";
            cell.style.fontSize=w/ratio_4/2 +"px";
        }


//setField();
    }

    atomary_shift(index,direction) {
        if (direction == 'left') {
            var new_string =new Array(this.field_side).fill({x:-1,y:-1});
            for (var i = 0; i < this.field_side; i++) {
                new_string[(this.field_side+i-1)%this.field_side]=this.tile_indices[index][i];
            }
            this.tile_indices[index] = new_string;
        }
        if (direction == 'right') {
            var new_string =new Array(this.field_side).fill({x:-1,y:-1});
            for (var i = 0; i < this.field_side; i++) {
                new_string[(i+1)%this.field_side]=this.tile_indices[index][i];
            }
            this.tile_indices[index] = new_string;
        }
        if (direction == 'up') {
            var new_string =new Array(this.field_side).fill({x:-1,y:-1});
            for (var i = 0; i < this.field_side; i++) {
                new_string[(this.field_side+i-1)%this.field_side]=this.tile_indices[i][index];
            }
            for (var i = 0; i < this.field_side; i++)
                this.tile_indices[i][index] = new_string[i];
        }
        if (direction == 'down') {
            var new_string =new Array(this.field_side).fill({x:-1,y:-1});
            for (var i = 0; i < this.field_side; i++) {
                new_string[(i+1)%this.field_side]=this.tile_indices[i][index];
            }
            for (var i = 0; i < this.field_side; i++)
                this.tile_indices[i][index] = new_string[i];
        }

        for (let i = 0; i < this.field_side; i++) {
            for (let j = 0; j < this.field_side; j++) {
                this.tiles[i][j].update_coordinates(this.tile_indices[i][j]);
            }
        }

    }

    getShiftCount() {
        return this.shift_count;
    }

    shift(id) {
        if (!window.isPlaying) return;
        this.shift_count+=1;
        document.getElementById("progress").textContent=setText("Ваши сдвиги: ","Your shifts: ")+theField.getShiftCount()
        var splitted = id.split('_');
        var direction = splitted[0];
        var index = splitted[3];
        this.atomary_shift(index,direction);
        if (direction == 'left') {
            this.emojis+=String.fromCodePoint(8678);
        }
        if (direction == 'right') {
            this.emojis+=String.fromCodePoint(8680);
        }
        if (direction == 'up') {
            this.emojis+=String.fromCodePoint(8679);
        }
        if (direction == 'down') {
            this.emojis+=String.fromCodePoint(8681);
        }

        this.draw();
        this.check();

    }

    make_level(shifts_no) {
        let horizontal_shifts = 1+randomInt(shifts_no-2);
        let vertical_shifts = shifts_no-horizontal_shifts;
        for (var i = 0; i < shifts_no; i++) {
            if (Math.random() < 0.5 && horizontal_shifts >0) {
                this.atomary_shift(randomInt(this.field_side-1), ['left','right'][randomInt(1)]);
                horizontal_shifts -= 1;
            }
            else {
                this.atomary_shift(randomInt(this.field_side-1), ['up','down'][randomInt(1)]);
                vertical_shifts -= 1;
            }
        }
        this.draw();
    }

    check() {
        let isMismatched = false;
        for (let i = 0; i < this.field_side; i++) {
            for (let j = 0; j < this.field_side; j++) {
                if (this.tiles[i][j].isMisplaced()) {
                    isMismatched = true;
                    return false;
                }
            }
        }
        if (!isMismatched) {
            let extraShifts = this.shift_count - window.shiftsNo;
            let stars = Math.min(Math.max(Math.ceil(5 - extraShifts/2),1),5);

            let stars_emojis = String.fromCodePoint(11088).repeat(stars);
            document.getElementById("progress").textContent=setText("Вы победили. Ваш результат: ","You won. Your result: ")
                +stars_emojis+ `(${this.shift_count}/${window.shiftsNo})` + setText(". Сыграйте еще раз!", ". Play again!");
            window.isPlaying=false;
            return true;
        }
    }


}

