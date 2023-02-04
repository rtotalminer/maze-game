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
    this.v = 1;

    this.movesTo = new Array();
    this.moving = false;
    this.isExplore = isExplore;
  }

  update(entities) {
    if (this.isExplore) {
      try {
        this.explore(entities);
      } catch (err) {
        console.log("mob cant move.");
        this.x = this.ox;
        this.y = this.oy;
      }
    }
  }

  playDialogue() {
    console.log("Hello");
    let x0 = 0;
    let y0 = (canvas.height * 8) / 10;
    let w0 = (canvas.height * 2) / 10;
    colorRect(x0, y0, canvas.width, w0, "grey");
  }

  explore(entities) {
    var x = Math.floor(this.x / BLOCK_WIDTH);
    var y = Math.floor(this.y / BLOCK_WIDTH);

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
