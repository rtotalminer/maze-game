class Room {
  constructor(map) {
    this.map = map;
    this.entityMap = new Array();


    // Entities for the room
    this.walls = new Array();
    this.floors = new Array();

    this.textures = new Array();
    this.items = new Array();
    this.mobs = new Array();
    this.npcs = new Array();

    this.entities = new Array();

    this.playerCollidables = new Array();

    this.convertMap();
    this.getEntityMapState();
  }

  getEntities() {
    this.entities = this.items.concat(this.mobs).concat(this.npcs);
    this.playerCollidables = this.items.concat(this.walls).concat(this.mobs);
  }

  getEntityMapState() {
    this.entityMap = new Array();
    this.getEntities();

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


    for (let i = 0; i < this.entities.length; i++) {
        let cords = this.convertCords(this.entities[i].x, this.entities[i].y);
        this.entityMap[cords[1]][cords[0]].push(this.entities[i]);
    }

  }

  // Is there a better way to store map data?
  convertMap() {
    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[0].length; j++) {
        if (this.map[i][j] == 0) {
          let e = new SpriteBase(
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
          
          this.walls.push(
            e
          );
          this.textures.push(
            e
          );
        }
        if (this.map[i][j] != 0) {
          let e =   new SpriteBase(
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
          this.textures.push(
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
              0
            )
          );
        }
        if (this.map[i][j][0] == "questItem") {
          this.items.push(
            new QuestItem(
              "questItem",
              BLOCK_WIDTH * [j],
              BLOCK_WIDTH * [i],
              32,
              32,
              "goldbag.png",
              1,
              1,
              0,
              this.map[i][j][1]
            )
          );
        }
        if (this.map[i][j][0] == "roomKey") {
          this.items.push(
            new RoomKey(
              "RoomKey",
              BLOCK_WIDTH * [j],
              BLOCK_WIDTH * [i],
              32,
              32,
              "room_key.png",
              1,
              1,
              0,
              this.map[i][j][1]
            )
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
            this.map[i][j][2]
          )
          q.textSequence = this.map[i][j][1];
          this.mobs.push(
            q
          );
          // this.npcs.push(q);
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

  // Destory's an item forever.
  destoryItem(entity, entity_loc) {
    let newRoomItems = this.items.filter((item) => item != entity);
    this.items = newRoomItems;
  }

  // Gets the surrounding area of a pair of co-ordinates within the room.
  getSurroundingArea(a, b){
    let x = this.convertCords(a, b)[0];
    let y = this.convertCords(a, b)[1];

    const surroundingArea = [
      true ? this.map[y - 1][x] : [],  // N
      true ? this.map[y][x + 1] : [],  // E
      true ? this.map[y + 1][x] : [],  // S
      true ? this.map[y][x - 1] : [],  // W
    ];
    return surroundingArea;
  }

  // Gets the surrounding entities of a pair of co-ordinates within the room.
  getSurroundingEntities(a, b) {
    let x = this.convertCords(a, b)[0];
    let y = this.convertCords(a, b)[1];

    // console.log(this.entityMap);

    var northEntity = [];
    var eastEntity = [];
    var southEntity = [];
    var westEntity = [];

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
        // console.log( this.entityMap[y + 1][x].name)
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
    // Refresh the state of our entity map
    this.getEntityMapState();

    for (let i = 0; i < this.mobs.length; i++) {
      let mob = this.mobs[i];
      // let surroundingArea = this.getSurroundingArea(mob.x, mob.y);
      mob.update(this);
    }

    

  }

  draw() {
    // Draw individually because of draw order and it saves space.
    for (let i = 0; i < this.textures.length; i++) {
      this.textures[i].draw();
    }
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].draw();
    }

    var mobs = new Array();
    var npcs = new Array();

    for (let i = 0; i < this.mobs.length; i++) {
      if (this.mobs[i].name == "Mob") {
        mobs.push(this.mobs[i])
      }
      if (this.mobs[i].name == "NPC") {
        npcs.push(this.mobs[i])
      }
    }

    for (let i = 0; i < mobs.length; i++) {
      mobs[i].draw()
    }
    
    for (let i = 0; i < npcs.length; i++) {
      npcs[i].draw()
    }

  }
}
