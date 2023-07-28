class Player extends SpriteAnimated {
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

    this.startTime = Date.now();
    this.elapsed = 0;
    this.pausedElapsed = 0;
    this.pausedOn = 0;
    this.v = 4;
    this.hp = 75;
    this.gd = 0;
    this.inventory = new Array();
    this.inDialogueWith;
    this.mobCollision = false;
  }

  draw() {
    this.drawGoldCounter();
    this.drawClock();
    this.drawHealthbar();
    super.draw();
  }

  update(room) {
    if (this.hp <= 75) {
      this.hp += 0.01;
    }

    this.playerActions(room);
    this.movePlayer(room);
  }

  playerActions(room) {
    
      let playerCentre = this.getCentre();
      let areaEntities  = room.getSurroundingEntities(playerCentre[0], playerCentre[1]);

      var isMobs = false;
      
      for (let i=0; i < areaEntities.length; i++)
      {
        for (let j=0; j < areaEntities[i].length; j++){
          if (areaEntities[i][j].name == "NPC") {
            if (spaceBarReleased) {
              areaEntities[i][j].playDialogue();
              this.inDialogueWith = areaEntities[i][j];
              areaEntities[i][j].isDialogue = true;
              areaEntities[i][j].dialogueCount += 1;
              if (areaEntities[i][j].dialogueCount >= areaEntities[i][j].textSequence.length) {
                areaEntities[i][j].isDialogue = false;
                areaEntities[i][j].dialogueCount = 0;
              }
            }
            isMobs = true;
          }
          
          if (i == 0) {

          }
          if (i == 1) {
            
          }
          if (i == 2) {
            
          }
          if (i == 3) {
            
          }
          //console.log(areaEntities[i][j])
        }
      }
       if (!isMobs && this.inDialogueWith != undefined) {
        this.inDialogueWith.isDialogue = false;
       }   

  }

  drawHealthbar() {
    const hpBarLength = this.hp * (36 / 75); // 75 max hp, 32 bar length
    const sX = this.x - 2;
    const sY = this.y - 12;
    colorRect(sX, sY, hpBarLength, 6, "red");

    //console.log(this.hp);
  }

  drawGoldCounter() {
    let x = canvas.width - 32 * 3;
    let y = 0;
    let w = 32;
    let h = 32;
    ctx.font = "22px Impact";
    ctx.fillStyle = "gold";
    ctx.fillText(`${this.gd}`, canvas.width - 64, 32 - 8);
    draw_image(ctx, "goldbag", x, y, w, h);
  }

  drawClock() {
    if (paused) {
      if (this.pausedOn == 0) {
        this.pausedOn = Date.now();
      }
      else {
        this.pausedElapsed = (Date.now() - this.pausedOn);
      }
    }
    else if (!paused) {
      this.elapsed = Date.now() - this.startTime - this.pausedElapsed;
      this.pausedElapsed = 0;
      this.pausedOn = 0;
    }
    const stringTime = fancyTimeFormat(this.elapsed/1000)
    ctx.fillStyle = "white";
    ctx.fillText(`${stringTime}`, canvas.width - 160, 32 - 8);
  }

  playerCollision(room) {
    var entities = room.getEntities();
    var collisions = new Array();

    // Check for any collisions
    for (let i = 0; i < entities.length; i++) {
      var ent = entities[i];
      if (
        ent.name == "Mob" ||
        ent.name == "Wall" ||
        ent.name == "Exit" ||
        ent.name == "NPC" ||
        ent.name == "Silvercoin" ||
        ent.name == "Goldcoin"
      ) {
        const collider = collisionDetection(this, ent);
        if (collider == "Mob") {
          this.hp -= 5;
          console.log(this.hp);
        }
        if (collider == "Wall") {
        }
        if (collider == "Exit") {
          gameWon = true;
        }
        if (collider == "Silvercoin" || collider == "Goldcoin")
        {
          collisions.push(i);
          if (collider == "Silvercoin") {
            this.gd += 1;
          }
          else {
            this.gd += 5;
          }
        }
      }
    }

    if (collisions.length > 0) {
      for (let j = 0; j < collisions.length; j++) {
        room.map[entities[collisions[j]].y / BLOCK_WIDTH][
          entities[collisions[j]].x / BLOCK_WIDTH
        ] = 1;
        const a = room.items.find(
          (item) =>
            item.x == entities[collisions[j]].x &&
            item.y == entities[collisions[j]].y
        );
        let q = room.items.filter((item) => item != a);
        room.items = q;
      }
    }
  }

  movePlayer(room) {
    const borderMovement = 16;
    this.playerCollision(room);
    if (!this.mobCollision) {
      this.moveTo = "IDLE";
      if (
        leftKeyPressed &&
        !rightKeyPressed &&
        !upKeyPressed &&
        !downKeyPressed
      ) {
        this.moveTo = "W";
        if (this.x + this.spriteWidth - borderMovement < 0) {
          roomCount -= 1;
          currentRoom = gameMap[roomCount];
          this.x = MAZE_WIDTH;
        }
        this.x -= this.v;
      }

      if (
        rightKeyPressed &&
        !leftKeyPressed &&
        !upKeyPressed &&
        !downKeyPressed
      ) {
        this.moveTo = "E";
        if (this.x - this.spriteWidth + borderMovement > MAZE_WIDTH) {
          roomCount += 1;
          currentRoom = gameMap[roomCount];
          this.x = 0;
        }
        this.x += this.v;
      }

      if (
        upKeyPressed &&
        !leftKeyPressed &&
        !rightKeyPressed &&
        !downKeyPressed
      ) {
        this.moveTo = "N";
        if (this.y + this.spriteHeight - borderMovement < 0) {
          roomCount -= 3;
          currentRoom = gameMap[roomCount];
          this.y = MAZE_HEIGHT;
        }
        this.y -= this.v;
      }

      if (
        downKeyPressed &&
        !leftKeyPressed &&
        !rightKeyPressed &&
        !upKeyPressed
      ) {
        this.moveTo = "S";
        if (this.y - this.spriteHeight + borderMovement > MAZE_HEIGHT) {
          roomCount += 3;
          currentRoom = gameMap[roomCount];
          this.y = 0;
        }
        this.y += this.v;
      }
    } else {
      downKeyPressed = false;
      leftKeyPressed = false;
      rightKeyPressed = false;
      upKeyPressed = false;
    }
  }
}
