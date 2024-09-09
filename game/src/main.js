
function loadSpritesheet(spritesheet) {
  spritesheet.load();
  if (--numOfImages <= 0)  preload();
}

function loadGame() {
  escKeyPressedOnce = false;


  player = new Player(
    'Player',
    P_X0,
    P_Y0,
    textures[2],
    0, 0, 0, 4, [1, 3, 0, 2]
  );


  if (isDev) {
    player.enableHitbox = false;
    noClip = true;
  }

  roomCount = 0;
  currentRoom = gameMap[roomCount];
}

function precache() {
  textures = [
    new Spritesheet('texture_map.png', 64, 95),
    new Spritesheet('zombies_01.png', 3, 4),
    new Spritesheet('player.png', 4, 4)
  ];
  numOfImages = textures.length; 
}

function preload() {
  // menu
  menuPointer = new SpriteAnimated(
      "Menu Pointer",
      startButton.x-100,
      startButton.y-68,
      textures[0],
      47, 0, 0, 5, [[0, 0], [0, 1], [0, 2], [0, 3]]   
  );
  menuRoom = new Room(map['menu']['map'], [], map['menu']['mobs'], []);

  // game
  gameMap = new Array(
    new Room(map['00']['map'], map['00']['items'], map['00']['mobs'], map['00']['npcs'])
  );
}

window.onload = function () {
  canvas = document.getElementById("game");
  ctx = canvas.getContext("2d");

  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);

  precache();

  setInterval(mainLoop, 1000 / 50);
};

function mainLoop() {


  ctx.fillStyle = "rgba(0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (gameOver) {
    draw_image(ctx, "deathscreen", 0, 0, canvas.width, canvas.height);
    if (spaceBarPressed) {
      sleep(50).then(() => {
        gameOver = false;
        showMenu = true;
      });
    }
  }

  else if (showMenu) {
    menu(canvas, ctx);
  }

  else if (escKeyPressedOnce) {
    currentRoom.draw();

    player.draw();
    player.drawHealthbar();

    ctx.fillStyle = "rgba(225,225,225, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "22px Impact";
    ctx.fillStyle = "rgba(0,0,0)";
    ctx.fillText(`PAUSED`, canvas.width / 2 - 27, canvas.height / 2);
  }
  
  else if (gameWon) {
    ctx.fillStyle = "rgba(225,225,225)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "22px Impact";
    ctx.fillStyle = "rgba(0,0,0)";
    ctx.fillText(
      `You finished the game with ${player.gd} gold.`,
      (canvas.width * 3) / 15,
      (9 * canvas.height) / 10
    );
    if (spaceBarPressed) {
      sleep(50).then(() => {
        gameWon = false;
        showMenu = true;
      });
    }
  }
  
  else {
    currentRoom.update();
    player.update(currentRoom);

    spaceBarReleased = false;


    if (player.hp <= 0) {
      // kill player, purge all items from inventory
      gameOver = true;
    }

    currentRoom.draw();
    player.draw();
  }
  
}
