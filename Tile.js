class Tile {
    constructor(field_side, original_place) {
        this.field_side = field_side;
        this.original_place = original_place;
        this.current_place = original_place;
    }

    update_coordinates(new_place) {
        this.current_place = new_place;
    }

    isMisplaced() {
        return (this.original_place.x == this.current_place.x && this.original_place.y == this.current_place.y);
    }

    color() {
        /*let delta = 256 * 256 * 256 / (this.field_side * this.field_side);
        let coord1d = this.original_place.y * this.field_side + this.original_place.x;
        let b = (coord1d * delta) % 256;
        let r = Math.floor(coord1d * delta / (256*256));
        let g = Math.floor((coord1d * delta - 256*r) / 256);*/
        let r = 40 + (this.original_place.x/this.field_side) * 215;
        let g = 40 + (this.original_place.y/this.field_side) * 215;
        let b = 40;


        return `rgba(${r},${g},${b},255)`;
    }

}