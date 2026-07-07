class Tile {


    constructor(value,x,y) { //type as num, cell as e4
        this.value=value;
        this.cell={"x":x,"y":y};
        this.visited=0;
        this.width=5;
        this.height=5;
    }


    existsNextCell(eventKey) {
        if (eventKey!="ArrowRight" && eventKey!="ArrowLeft" && eventKey!="ArrowUp"&& eventKey!="ArrowDown") return false;
        if (eventKey=="ArrowRight") return (this.cell.x<this.width-1);
        if (eventKey=="ArrowLeft") return (this.cell.x>0);
        if (eventKey=="ArrowUp") return (this.cell.y>0);
        if (eventKey=="ArrowDown") return (this.cell.y<this.height-1);
    }



    existsNextCellInDir(dir) {
        return (this.cell.x+dir[1]>=0 && this.cell.x+dir[1]<=this.width-1 && this.cell.y+dir[0]>=0 && this.cell.y+dir[0]<=this.height-1);
    }



}