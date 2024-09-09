
class RoomConfig {
  constructor(map, items, mobs, npcs) {
    this.map = map;
    this.items = items;
    this.mobs = mobs;
    this.npcs = npcs;
  }
}

class Room {
  constructor(map, items, mobs, npcs) {
    this.config = new RoomConfig(map, items, mobs, npcs);

    // Maps
    this.entityMap = new Array();
    this.textureMap = new Array();

    // Textures
    this.walls = new Array();
    this.floors = new Array();

    // Entities
    this.entities = new Array();
    this.items = new Array();
    this.mobs = new Array();
    this.npcs = new Array();
    this.collidables = new Array();

    this.compileFromConfig();
    this.getEntityMapState();
    this.getTextureMap();
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
  
  createBlankMapState() {
    let mapState = new Array();
    for (let i = 0; i < this.config.map.length; i++) {
      mapState.push(new Array());        
      for (let j = 0; j < this.config.map[0].length; j++) {
        mapState[i].push(new Array());
      }
    }
    return mapState;
  }

  // Map state functions can be generalised.
  getEntityMapState() {
    let entities = this.getEntities();
    this.entityMap = this.createBlankMapState();

    for (let i = 0; i < entities.length; i++) {
        let cords = this.convertCords(entities[i].x, entities[i].y);
        this.entityMap[cords[1]][cords[0]].push(entities[i]);
    }
  }

  getCollidableMapState() {
    let mapState = this.createBlankMapState();
    let collidables = this.getCollidables();

    for (let i = 0; i < collidables.length; i++) {
      let rect = collidables[i].getCentre();
      let cords = this.convertCords(rect[0], rect[1]);
      mapState[cords[1]][cords[0]].push(collidables[i]);
    }
    return mapState;
  }

  // Gets all the static textures and stores it into texture map
  getTextureMap() {
    let textures = this.getStaticTextures();
    this.textureMap = this.createBlankMapState()

    for (let i = 0; i < textures.length; i++) {
        let cords = this.convertCords(textures[i].x, textures[i].y);
        this.textureMap[cords[1]][cords[0]].push(textures[i]);
    }
  }

  compileFromConfig() {
    let r; let file;
    for (let i = 0; i < this.config.map.length; i++) {
        for (let j = 0; j < this.config.map[0].length; j++) {
            switch (this.config.map[i][j]) {
                case 0:
                    r = Math.floor(Math.random() * 7);
                    let wall = 
                      new SpriteBase(
                        "Wall",
                        BLOCK_WIDTH * [j],
                        BLOCK_WIDTH * [i],
                        textures[0],
                        0+r, 19, 0
                      )
                    this.walls.push(wall)
                    break
                  case 1:
                    r = Math.floor(Math.random() * 5);
                    let floor = 
                      new SpriteBase(
                        "floor",
                        BLOCK_WIDTH * [j],
                        BLOCK_WIDTH * [i],
                        textures[0],
                        1+r, 23, 0
                      )
                    this.floors.push(floor)
                    break
            }
        }
    }
    // let x; let y;
    // for (let i = 0 ; i < this.config.items.length; i++) {
    //     switch (this.config.items[i][0]) {
    //         case 'Goldcoin':
    //             file = 'goldcoin.png'
    //             x = BLOCK_WIDTH*this.config.items[i][1][0];
    //             y = BLOCK_WIDTH*this.config.items[i][1][1];
    //             this.items.push(new Goldcoin("Goldcoin", x, y, 32, 32, file, 1, 1, 0, 0, 0));
    //             break
    //     }
    // }

    // let name;
    // for (let i = 0; i < this.config.mobs.length; i++) {
    //     file = "zombies_01.png";
    //     x = BLOCK_WIDTH * this.config.mobs[i][1][0];
    //     y = BLOCK_WIDTH * this.config.mobs[i][1][1];
    //     name = this.config.mobs[i][0];
    //     this.mobs.push(new Zombie(name, x, y, 32, 32, file, 3, 4, [3, 2, 0, 1], true, 0, 0, 0, null));
    // }
    
  }

  // Is there a better way to store map data? --> use json for map data then convert to objects
  convertMap() {
    // Get the texture map from the config

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
            1,
            1,
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
          let questItemName = this.map[i][j][2];
          this.items.push(
            new QuestItem(
              "QuestItem",
              BLOCK_WIDTH * [j],
              BLOCK_WIDTH * [i],
              32,
              32,
              `item/${questItemName}.png`,
              1,
              1,
              0,
              0,
              0,
              0,
              "game/static/audio/item_pickup.mp3",
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
            "item/key.png",
            1,
            1,
            [0, 0, 0, 0],
            0,
            0,
            0,
            "game/static/audio/item_pickup.mp3",
            this.map[i][j][1]
          );
          key.moveTo = "STATIC";
          console.log(key)
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
            new Zombie(
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
          let reward = this.map[i][j][3]
          let facing = this.map[i][j][4]
          let npc = new NPC(
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
          )
          npc.setFacingDirection(facing);
          npc.setReward(reward);
          npc.static = true;
          npc.textSequence = this.map[i][j][1];
          this.npcs.push(npc);
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

  // Get the surrounding 
    getSurroundingCollidables(x, y)
    {
	let cords  = this.convertCords(x, y);
	let state = this.getCollidableMapState();

	x = cords[0];
	y = cords[1];

	let surroundings =  [
	    (state[y] == undefined) ? [] : state[y][x],
	    (state[y-1] == undefined) ? [] : state[y-1][x],
	    (state[y] == undefined) ? [] : (state[y][x+1] == undefined) ? [] : state[y][x+1],
	    (state[y+1] == undefined) ? [] : state[y+1][x],
	    (state[y] == undefined) ? [] : (state[y][x-1] == undefined) ? [] : state[y][x-1],
	];

    for (let i = 0; i < surroundings.length; i ++) {
      if (surroundings[i] == undefined) {
        surroundings[i] = [];
      }
    }

    return  surroundings;
    }

  // Gets the surrounding entities of a pair of co-ordinates within the room.
  getSurroundingEntities(a, b) {
    let x = this.convertCords(a, b)[0];
    let y = this.convertCords(a, b)[1];

    var northEntity = [];
    var eastEntity = [];
    var southEntity = [];
    var westEntity = [];
    
    //let nEnt = this.?entityMap[y-1][x];
    //console.log(nEnt);
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
        westEntity = this.entityMap[y][x - 1];
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

  // Gets an AxB are surrounding the player, depending on the light level
  getLightArea(player) {
    let [a, b] = player.getCentre();
    let [x, y] = this.convertCords(a, b);

    let textures = {
      "TL": (this.textureMap[y-1][x-1] != undefined) ? this.textureMap[y-1][x-1] : [],     // Top Left
      "TC": (this.textureMap[y-1][x] != undefined) ? this.textureMap[y-1][x] : [],       // Top Center
      "TR": (this.textureMap[y-1][x+1] != undefined) ? this.textureMap[y-1][x+1] : [],
      "CL": (this.textureMap[y][x-1] != undefined) ? this.textureMap[y][x-1] : [],
      "CC": (this.textureMap[y][x] != undefined) ? this.textureMap[y][x] : [],
      "CR": (this.textureMap[y][x+1] != undefined) ? this.textureMap[y][x+1] : [],
      "BL": (this.textureMap[y+1][x-1] != undefined) ? (this.textureMap[y+1][x-1] != undefined) ? this.textureMap[y+1][x-1] : [] : [],
      "BC": (this.textureMap[y+1][x] != undefined) ? (this.textureMap[y+1][x] != undefined) ? this.textureMap[y+1][x] : [] : [],
      "BR": (this.textureMap[y+1][x+1] != undefined) ? (this.textureMap[y+1][x+1] != undefined) ? this.textureMap[y+1][x+1] : [] : [],
    }
    
    let entities = {
      "TL": (this.entityMap[y-1][x-1] != undefined) ? this.entityMap[y-1][x-1] : [],     // Top Left
      "TC": (this.entityMap[y-1][x] != undefined) ? this.entityMap[y-1][x] : [],       // Top Center
      "TR": (this.entityMap[y-1][x+1] != undefined) ? this.entityMap[y-1][x+1] : [],
      "CL": (this.entityMap[y][x-1] != undefined) ? this.entityMap[y][x-1] : [],
      "CC": (this.entityMap[y][x] != undefined) ? this.entityMap[y][x] : [],
      "CR": (this.entityMap[y][x+1] != undefined) ? this.entityMap[y][x+1] : [],
      "BL": (this.entityMap[y+1][x-1] != undefined) ? (this.entityMap[y+1][x-1] != undefined) ? this.entityMap[y+1][x-1] : [] : [],
      "BC": (this.entityMap[y+1][x] != undefined) ? (this.entityMap[y+1][x] != undefined) ? this.entityMap[y+1][x] : [] : [],
      "BR": (this.entityMap[y+1][x+1] != undefined) ? (this.entityMap[y+1][x+1] != undefined) ? this.entityMap[y+1][x+1] : [] : [],
    }

    // Player facing vision
    if (player.directionLooking == "S") {
      if (this.entityMap[y+2] != undefined) {
        // console.log(this.textureMap[y+1][x].name);
          if (this.textureMap[y+1][x][0].name != "Wall") {
          entities["BSS"] = (this.entityMap[y+2][x] != undefined) ? this.entityMap[y+2][x] : []
          textures["BSS"] = (this.textureMap[y+2][x] != undefined) ? this.textureMap[y+2][x] : []
        }
      }
    }
    if (player.directionLooking == "N") {
      if (this.entityMap[y-2] != undefined) {
        if (this.textureMap[y][y-1] != undefined) {
          if (this.textureMap[y-1][x][0].name != "Wall") {
            entities["TNN"] = (this.entityMap[y-2][x] != undefined) ? this.entityMap[y-2][x] : []
            textures["TNN"] = (this.textureMap[y-2][x] != undefined) ? this.textureMap[y-2][x] : []
          }
        }
      }
    }
    if (player.directionLooking == "E") {
      if (this.entityMap[y] != undefined) {
        if (this.textureMap[y][x+1] != undefined) {
          if (this.textureMap[y][x+1][0].name != "Wall") {
            entities["CEE"] = (this.entityMap[y][x+2] != undefined) ? this.entityMap[y][x+2] : []
            textures["CEE"] = (this.textureMap[y][x+2] != undefined) ? this.textureMap[y][x+2] : []
          }
        }
      }
    }
    if (player.directionLooking == "W") {
      if (this.textureMap[y] != undefined) {
        if (this.textureMap[y][x-1] != undefined) {
          if (this.textureMap[y][x-1][0].name != "Wall") {
            entities["CWW"] = (this.entityMap[y][x-2] != undefined) ? this.entityMap[y][x-2] : []
            textures["CWW"] = (this.textureMap[y][x-2] != undefined) ? this.textureMap[y][x-2] : []
        }
        }
      }
    }

    return [textures, entities];
  }

  update() {
    this.getEntityMapState();

    for (let i = 0; i < this.mobs.length; i++) {
      this.mobs[i].update(this);
    }
    for (let i = 0; i < this.npcs.length; i++) {
      this.npcs[i].update(this);
    }
  }

  draw() {

    if (!isDev && !showMenu) {
      let [textures, entities] = this.getLightArea(player);

      // console.log({textures, entities})

      for (let i in textures) {
        if (textures[i][0] != null) 
          textures[i][0].draw();
      }

      for (let i in entities) {
        if (entities[i][0] != null)
          entities[i][0].draw()
      }
    }

    else {
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
}
