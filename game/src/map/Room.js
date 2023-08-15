class Room {
  constructor(map) {
    // Maps
    this.map = map;
    this.entityMap = new Array();

    // Textures
    this.walls = new Array();
    this.floors = new Array();

    // Entities
    this.entities = new Array();
    this.items = new Array();
    this.mobs = new Array();
    this.npcs = new Array();
    this.collidables = new Array();

    this.convertMap();
    this.getEntityMapState();
  }

  getEntities() {
    return this.items.concat(this.mobs).concat(this.npcs);
  }

  getCollidables() {
    return this.getEntities().concat(this.walls);
  }

  getStaticTextures() {
    return this.walls.concat(this.floors);
  }

  getEntityMapState() {
    this.entityMap = new Array();
    let entities = this.getEntities();

    // create blank entity map state 
    for (let i = 0; i < this.map.length; i++) {
      let a = new Array();
      this.entityMap.push(a)        
      for (let j = 0; j < this.map[0].length; j++) {
        let b = new Array();
        this.entityMap[i].push(b)
      }
    }

    // console.log(this.entities.length);
    for (let i = 0; i < entities.length; i++) {
        let cords = this.convertCords(entities[i].x, entities[i].y);
        this.entityMap[cords[1]][cords[0]].push(entities[i]);
    }

  }

  // Is there a better way to store map data?
  convertMap() {
    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[0].length; j++) {
        if (this.map[i][j] == 0) {
          let r = Math.floor(Math.random() * 4);
          let filename = `wall/brick_gray_${r}.png`
          let e = new SpriteBase(
            "Wall",
            BLOCK_WIDTH * [j],
            BLOCK_WIDTH * [i],
            32,
            32,
            filename,
            2,
            2,
            0,
            0,
            0
          )
          // console.log(e.spriteWidth)
          
          this.walls.push(
            e
          );
        }
        if (this.map[i][j] != 0) {
          let r = Math.floor(Math.random() * 4);
          let filename = `floor/white_marble_${r}.png`
          let e =   new SpriteBase(
            "Floor",
            BLOCK_WIDTH * [j],
            BLOCK_WIDTH * [i],
            32,
            32,
            filename,
            1,
            1,
            0,
            0,
            0
          )
          this.floors.push(
            e
          );
        }
        if (this.map[i][j] == "gc") {
          this.items.push(
            new Goldcoin(
              "Goldcoin",
              BLOCK_WIDTH * [j],
              BLOCK_WIDTH * [i],
              32,
              32,
              "goldcoin.png",
              1,
              1,
              0,
              0,
              0
            )
          );
        }
        if (this.map[i][j][0] == "questItem") {
          let returnTo = this.map[i][j][1]
          this.items.push(
            new QuestItem(
              "QuestItem",
              BLOCK_WIDTH * [j],
              BLOCK_WIDTH * [i],
              32,
              32,
              "goldbag.png",
              1,
              1,
              0,
              0,
              0,
              0,
              returnTo,
            )
          );
        }
        if (this.map[i][j][0] == "roomKey") {
          let key = new RoomKey(
            "RoomKey",
            BLOCK_WIDTH * [j],
            BLOCK_WIDTH * [i],
            32,
            32,
            "item/key_1.png",
            8,
            1,
            [2, 1, 3, 4],
            0,
            0,
            0,
            this.map[i][j][1]
          );
          key.moveTo = "STATIC";
          this.items.push(
            key
          );
        }
        if (this.map[i][j][0] == "RoomDoor") {
          this.items.push(
            new RoomDoor(
              "RoomDoor",
              BLOCK_WIDTH * [j],
              BLOCK_WIDTH * [i],
              32,
              32,
              "door.png",
              1,
              1,
              0,
              0,
              0,
              this.map[i][j][1]
            )
          );
        }
        if (this.map[i][j] == "sc") {
          this.items.push(
            new Silvercoin(
              "Silvercoin",
              BLOCK_WIDTH * [j],
              BLOCK_WIDTH * [i],
              32,
              32,
              "silvercoin.png",
              1,
              1,
              0,
              0,
              0,
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
              0,
              0,
              0,
              null
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
              0,
              0,
              0
            )
          );
        }
        if (this.map[i][j][0] == "npc") {
          let q = new NPC(
            "NPC",
            BLOCK_WIDTH * [j],
            BLOCK_WIDTH * [i],
            32,
            32,
            "zombies_01.png",
            3,
            4,
            [3, 2, 0, 1],
            0,
            0,
            0,
            this.map[i][j][2],

          )
          q.srcY = q.spriteDirections[0] * q.spriteHeight;
          q.textSequence = this.map[i][j][1];
          // this.mobs.push(
          //   q
          // );
          this.npcs.push(q);
        }
      }
    }
  }

  // Move to helper
  convertCords(a, b) {
    var x = Math.floor(a / BLOCK_WIDTH);
    var y = Math.floor(b / BLOCK_WIDTH);
    return [x, y]
  }

  // Destory's an item forever... "desTORY"
  destoryItem(item) {
    this.items = this.items.filter((_item) => _item != item); 
  }

  // Gets the surrounding area of a pair of co-ordinates within the room.
  getSurroundingArea(a, b){
    let x = this.convertCords(a, b)[0];
    let y = this.convertCords(a, b)[1];

    const surroundingArea = [
      this.map[y - 1][x],  // N
      this.map[y][x + 1],  // E
      this.map[y + 1][x],  // S
      this.map[y][x - 1],  // W
    ];
    return surroundingArea;
  }

  // Gets the surrounding entities of a pair of co-ordinates within the room.
  getSurroundingEntities(a, b) {
    let x = this.convertCords(a, b)[0];
    let y = this.convertCords(a, b)[1];

    var northEntity = [];
    var eastEntity = [];
    var southEntity = [];
    var westEntity = [];

    // When player enteres new room i.e. out of bounds for entityMap.
    if (this.entityMap[y - 1] != undefined) {
      if (this.entityMap[y - 1][x] != undefined) {
        northEntity = this.entityMap[y - 1][x];
      }
    }
    if (this.entityMap[y] != undefined) {
      if (this.entityMap[y][x + 1] != undefined) {
        eastEntity = this.entityMap[y][x + 1];
      }
    }
    if (this.entityMap[y + 1] != undefined) {
      if (this.entityMap[y + 1][x] != undefined) {
        southEntity = this.entityMap[y + 1][x];
      }
    }
    if (this.entityMap[y] != undefined) {
      if (this.entityMap[y][x - 1] != undefined) {
        northEntity = this.entityMap[y][x - 1];
      }
    }
    //console.log(southEntity)

    var localEntities = [
      northEntity,  // N
      eastEntity,   // E
      southEntity,  // S
      westEntity    // W
    ];

    // console.log(localEntities);

    return localEntities;
    
  }

  update() {
    this.getEntityMapState();

    for (let i = 0; i < this.mobs.length; i++) {
      this.mobs[i].update(this);
    }
  }

  draw() {
    let textures = this.getStaticTextures()
    let entities = this.getEntities();

    for (let i = 0; i < textures.length; i++) {
      textures[i].draw();
    }

    for (let i=0; i<entities.length; i++) {
      entities[i].draw()
    }
  }
}
