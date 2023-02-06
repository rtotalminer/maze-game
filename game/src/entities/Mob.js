class Mob extends SpriteAnimated {
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
    isExplore,
    xOffset
  ) {
    super(
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
    );

    this.ox = x;
    this.oy = y;
    this.x = x;
    this.y = y;
    this.v = 4;

      this.isDialogue = false;

    this.movesTo = new Array();
    this.moving = false;
    this.isExplore = isExplore;
  }

  update(entities) {
    if (this.isExplore) {
      try {
        this.explore(entities);
      } catch (err) {
        this.x = this.ox;
        this.y = this.oy;
      }
    }
    else {
      this.moveTo = "IDLE_N"
      // Get surrounding area
      // /console.log(this.movesTo)
    }
  }

  draw() {
    if (this.isDialogue){
      // Find suitable place to draw speech bubble

      // Draw speech bubble
      colorRect(0, canvas.height-64, canvas.width, 64, "grey");

      // Draw text

      // Get allowed text, chop it up into sequeneces on key press


    }
    super.draw();
  }

  playDialogue() {
    console.log("Hello");
    let x0 = 0;
    let y0 = (canvas.height * 8) / 10;
    let w0 = (canvas.height * 2) / 10;
    this.isDialogue = true;
  }

  explore(entities) {
    var x = Math.floor(this.x / BLOCK_WIDTH);
    var y = Math.floor(this.y / BLOCK_WIDTH); // use the center??

    //console.log(gameMap[roomCount].map[y + 1][x]);

    const avaialblePositions = {
      N: gameMap[roomCount].map[y - 1][x],
      E: gameMap[roomCount].map[y][x + 1],
      S: gameMap[roomCount].map[y + 1][x],
      W: gameMap[roomCount].map[y][x - 1],
    };

    if (!this.moving) {
      for (const [key, value] of Object.entries(avaialblePositions)) {
        if (value == 1 || value == "gc" || value == "sc") {
          this.movesTo.push(key);
        }
      }
      this.moveTo =
        this.movesTo[Math.floor(Math.random() * this.movesTo.length)];
    }

    if (this.moveTo == "E") {
      this.moving = true;
      this.x += this.v;
    }
    if (this.moveTo == "N") {
      this.moving = true;
      this.y -= this.v;
    }
    if (this.moveTo == "S") {
      this.moving = true;
      this.y += this.v;
    }
    if (this.moveTo == "W") {
      this.moving = true;
      this.x -= this.v;
    }

    for (let i = 0; i < entities.length; i++) {
      var ent = entities[i];
      if (ent.name == "Wall") {
        var collider = collisionDetection(this, ent);
        if (collider == "Wall") {
          this.moving = false;
        }
      }
    }
  }
}
