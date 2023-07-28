class Room {
  constructor(map) {
    this.map = map;
    this.entityMap = new Array();

    // Entities for the room
    this.textures = new Array();
    this.items = new Array();
    this.mobs = new Array();
    this.npcs = new Array();

    this.entities = new Array();

    this.convertMap();
    this.getEntityMapState();
  }

  getEntities() {
    this.entities = this.textures.concat(this.items).concat(this.mobs);
    return this.entities;
  }

  getEntityMapState() {
    this.entityMap = new Array();
    const entities = this.mobs.concat(this.items);

    // create blank entity map state 
    
    for (let i = 0; i < this.map.length; i++) {
      let a = new Array();
      this.entityMap.push(a)        
      for (let j = 0; j < this.map[0].length; j++) {
        let b = new Array();
        this.entityMap[i].push(b)
      }
    
    }

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
        if (this.map[i][j][0] == "npc") {
          let q = new Mob(
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
          q.textSequence = this.map[i][j][1];
          this.mobs.push(
            q
          );
          this.npcs.push(q);
        }
      }
    }
  }

  convertCords(a, b)
  {
    var x = Math.floor(a / BLOCK_WIDTH);
    var y = Math.floor(b / BLOCK_WIDTH);
    return [x, y]
  }

  // Destory's an item forever.
  destoryItem(entity, entity_loc) {
    this.map[entity.y / BLOCK_WIDTH][entity.x / BLOCK_WIDTH] = 1;
    this.getEntities().splice(entity_loc, 1);
  }

  // Gets the surrounding area of a pair of co-ordinates within the room.
  getSurroundingArea(a, b){

    let x = this.convertCords(a, b)[0];
    let y = this.convertCords(a, b)[1]

    const avaialblePositions = [
      true ? this.map[y - 1][x] : [],  // N
      true ? this.map[y][x + 1] : [],  // E
      true ? this.map[y + 1][x] : [],  // S
      true ? this.map[y][x - 1] : [],  // W
    ];
    return avaialblePositions;
  }

  // Gets the surrounding entities of a pair of co-ordinates within the room.
  getSurroundingEntities(a, b) {
    let x = this.convertCords(a, b)[0];
    let y = this.convertCords(a, b)[1];


    //console.log(this.entityMap);

    // var aboveEntity = [];
    // var belowEntity = [];
    // var rightEntity = [];
    // var leftEntity = [];

    // if (roomCount == 3) {
    //   console.log(x, y);
    // }

    // if (y > 0) {
    //   aboveEntity = this.entityMap[y - 1][x]
    // }

    // if (y > canvas.height) {
    //   belowEntity = this.entityMap[y + 1][x]
    // }

    // if (x > 0) {
    //   leftEntity = this.entityMap[y][x - 1] 
    // }

    // if (x < canvas.width) {
    //   rightEntity = this.entityMap[y][x + 1] 
    // }

    // console.log(belowEntity)
    
    
    // var localEntities = [
    //   aboveEntity,  // N
    //   this.entityMap[y][x + 1] != undefined ? this.entityMap[y][x + 1] : [],  // E,  // E
    //   belowEntity,  // S
    //   this.entityMap[y][x - 1] != undefined ? this.entityMap[y][x - 1] : [],    // W
    // ];

  // var localEntities = [
  //   this.entityMap[y - 1][x],  // N
  //   this.entityMap[y][x + 1],  // E
  //   this.entityMap[y + 1][x],  // S
  //   this.entityMap[y][x - 1]  // W
  // ];

  console.log(x, y)

  // var n = [];
  // var s = [];
  // if (y != 0) {
  //   n = this.entityMap[y - 1][x];
  // }
  // if (y >= canvas.height)
  // {
  //   s = this.entityMap[y + 1][x];
  // }

  // GOING LEFT AND DOWN AND UP IS A PROBLEM, GOING TO THE RIGHT IS FINE!

  
  // var localEntities = [
  //   // y == 0 ? [] : this.entityMap[y - 1][x], // THIS IS A FIX BUT IDK WHY // N
  //   this.entityMap[y - 1][x] != undefined ? this.entityMap[y - 1][x] : [],  // N
  //   this.entityMap[y][x + 1] != undefined ? this.entityMap[y][x + 1] : [],  // E
  //   this.entityMap[y + 1][x] != undefined ? this.entityMap[y + 1][x] : [],  // S
  //   this.entityMap[y][x - 1] == undefined ? [] : this.entityMap[y][x - 1],  // W
  // ];

  // ORIGINAL
  var localEntities = [
    this.entityMap[y - 1][x] != undefined ? this.entityMap[y - 1][x] : [],  // N
    this.entityMap[y][x + 1] != undefined ? this.entityMap[y][x + 1] : [],  // E
    this.entityMap[y + 1][x] != undefined ? this.entityMap[y + 1][x] : [],  // S
    this.entityMap[y][x - 1] != undefined ? this.entityMap[y][x - 1] : [],  // W
  ];


  //var localEntities = [];
  

  return localEntities;
    


  }

  update() {
    for (let i = 0; i < this.mobs.length; i++) {
      this.mobs[i].update(this.getEntities());
    }
    // Refresh the state of our entity map
    this.getEntityMapState();
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
