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
    this.totalPaused = 0;

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
    this.drawInventory();
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
          let entity = areaEntities[i][j];
          if (entity.name == "NPC") {
            if (spaceBarReleased) {
              entity.playDialogue();
              this.inDialogueWith = entity;
              entity.isDialogue = true;
              entity.dialogueCount += 1;
              if (entity.dialogueCount >= entity.textSequence.length) {
                entity.isDialogue = false;
                entity.dialogueCount = 0;
              }
            }
            isMobs = true;
          }
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

  drawInventory() {
    let borderWidth = 16;
    for (let i=0; i<this.inventory.length; i++) {
      let item = this.inventory[i];
      //console.log(item)
      ctx.drawImage(
        item.spriteSheet,
        item.srcX,
        item.srcY,
        item.spriteWidth,
        item.spriteHeight,
        borderWidth*i,
        MAZE_HEIGHT,
        item.w,
        item.h
      );
    }
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

  // Dosen't work
  drawClock() {
    if (paused) {
      if (this.pausedOn == 0) {
        this.pausedOn = Date.now();
      }
      else {
        this.pausedElapsed = (Date.now() - this.pausedOn) / 1000;
      }
    }
    else {
      //  console.log("PAUSED FOR ", this.pausedElapsed, " SECONDS" , "\n TIME ELAPSED FOR", this.elapsed, " SECONDS");
      this.elapsed = ((Date.now() - this.startTime) / 1000) - this.pausedElapsed;
      this.pausedOn = 0;
    }

    const stringTime = fancyTimeFormat(this.elapsed)
    ctx.fillStyle = "white";
    ctx.fillText(`${stringTime}`, canvas.width - 160, 32 - 8);
  }

  // Refactor needed
  playerCollision(room) {
    let collidables = room.getCollidables();
    // Check for any collisions
    for (let i = 0; i < collidables.length; i++) {
      var ent = collidables[i];
      if (ent.name != "Floor") {
        const collider = collisionDetection(this, ent);
        if (collider == "Mob") {
          this.hp -= 5;
        }
        if (collider == "Wall") {
        }
        if (collider == "Exit") {
          gameWon = true;
        }
        if (collider == "RoomDoor") {
          ent.unlockDoor(player, room);
        }
        if (
          collider == "Silvercoin" ||
          collider == "Goldcoin" ||
          collider == "questItem" ||
          collider == "RoomKey"
          )
        {
          ent.onPickUp(this, room);
        }
      }
    }
  }

  movePlayer(room) {
    const borderMovement = 16;
    let playerCollidables = room.walls.concat(room.mobs).concat(room.items);

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
          console.log(currentRoom);
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
          console.log(currentRoom);
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
          console.log(currentRoom);
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
          console.log(currentRoom);
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
