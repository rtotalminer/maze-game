class Spritesheet {
    constructor(filename, rows, cols, x, y) {
        this.filename  = `./game/static/img/${filename}`;

        this.rows = rows;
        this.cols = cols;
    
        this.x = x;
        this.y = y;
    
        this.spritesheet = new Image();
        this.spritesheet.onload = () => loadImages(this);
        this.spritesheet.src = this.filename;
    }

    load() {
        this.width = this.spritesheet.width / this.rows;
        this.height = this.spritesheet.height / this.cols;
    }

}