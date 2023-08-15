class Zombie extends SpriteAnimated {
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
    xOffset,
    spritePosX,
    spritePosY,
    npcName
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
      spritePosX,
      spritePosY,
      xOffset
    );

    this.ox = x;
    this.oy = y;
    this.x = x;
    this.y = y;
    this.v = 4;

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
        this.moveTo = this.movesTo[Math.floor(Math.random() * this.movesTo.length)];
      }
    }
  }

  draw() {
    super.draw();
  }

  explore(room) {
    var x = Math.floor(this.x / BLOCK_WIDTH);
    var y = Math.floor(this.y / BLOCK_WIDTH); 

    const avaialblePositions = {
      N: room.map[y - 1][x],
      E: room.map[y][x + 1],
      S: room.map[y + 1][x],
      W: room.map[y][x - 1],
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

    for (let i = 0; i < room.walls.length; i++) {
      var ent = room.walls[i];

      if (ent.name == "Wall") {
        var collider = collisionDetection(this, ent);
        if (collider == "Wall") {
          this.moving = false;
        }
      }
    }
  }
}
