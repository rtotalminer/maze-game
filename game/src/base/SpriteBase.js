
// A static un-animated texture
class SpriteBase {
  constructor(name, x, y, w, h, filename, spriteRows, spriteCols, xOffset, spritePosX, spritePosY) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.w = 32;
    this.h = 32;
    this.filename = filename;

    // Offset for hitbox
    this.xOffset = xOffset;

    this.spriteSheet = new Image();
    this.spriteSheet.src = `./game/static/img/${this.filename}`; // Move string literals to config

    // numOfImages++;
    // this.spriteSheet.onload = loadImages;

    this.spriteRows = 1;
    this.spriteCols = 1;

    this.spriteWidth = this.spriteSheet.width / spriteRows;
    this.spriteHeight = this.spriteSheet.height / spriteCols;

    this.srcX = spritePosX*this.spriteWidth;
    this.srcY = spritePosY*this.spriteHeight;

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

  getCentre() {
    return [this.x + this.w/2 , this.y + this.h/2] 
  }
}
