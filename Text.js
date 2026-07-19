class Text  {
    constructor(level, rows, cols) {
        this.level = level;
        this.rows = rows;
        this.cols = cols;
        this.start_time = Date.now();
        this.textString = " ".repeat(this.rows*this.cols)+this.level.text;
        this.left_pointer = 0;
        this.right_pointer = this.rows*this.cols;
        this.speed = 5;
    }

    draw() {
        let textArea = document.getElementById("canvas");
        let pointer_shift = Math.floor((Date.now() - this.start_time) / 1000 * this.speed);
        let current_left_pointer = this.left_pointer + pointer_shift;
        let current_right_pointer = this.right_pointer + pointer_shift;
        let current_textString = this.textString.substring(current_left_pointer, current_right_pointer);
        let counter=0;
        let current_text = Array.from(current_textString)
            .map (
                (symbol) => {if (symbol == ' ') return symbol; return `<span id = "${counter++}" class="letter">${symbol}</span>`;})
                    .join("");
        textArea.innerHTML = current_text;
        const elements = document.querySelectorAll('.letter');

        elements.forEach(element => {
            element.addEventListener('pointerdown', () => {
                clicked(element);
                return false;
            });
        });
        let t = this;
        window.requestAnimationFrame(function(){t.draw()});
    }


}

