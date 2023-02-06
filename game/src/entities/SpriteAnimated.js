class SpriteAnimated extends SpriteBase {
  constructor(
    name,
    x,
    y,
    w,
    h,
    filename,
    spriteRows,
    spriteCols,
    spriteDirections,
    xOffset
  ) {
    super(name, x, y, w, h, filename, spriteRows, spriteCols, xOffset);
    this.moveTo = "IDLE";

    this.currentFrame = 0;
    this.framesDrawn = 0;
    this.totalFrames = 3;
    this.spriteDirections = spriteDirections;
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
      if (this.moveTo == "N" || this.moveTo == "IDLE_N") {
        this.srcY = this.spriteDirections[0] * this.spriteHeight;
      }
      if (this.moveTo == "W") {
        this.srcY = this.spriteDirections[3] * this.spriteHeight;
      }
      if (this.moveTo == "S") {
        this.srcY = this.spriteDirections[2] * this.spriteHeight;
      }
    } else {
    }

    if (!escKeyPressedOnce) {
      this.framesDrawn++;
      if (this.framesDrawn >= 10) {
        this.currentFrame++;
        this.framesDrawn = 0;
      }
    }

    super.draw();
  }
}
