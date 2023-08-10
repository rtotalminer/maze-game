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
    xOffset,
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
      xOffset
    );

    this.ox = x;
    this.oy = y;
    this.x = x;
    this.y = y;
    this.v = 4;

    this.isDialogue = false;
    this.dialogueCount = 0;
    this.npcName = npcName;
    this.textSequence = new Array();

    // this.npcFace = new Image();
    // this.npcFace.src = `./game/static/img/${zombie01Face}`; // Move string literals to config

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
      let x0 = 0;
      let y0 = canvas.height-32*3;

      let w = canvas.width;
      let h = 64;

      // Draw speech bubble and draw mob face
      colorRect(x0, y0, w, h, "grey");
      draw_image(ctx, "zombie_01_face", x0+2, y0+2, 60, 60);

      // Draw text
      let currentText = this.textSequence[this.dialogueCount];

      // Set up our font and fill style
      let fontSize = 16;
      let border = 64;

      ctx.fillStyle = "#000000"
      ctx.font = `${fontSize}px serif`;
      
      let x = x0 + border;
      let y = y0 + fontSize;
      let maxWidth = canvas.height - 60;
      let lineHeight = 18;

      let wrappedText = wrapText(ctx, currentText, x, y, maxWidth, lineHeight);
      wrappedText.forEach(function(item) {
          ctx.fillText(item[0], item[1], item[2]); 
      })

      // Get allowed text, chop it up into sequeneces on key press


    }
    super.draw();
  }

  playDialogue() {
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
