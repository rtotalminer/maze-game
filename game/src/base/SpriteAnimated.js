class SpriteAnimated extends SpriteBase {
  constructor(
    name,
    x,
    y,
    spritesheet,
    spritePosX,
    spritePosY,
    offset,
    totalFrames,
    spriteDirections
  ) {
    super(name, x, y, spritesheet, spritePosX, spritePosY, offset);
    this.moveTo = "IDLE";
    this.idle = false;
    this.static = false;

    this.currentFrame = 0;
    this.framesDrawn = 0;
    this.totalFrames = totalFrames;
    this.spriteDirections = spriteDirections;

    this.startX = this.srcX;
    this.startY = this.srcY;
    // Adding animated sprites can be tricky as different animators have different formats
    // , such as a 1x16 where each 4 cells correspond to directions, or 16x1, or 4x4. Therefore
    // to achieve the desired consistency. Or just hard code it a specific standard i.e. Ax4

    // Have the user input an array [ [x1, y1], [x2, y2]. [x3, y3], [x4, y4] ] where each
    // element corresponds to the starting x, y positions for north, east, south and west.
    // The user can put in whole intergers [[0, 0], [0, 1], [0, 2], [0, 3]] and each x, y gets
    // timsed by sprite height or width. Wait we have an idle flag, could this work?
  }

  // Maybe it needs it's own update method
  draw() {
    if (this.moveTo == 'IDLE' && !this.static) {
      this.currentFrame %= this.totalFrames;
      this.srcX = this.startX + (this.currentFrame*this.spriteWidth)
    }

    if (this.moveTo != "IDLE") {
      this.static = false;
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
