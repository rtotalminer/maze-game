class SpriteBase {
  constructor(name, x, y, w, h, filename, spriteRows, spriteCols, xOffset) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.filename = filename;

    this.xOffset = xOffset;

    this.spriteSheet = new Image();
    this.spriteSheet.src = `./game/static/img/${this.filename}`; // Move string literals to config

    numOfImages++;
    this.spriteSheet.onload = loadImages;

    this.spriteRows = spriteRows;
    this.spriteCols = spriteCols;

    this.spriteWidth = this.spriteSheet.width / spriteRows;
    this.spriteHeight = this.spriteSheet.height / spriteCols;

    this.srcX = 0;
    this.srcY = 0;

    this.enableHitbox = false;
  }

  draw() {
    if (this.enableHitbox) {
      this.drawHitbox();
    }
    ctx.drawImage(
      this.spriteSheet,
      this.srcX,
      this.srcY,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.w,
      this.h
    );
  }

  drawHitbox() {
    let x0 = this.x + this.xOffset;
    let y0 = this.y;
    let w0 = this.w - 2 * this.xOffset;
    let h0 = this.h;
    ctx.strokeStyle = "red";
    ctx.strokeRect(x0, y0, w0, h0);
  }
}
