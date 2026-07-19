class Text  {
    constructor(level, rows, cols) {
        this.level = level;
        this.rows = rows;
        this.cols = cols;
        this.start_time = Date.now();
        this.setTextString();
        this.left_pointer = 0;
        this.right_pointer = this.rows;
        this.speed = 0.5;
        this.textArea  = document.getElementById("canvas");
    }

    draw() {
        console.log(document.getElementById("canvas").style.height);
        this.textArea.style.fontSize="25px";
        this.textArea.style.lineHeight="1.5";
        this.textArea.style.width=""+this.cols+".5ch";
        this.textArea.style.height=""+this.rows*25*1.5+"px";
        console.log(document.getElementById("canvas").style.height);
        this.update();
    }

    update() {
        let pointer_shift = Math.floor((Date.now() - this.start_time) / 1000 * this.speed);
        if (pointer_shift > this.textLines.length+1) {
            return;
        }
        let current_left_pointer = this.left_pointer + pointer_shift;
        let current_right_pointer = this.right_pointer + pointer_shift;
        let current_textString = this.textLines.slice(current_left_pointer, current_right_pointer).join("\n");
        let counter=0;
        let current_text = Array.from(current_textString)
            .map (
                (symbol) => {if (symbol=='\n') return "<br>"; if (symbol == ' ') return symbol; return `<span id = "${counter++}" class="letter">${symbol}</span>`;})
            .join("");
        this.textArea.innerHTML = current_text;
        const elements = document.querySelectorAll('.letter');

        elements.forEach(element => {
            element.addEventListener('pointerdown', () => {
                clicked(element);
                return false;
            });
        });
        let t = this;
        window.requestAnimationFrame(function(){t.update()});
    }

    setTextString() {
        let lines = [];
        for (let i = 0; i < this.rows; i++) {
            lines.push("");
        }
        let remaining_text = this.level.text;

        while (remaining_text.length >0) {
            let space_indices = indicesOf(remaining_text," ");
            if (space_indices.length == 0 || remaining_text.length < this.cols) {
                lines.push(remaining_text);
                remaining_text="";
                break;
            }
            else {
                let max_space_index = 0;
                for (let i = 0; i < space_indices.length; i++) {
                    if (space_indices[i] > this.cols) break;
                    else {
                        max_space_index = space_indices[i];
                    }
                }
                if (max_space_index > 0) lines.push(remaining_text.substring(0, max_space_index));
                remaining_text = remaining_text.substring(max_space_index+1);
            }
        }
        //console.log(lines);
        this.textLines = lines;
    }


}

