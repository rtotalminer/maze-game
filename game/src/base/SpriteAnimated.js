class SpriteAnimated extends SpriteBase {
  constructor(
    name,
    x,
    y,
    spritesheet,
    spritePosX,
    spritePosY,
    offset,
    spriteDirections,
  ) {
    super(name, x, y, spritesheet, spritePosX, spritePosY, offset);
    this.moveTo = "IDLE";
    this.idle = false;

    this.currentFrame = 0;
    this.framesDrawn = 0;
    this.totalFrames = this.spritesheet.rows;
    this.spriteDirections = spriteDirections;
    // Adding animated sprites can be tricky as different animators have different formats
    // , such as a 1x16 where each 4 cells correspond to directions, or 16x1, or 4x4. Therefore
    // to achieve the desired consistency. Or just hard code it a specific standard i.e. Ax4

    // Have the user input an array [ [x1, y1], [x2, y2]. [x3, y3], [x4, y4] ] where each
    // element corresponds to the starting x, y positions for north, east, south and west.
    // The user can put in whole intergers [[0, 0], [0, 1], [0, 2], [0, 3]] and each x, y gets
    // timsed by sprite height or width.
  }

  draw() {
    if (this.moveTo != "IDLE") {
      if (this.moveTo != "IDLE_N"){
        this.currentFrame %= this.totalFrames;
        this.srcX = this.currentFrame * this.spriteWidth;
      }
      if (this.moveTo == "E") {
        this.srcY = this.spriteDirections[1] * this.spriteHeight;
      }
      if (this.moveTo == "N") {
        this.srcY = this.spriteDirections[0] * this.spriteHeight;
      }
      if (this.moveTo == "W") {
        this.srcY = this.spriteDirections[3] * this.spriteHeight;
      }
      if (this.moveTo == "S") {
        this.srcY = this.spriteDirections[2] * this.spriteHeight;
      }
    }
    if (this.moveTo == "STATIC") {
      this.currentFrame++;
      this.framesDrawn = 0;
    }

    if (!escKeyPressedOnce) {
      if (!this.static) {
        this.framesDrawn++;
        if (this.framesDrawn >= 10) {
          this.currentFrame++;
          this.framesDrawn = 0;
        }
      }
    }

    super.draw();
  }
}
