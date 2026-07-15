
var LEFT_OFFSET;
var TOP_OFFSET;
var SIDE;


ya_flag=1;
lb_name="";

MAX_DEGREE=15;

SKIN=''; //if several modes, then mode name


class Field {
    constructor() {
        this.width = 4;
        this.height = 4;
        this.field = Array(this.height).fill(0).map(x => Array(this.width).fill(0));


        this.isPlaying=false;
        this.score=0;

    }

    logField() {
        console.log(this.field);
        for (var i = 0; i < this.height; i++)
            for (var j = 0; j < this.width; j++) {
                console.log(i+"_"+j);
                console.log(this.field[i][j].value);
            }
    }



    init_field() {
        for (var i = 0; i < this.height; i++)
            for (var j = 0; j < this.width; j++)
                this.field[i][j]=new Tile(0,j,i, this.width,this.height);
        this.score=0;
        document.getElementById("score").textContent=setText("Счет: ","Score: ")+this.score;

        SIDE=vmin(15);

        LEFT_OFFSET=(vw(100)-4.5*SIDE)/2;
        TOP_OFFSET=vh(10);


        var init_y = randomInt(this.height-1);
        var init_x = randomInt(this.width-1);
        var fig = randomInt(1)+1;

        this.field[init_y][init_x]=new Tile(fig,init_x,init_y, this.width,this.height);

        for (var i = 0; i <this.height; i++) {
            for (var j=0; j < this.width; j++) {
                var d= document.createElement("div");
                d.id='cell_'+i+'_'+j;
                //d.className = d.className + "cell";
                d.className = "cell";
                d.style.left=(LEFT_OFFSET+j*SIDE)+"px";
                d.style.top=(TOP_OFFSET+SIDE*i)+"px";
                d.style.width=SIDE+"px";
                d.style.height=SIDE+"px";
                d.style.fontSize="16vmin";

                const _i=i;
                const _j=j;
                document.getElementById("game").appendChild(d);

            }
        }

        /*document.getElementById("newGame").style.bottom="15vh";
        document.getElementById("score").style.bottom="15vh";

        if (window.innerHeight>=window.innerWidth)
        {
            document.getElementById("newGame").style.left="85vw";
            document.getElementById("score").style.left="65vw";
            document.getElementById("newGame").style.bottom="5vh";
        }*/
        this.isPlaying=true;

        start(ya_flag);
        this.draw();
    }

    canMove(y,x,eventKey) {
        if (!this.field[y][x].existsNextCell(eventKey)) return false;
        var incr_x=(eventKey=="ArrowLeft"?-1:(eventKey=="ArrowRight"?1:0));
        var incr_y=(eventKey=="ArrowDown"?1:(eventKey=="ArrowUp"?-1:0));
        var value = this.field[y][x].value;

        return ((this.field[y+incr_y][x+incr_x].value==0) || (this.field[y+incr_y][x+incr_x].value==value));

    }

    getNextPlace(y,x,eventKey) {
        var value = this.field[y][x].value;
        if (!this.field[y][x].existsNextCell(eventKey)) return {"x":x,"y":y};
        else {
            var incr_x=(eventKey=="ArrowLeft"?-1:(eventKey=="ArrowRight"?1:0));
            var incr_y=(eventKey=="ArrowDown"?1:(eventKey=="ArrowUp"?-1:0));

            while (this.canMove(y,x,eventKey)) {
                if (this.field[y][x].value==value && value==MAX_DEGREE) break;
                x+=incr_x; y+=incr_y;
                if (this.field[y][x].value==value) break;
            }

            return {"x":x,"y":y};
        }
    }

    ismovable(i,j) {
        if (this.canMove(i,j,"ArrowRight")) return true;
        if (this.canMove(i,j,"ArrowLeft")) return true;
        if (this.canMove(i,j,"ArrowUp")) return true;
        if (this.canMove(i,j,"ArrowDown")) return true;

        return false;
    }

    step(eventKey) //"ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    {	if (!this.isPlaying) return;
        if (eventKey!="ArrowRight" && eventKey!="ArrowLeft" && eventKey!="ArrowUp"&& eventKey!="ArrowDown") return;
        for (var a = 0; a < this.height; a++)
            for (var b = 0; b < this.width; b++)
                this.field[a][b].visited=0;
        var TRAVERSE_DIR_X_BEGIN=(eventKey=="ArrowRight")?this.width-1:0;
        var TRAVERSE_DIR_X_END=(eventKey=="ArrowRight")?0:this.width-1;
        var X_INCR=(eventKey=="ArrowRight")?-1:1;
        var TRAVERSE_DIR_Y_BEGIN=(eventKey=="ArrowDown")?this.height-1:0;
        var TRAVERSE_DIR_Y_END=(eventKey=="ArrowDown")?0:this.height-1;
        var Y_INCR=(eventKey=="ArrowDown")?-1:1;
        var _i=TRAVERSE_DIR_Y_BEGIN;
        var _j=TRAVERSE_DIR_X_BEGIN;

        do {
            do {
                if ((this.field[_i][_j].value!=0) && (this.field[_i][_j].visited!=1) ) {
                    var pos = this.getNextPlace(_i,_j,eventKey);
                    if ((this.field[pos.y][pos.x].value==0)|| (_i==pos.y && _j==pos.x)) {
                        this.field[pos.y][pos.x].value=this.field[_i][_j].value;
                        this.field[pos.y][pos.x].visited=1;
                        if (_i!=pos.y || _j!=pos.x) {
                            this.field[_i][_j]=new Tile(0,_j,_i,this.width,this.height);

                        }
                    }
                    else if (this.field[pos.y][pos.x].value==this.field[_i][_j].value) {
                        this.score+=Math.pow(2,this.field[_i][_j].value);
                        if (this.score > window.prev_score)
                        {
                            set_leaderboard(ya_flag, lb_name, Math.min(this.score,2147483647), ()=>{window.prev_score = this.score;}, 0);
                        }
                        document.getElementById("score").textContent=setText("Счет: ","Score: ")+this.score;
                        this.field[pos.y][pos.x].value=Math.min(this.field[_i][_j].value+1,MAX_DEGREE);
                        this.field[pos.y][pos.x].visited=1;
                        if (_i!=pos.y || _j!=pos.x) this.field[_i][_j]=new Tile(0,_j,_i,this.width,this.height);

                    }

                }
                _j+=X_INCR;
            } while (_j !=TRAVERSE_DIR_X_END+X_INCR);
            _i+=Y_INCR;
            _j=TRAVERSE_DIR_X_BEGIN;
        } while (_i !=TRAVERSE_DIR_Y_END+Y_INCR);

        let theField=this;

        var spawnable = (Object.keys(Object.fromEntries(Object.entries(theField.field.flat()).filter(([k,v]) => v.value==0))).length>0);
        var playable = (Object.keys(Object.fromEntries(Object.entries(theField.field.flat()).filter(([k,v]) => theField.ismovable(v.cell.y,v.cell.x)))).length>0);

        //if no space, gameover
        if (!spawnable && !playable) {
            this.draw();
            this.gameover();
            //new game logic
            return;
        }

        //else spawn smth new

        if (spawnable) {
            var free_x=[];
            var free_y=[];

            for (var a = 0; a<this.height;a++) {
                for (var b = 0; b<this.width;b++) {
                    if (this.field[a][b].value==0) {
                        free_y.push(a);
                        free_x.push(b);
                    }
                }
            }

            var init_y;
            var init_x;
            var init_cnt= randomInt(free_x.length-1);
            init_y = free_y[init_cnt];
            init_x = free_x[init_cnt];

            var fig = randomInt(1)+1;

            this.field[init_y][init_x]=new Tile(fig,init_x,init_y,this.width,this.height);

        }

        this.draw();
    }

    draw() {

        for (var i = 0; i < this.height; i++)
            for (var j = 0; j < this.width; j++) {
                if (this.field[i][j].value==0) {
                    document.getElementById("cell_"+i+"_"+j).style.backgroundImage="url(images/0.jpg)";
                }
                else {
                    document.getElementById("cell_"+i+"_"+j).style.backgroundImage="url(images/"+SKIN+'_'+(this.field[i][j].value+1)+".jpg)";
                }
                document.getElementById("cell_"+i+"_"+j).style.backgroundSize="cover";

            }
        let theField=this;
        window.requestAnimationFrame(function(){theField.draw()});

    }

    gameover() {

        set_leaderboard(ya_flag, lb_name, Math.min(Math.max(this.score,window.prev_score), ()=>{}), 1);

        this.isPlaying=false;
        document.getElementById("score").textContent=setText("Вы проиграли","You lost");
        for (var i = 0; i < this.height; i++)
            for (var j = 0; j < this.width; j++) {

                this.field[i][j].value=0;
                //sleep(250);
                this.draw();
            }
    }
}


function resize() {
    var elements = document.getElementsByClassName("cell");

    SIDE=vmin(15);
    LEFT_OFFSET=(vw(100)-4.5*SIDE)/2;
    TOP_OFFSET=vh(10);

    for (i = 0; i < elements.length;i++) {
        var coord=elements[i].id.substring(5).split("_");
        elements[i].style.left=(LEFT_OFFSET+coord[1]*SIDE)+"px";
        elements[i].style.top=(TOP_OFFSET+SIDE*coord[0])+"px";

        elements[i].style.width=SIDE+"px";
        elements[i].style.height=SIDE+"px";
        elements[i].style.fontSize=vmin(16)+"px";

    }


    /*if (window.innerWidth>window.innerHeight) {
        document.getElementById("score").style.left="65vw";
        document.getElementById("newGame").style.left="85vw";


    }
    else {

        document.getElementById("score").style.left="30vw";
        document.getElementById("newGame").style.left="70vw";

        document.getElementById("newGame").style.bottom="5vh";


    }
    document.getElementById("newGame").style.bottom="15vh";
    document.getElementById("score").style.bottom="15vh";*/


}

