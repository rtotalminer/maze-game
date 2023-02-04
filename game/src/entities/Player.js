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
    this.v = 4;
    this.hp = 75;
    this.gd = 0;
    this.inventory = new Array();
    this.mobCollision = false;
  }

  draw() {
    this.drawGoldCounter();
    this.drawHealthbar();
    super.draw();
  }

  update(entities) {
    if (this.hp <= 75) {
      this.hp += 0.01;
    }

    this.playerActions(entities);
    this.movePlayer(entities);
  }

  playerActions(entities) {
    if (spaceBarReleased) {
      console.log("Player started action!");
      // if player started actions

      // scan availables areas

      // look for npc

      // initate dialouge

    }
  }

  // Removed due to refactoring...
  // playerActions(entities) {
  //   if (spaceBarPressed) {
  //     if (this.gd >= 1) {
  //       var i = Math.floor((player.x + player.w / 2) / BLOCK_WIDTH);
  //       var j = Math.floor((player.y + player.h / 2) / BLOCK_WIDTH);

  //       const avaialblePositions = {
  //         N: gameMap[roomCount].map[j - 1][i],
  //         E: gameMap[roomCount].map[j][i + 1],
  //         S: gameMap[roomCount].map[j + 1][i],
  //         W: gameMap[roomCount].map[j][i - 1],
  //       };

  //       console.log(avaialblePositions);

  //       //console.log("AVAILABLE POSITIONS", avaialblePositions);

  //       var coinLoc;
  //       for (const [key, value] of Object.entries(avaialblePositions)) {
  //         if (value == 1) {
  //           var coinLoc = key;

  //           this.gd--;

  //           console.log(avaialblePositions);

  //           if (coinLoc == "N") {
  //             j -= 1;
  //             gameMap[roomCount].map[j][i] = "gc";
  //           }
  //           if (coinLoc == "S") {
  //             j += 1;
  //             gameMap[roomCount].map[j][i] = "gc";
  //           }
  //           if (coinLoc == "W") {
  //             i -= 1;
  //             gameMap[roomCount].map[j][i] = "gc";
  //           }
  //           if (coinLoc == "E") {
  //             i += 1;
  //             gameMap[roomCount].map[j][i] = "gc";
  //           }

  //           var c = new Coin(
  //             "GoldCoin",
  //             BLOCK_WIDTH * [i],
  //             BLOCK_WIDTH * [j],
  //             BLOCK_WIDTH,
  //             BLOCK_WIDTH,
  //             "yellow",
  //             "goldcoin"
  //           );

  //           entities.push(c);
  //           break;
  //         }
  //       }
  //     }
  //   }
  // }

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

  playerCollision(entities) {
    var coinsCol = new Array();

    // Check for any collisions
    for (let i = 0; i < entities.length; i++) {
      var ent = entities[i];
      if (
        ent.name == "Mob" ||
        ent.name == "Wall" ||
        ent.name == "Exit" ||
        ent.name == "NPC"
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
      }

      if (
        ent.name == "Silvercoin" &&
        this.x + BLOCK_WIDTH / 2 > ent.x &&
        this.x + BLOCK_WIDTH / 2 < ent.x + BLOCK_WIDTH &&
        this.y + BLOCK_WIDTH / 2 > ent.y &&
        this.y + BLOCK_WIDTH / 2 < ent.y + BLOCK_WIDTH
      ) {
        this.gd += 1;
        coinsCol.push(i);
      }
      if (
        ent.name == "Goldcoin" &&
        this.x + BLOCK_WIDTH / 2 > ent.x &&
        this.x + BLOCK_WIDTH / 2 < ent.x + BLOCK_WIDTH &&
        this.y + BLOCK_WIDTH / 2 > ent.y &&
        this.y + BLOCK_WIDTH / 2 < ent.y + BLOCK_WIDTH
      ) {
        this.gd += 5;
        coinsCol.push(i);
      }
    }
    //console.log(coinsCol);
    //Remove collected coins from the room
    if (coinsCol.length > 0) {
      for (let j = 0; j < coinsCol.length; j++) {
        //currentRoom.destoryItem(entities[coinsCol[j]], coinsCol[j]);
        // console.log(
        //   gameMap[roomCount].map[entities[coinsCol[j]].y / BLOCK_WIDTH][
        //     entities[coinsCol[j]].x / BLOCK_WIDTH
        //   ]
        // );

        gameMap[roomCount].map[entities[coinsCol[j]].y / BLOCK_WIDTH][
          entities[coinsCol[j]].x / BLOCK_WIDTH
        ] = 1;

        // console.log(
        //   gameMap[roomCount].map[entities[coinsCol[j]].y / BLOCK_WIDTH][
        //     entities[coinsCol[j]].x / BLOCK_WIDTH
        //   ]
        // );

        // //currentRoom.getEntities().splice(coinsCol[j], 1);
        // console.log(gameMap[roomCount].items);

        // console.log(entities[coinsCol[j]].x, entities[coinsCol[j]].y);

        const a = gameMap[roomCount].items.find(
          (item) =>
            item.x == entities[coinsCol[j]].x &&
            item.y == entities[coinsCol[j]].y
        );

        //console.log(a);

        let q = gameMap[roomCount].items.filter((item) => item != a);
        gameMap[roomCount].items = q;

        //console.log(q);
      }
    }
  }

  movePlayer(entities) {
    this.playerCollision(entities);
    if (!this.mobCollision) {
      this.moveTo = "IDLE";
      if (
        leftKeyPressed &&
        !rightKeyPressed &&
        !upKeyPressed &&
        !downKeyPressed
      ) {
        this.moveTo = "W";
        if (this.x + this.spriteWidth < 0) {
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
        if (this.x > MAZE_WIDTH) {
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
        if (this.y - this.spriteHeight < 0) {
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
        if (this.y > MAZE_HEIGHT) {
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
