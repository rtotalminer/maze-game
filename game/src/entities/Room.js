class Room {
  constructor(map) {
    this.map = map;

    // Entities for the room
    this.textures = new Array();
    this.items = new Array();
    this.mobs = new Array();

    this.entities = new Array();

    this.convertMap();
  }

  getEntities() {
    this.entities = this.textures.concat(this.items).concat(this.mobs);
    return this.entities;
  }

  // Convert's the our raw map data into real data we can use
  convertMap() {
    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[0].length; j++) {
        // Convert these into a function
        if (this.map[i][j] == 0) {
          this.textures.push(
            new SpriteBase(
              "Wall",
              BLOCK_WIDTH * [j],
              BLOCK_WIDTH * [i],
              32,
              32,
              "BrickGrey.png",
              1,
              1,
              0
            )
          );
        }
        if (this.map[i][j] != 0) {
          this.textures.push(
            new SpriteBase(
              "Floor",
              BLOCK_WIDTH * [j],
              BLOCK_WIDTH * [i],
              32,
              32,
              "BrickLightGrey.png",
              1,
              1,
              0
            )
          );
        }
        if (this.map[i][j] == "gc") {
          this.items.push(
            new SpriteBase(
              "Goldcoin",
              BLOCK_WIDTH * [j],
              BLOCK_WIDTH * [i],
              32,
              32,
              "goldcoin.png",
              1,
              1,
              0
            )
          );
        }
        if (this.map[i][j] == "sc") {
          this.items.push(
            new SpriteBase(
              "Silvercoin",
              BLOCK_WIDTH * [j],
              BLOCK_WIDTH * [i],
              32,
              32,
              "silvercoin.png",
              1,
              1,
              0
            )
          );
        }
        if (this.map[i][j] == "e") {
          this.mobs.push(
            new Mob(
              "Mob",
              BLOCK_WIDTH * [j],
              BLOCK_WIDTH * [i],
              32,
              32,
              "zombies_01.png",
              3,
              4,
              [3, 2, 0, 1],
              true,
              0
            )
          );
        }
        if (this.map[i][j] == "exit") {
          this.items.push(
            new SpriteBase(
              "Exit",
              BLOCK_WIDTH * [j],
              BLOCK_WIDTH * [i],
              32,
              32,
              "door.png",
              1,
              1,
              0
            )
          );
        }
        if (this.map[i][j] == "npc") {
          this.items.push(
            new Mob(
              "NPC",
              BLOCK_WIDTH * [j],
              BLOCK_WIDTH * [i],
              32,
              32,
              "zombies_01.png",
              3,
              4,
              [3, 2, 0, 1],
              false,
              0
            )
          );
        }
      }
    }
  }

  destoryItem(entity, entity_loc) {
    console.log("DESTORY");
    this.map[entity.y / BLOCK_WIDTH][entity.x / BLOCK_WIDTH] = 1;
    this.getEntities().splice(entity_loc, 1);
  }

  update() {
    for (let i = 0; i < this.mobs.length; i++) {
      this.mobs[i].update(this.getEntities());
    }
  }

  draw() {
    // different arrays for dirrent entties to make better use of draw order
    for (let i = 0; i < this.textures.length; i++) {
      this.textures[i].draw();
    }

    for (let i = 0; i < this.items.length; i++) {
      this.items[i].draw();
    }

    for (let i = 0; i < this.mobs.length; i++) {
      this.mobs[i].draw();
    }

    // light

    // var cordsToDraw = new Array();

    // var x = Math.floor((player.x + player.w / 2) / BLOCK_WIDTH);
    // var y = Math.floor((player.y + player.h / 2) / BLOCK_WIDTH);

    // cordsToDraw.push(
    //   [y * BLOCK_WIDTH, x * BLOCK_WIDTH],
    //   [y * BLOCK_WIDTH, (x - 1) * BLOCK_WIDTH],
    //   [y * BLOCK_WIDTH, (x + 1) * BLOCK_WIDTH],
    //   [(y - 1) * BLOCK_WIDTH, x * BLOCK_WIDTH],
    //   [(y + 1) * BLOCK_WIDTH, x * BLOCK_WIDTH],
    //   [(y + 1) * BLOCK_WIDTH, (x + 1) * BLOCK_WIDTH],
    //   [(y + 1) * BLOCK_WIDTH, (x - 1) * BLOCK_WIDTH],
    //   [(y - 1) * BLOCK_WIDTH, (x + 1) * BLOCK_WIDTH],
    //   [(y - 1) * BLOCK_WIDTH, (x - 1) * BLOCK_WIDTH]
    // );

    //console.log(cordsToDraw);

    //var drawDarkness = new Array();

    // for (let i = 0; i < this.entities.length; i++) {
    //   if (
    //     // this.entities[i].x == cordsToDraw[j][1] &&
    //     // this.entities[i].y == cordsToDraw[j][0] &&

    //   ) {

    //   }
    // }

    // Draw Items

    // for (let i = 0; i < this.entities.length; i++) {
    //   if (
    //     // this.entities[i].x == cordsToDraw[j][1] &&
    //     // this.entities[i].y == cordsToDraw[j][0] &&
    //     this.entities[i].name == "SilverCoin" ||
    //     this.entities[i].name == "GoldCoin"
    //   ) {
    //     this.entities[i].draw();
    //   }
    // }
    // for (let i = 0; i < this.mobs.length; i++) {
    //   this.mobs[i].draw();
    //   // let x = this.mobs[i].x;
    //   // let y = this.mobs[i].y;
    //   // let w = this.mobs[i].w;
    //   // let h = this.mobs[i].h;
    //   // var drawMob = false;
    //   // for (let j = 0; j < cordsToDraw.length; j++) {
    //   //   let entX = cordsToDraw[j][0];
    //   //   let entY = cordsToDraw[j][1];
    //   //   if (entX + BLOCK_WIDTH > x && entX < x + w) {
    //   //     if ((entY + h > y && y < entY) || (entY > y && entY < y + h)) {
    //   //       drawMob = true;
    //   //       console.log("Collision with Light");
    //   //     }
    //   //   }
    //   // }
    //   // if (drawMob) {
    //   //   this.mobs[i].draw();
    //   // }
    // }

    // for (let i = 0; i < drawDarkness.length; i++) {
    //   colorRect(drawDarkness[i].x, drawDarkness[i].y, 32, 32, "black");
    // }
  }
}
