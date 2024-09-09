class Spritesheet {
    constructor(filename, rows, cols) {
        this.filename  = `./game/static/img/${filename}`;

        this.rows = rows;
        this.cols = cols;
    
        this.spritesheet = new Image();
        this.spritesheet.onload = () => loadSpritesheet(this);
        this.spritesheet.src = this.filename;
    }

    load() {
        this.cellWidth = this.spritesheet.width / this.rows;
        this.cellHeight = this.spritesheet.height / this.cols;
    }

}