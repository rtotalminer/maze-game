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
      xOffset,
      spritePosX,
      spritePosY
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
          xOffset,
          spritePosX,
          spritePosY,
      );

      this.startTime = Date.now();
      this.elapsed = 0;
      this.pausedElapsed = 0;
      this.pausedOn = 0;
      this.totalPaused = 0;

      this.v = 3;
      this.hp = 75;
      this.gd = 0;

      this.directionLooking = "S";

      this.inventory = new Array();

      this.isNpcTalking = false;
      this.inDialogueWith = null;

      this.mobCollision = false;

      this.dead = false;

      // Audio
      this.footstepsAudio = document.getElementById("footsteps");
      this.damageAudio = document.getElementById("oof");

      // Inventory
      this.invBg = new Image();
      this.invBg.src = "./game/static/img/player/inv_bg.png";
      this.maxInventory = 16;
      this.slotsPerRow = 4;

      smartCollision(1, 2);

  }

  setDirectionLooking() {
      if (this.moveTo != "IDLE") {
          this.directionLooking = this.moveTo;
      }
  }

  draw() {

      // console.log((this.inDialogueWith.done) != null ? this.inDialogueWith.done : [] )
      //this.drawGoldCounter();
      //this.drawClock();
      this.drawHealthbar();

      if (iKeyPressed && !this.inDialogueWith) {
          console.log("PRESSED")
          this.drawInventory()
      }
      //  this.drawInventory();
      super.draw();

      //getQuadrants(this);

  }

  update(room) {
      if (this.hp <= 75) {
          this.hp += 0.1;
      }
      this.setDirectionLooking();
      this.playerActions(room);
      this.movePlayer(room);
  }

  drawInventory() {
      this.drawGoldCounter();

      let w = 4;
      let h = 6;

      let invW = 32 * w;
      let invH = 32 * h;

      let x = canvas.width - invW - 16
      let y = canvas.height - invH

      if (player.x >= canvas.width / 2) {
          x = 16;
      }

      let invBg = new Image(); // do we need to redefine like with gold
      invBg.src = "./game/static/img/player/inv_bg.png";


      // colorRect(x-5, y-5, invW+5, invH+5, "grey");

      for (let i = 0; i < w; i++) {
          for (let j = 0; j < h; j++) {
              // console.log(x+(i*32), y+(j*32));
              ctx.drawImage(invBg, x + (i * 32), y + (j * 32));
          }
      }

      ctx.font = "22px Dungeon";
      ctx.fillStyle = "white";
      ctx.fillText(`Backpack`, x + 32, y + 24);

      // draw

      // for (let i=0; i<=4; i++) {
      //   for (let j=0; i<=4; i++) {
      //     let item = this.inventory[i+j];
      //     item.x = x + (32*(i));
      //     item.y = y + 32*(j);
      //     item.draw();
      //   }
      // }


      for (let i = 0; i < this.inventory.length; i++) {
          let item = this.inventory[i];
          let j = Math.floor(i / 4);

          item.x = x + (32 * (i)) - (32 * (j * 4));
          item.y = y + 32 * (j + 1);
          item.draw();
      }

      this.drawGoldCounter(x, y + invH - 32);


  }

  playerActions(room) {

      let playerCentre = this.getCentre();
      let areaEntities = room.getSurroundingEntities(playerCentre[0], playerCentre[1]);
      let npc = false;

      // console.log(areaEntities);

      for (let i = 0; i < areaEntities.length; i++) {
          for (let j = 0; j < areaEntities[i].length; j++) {
              let entity = areaEntities[i][j];
              if (entity.name == "NPC") {
                  npc = true;
                  if (spaceBarReleased) {
                      this.inDialogueWith = entity;
                      if (entity.npcDialgoueInitiated) {
                          entity.incrementDialgoueCount();
                      }
                      entity.interact(this.inventory);
                  }
                  if (entity.npcFinished && !entity.done) {
                      entity.finished(player);
                  }
              }

          }
      }

      if (!npc && this.inDialogueWith != null) {
          this.inDialogueWith.dialogueCount = 0;
          this.inDialogueWith.npcDialgoueInitiated = false;
          this.inDialogueWith.isDialogue = false;
          this.inDialogueWith = null
          // this.inDialogueWith.talkingAudio.pause();
      }
  }

  drawHealthbar() {
      const hpBarLength = this.hp * (36 / 75); // 75 max hp, 32 bar length
      const sX = this.x - 2;
      const sY = this.y - 12;
      colorRect(sX, sY, hpBarLength, 6, "red");

      //console.log(this.hp);
  }


  drawGoldCounter(x, y) {

      let goldImg;
      if (this.gd >= 75) {
          goldImg = "max"
      } else {
          goldImg = Math.floor(this.gd / 5) + 1;
      }

      // why create a new image each time?
      let gold = new Image();
      gold.src = `./game/static/img/item/gold/gold_pile_${goldImg}.png`;

      ctx.font = "22px Dungeon";
      ctx.fillStyle = "gold";

      ctx.fillText(`${this.gd}`, x + 32, y + 24);
      ctx.drawImage(gold, x, y);
  }

  // Dosen't work
  drawClock() {
      if (paused) {
          if (this.pausedOn == 0) {
              this.pausedOn = Date.now();
          } else {
              this.pausedElapsed = (Date.now() - this.pausedOn) / 1000;
          }
      } else {
          //  console.log("PAUSED FOR ", this.pausedElapsed, " SECONDS" , "\n TIME ELAPSED FOR", this.elapsed, " SECONDS");
          this.elapsed = ((Date.now() - this.startTime) / 1000) - this.pausedElapsed;
          this.pausedOn = 0;
      }

      const stringTime = fancyTimeFormat(this.elapsed)
      ctx.fillStyle = "white";
      ctx.fillText(`${stringTime}`, canvas.width - 160, 32 - 8);
  }

  playerCollision(room) {
      let cords = this.getCentre();
      let coldbs = room.getSurroundingCollidables(cords[0], cords[1])
      let collisions = smartCollision(this, coldbs);

      this.mobCollision = false;

      for (let k = 0; k < collisions.length; k++) {
          if (collisions[k].col instanceof BaseItem || collisions[k].col instanceof Goldcoin) {
              collisions[k].col.onPickUp(this, room)
          }
          if (collisions[k].col instanceof RoomDoor) {
            collisions[k].col.unlockDoor(this, room)
            }
          if (collisions[k].col.name == "Mob") {
            this.mobCollision = true;
            this.hp -= 10;
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
              aKeyPressed &&
              !dKeyPressed &&
              !wKeyPressed &&
              !sKeyPressed
          ) {
              this.moveTo = "W";
              if (this.x + this.spriteWidth - borderMovement < 0) {
                  roomCount -= 1;
                  currentRoom = gameMap[roomCount]; // #TODO: only trigger map change when player is allowed to
                  // console.log(currentRoom);
                  this.x = MAZE_WIDTH;
              }
              this.x -= this.v;
          }

          if (
              dKeyPressed &&
              !aKeyPressed &&
              !wKeyPressed &&
              !sKeyPressed
          ) {
              this.moveTo = "E";
              if (this.x - this.spriteWidth + borderMovement > MAZE_WIDTH) {
                  roomCount += 1;
                  currentRoom = gameMap[roomCount];
                  // console.log(currentRoom);
                  this.x = 0;
              }
              this.x += this.v;
          }

          if (
              wKeyPressed &&
              !aKeyPressed &&
              !dKeyPressed &&
              !sKeyPressed
          ) {
              this.moveTo = "N";
              if (this.y + this.spriteHeight - borderMovement < 0) {
                  roomCount -= 3;
                  currentRoom = gameMap[roomCount];
                  // console.log(currentRoom);
                  this.y = MAZE_HEIGHT;
              }
              this.y -= this.v;
          }

          if (
              sKeyPressed &&
              !aKeyPressed &&
              !dKeyPressed &&
              !wKeyPressed
          ) {
              this.moveTo = "S";
              if (this.y - this.spriteHeight + borderMovement > MAZE_HEIGHT) {
                  roomCount += 3;
                  currentRoom = gameMap[roomCount];
                  // console.log(currentRoom);
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

      // console.log(thiss.mobCollision)

      // move to f(x)
      if (this.mobCollision) {

          console.log(this.mobCollision)
          this.damageAudio.play();
      }

      if (!gameWon || this.hp > 0) {
          if (this.moveTo != "IDLE") {
              this.footstepsAudio.play();
          } else {
              this.footstepsAudio.pause();
          }
      }
      if (this.hp < 0) {
          this.footstepsAudio.pause();
      }
  }
}