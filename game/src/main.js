
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
  _textures = ['texture_map.png', 'zombies_01.png', 'player.png'];
  numOfImages = _textures.length; 
  textures = [
    new Spritesheet(_textures[0], 64, 95),
    new Spritesheet(_textures[1], 3, 4),
    new Spritesheet(_textures[2], 4, 4)
  ];

}

function postUpdate() {
    downKeyPressedOnce = false;
    upKeyPressedOnce = false;
    spaceKeyPressedOnce = false;
}

function preload() {

  loadMenu()


  // game
  gameMap = new Array(
    new Room(map['00']['map'], map['00']['items'], map['00']['mobs'], map['00']['npcs']),
    new Room(map['01']['map'], map['01']['items'], map['01']['mobs'], map['01']['npcs']),
  );
}

window.onload = async function () {
  canvas = document.getElementById("game");
  ctx = canvas.getContext("2d");

  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);

  canvas.addEventListener('mousemove', (event) => {
    let rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
  });

  precache();

  setInterval(mainLoop, 1000 / 50);
};

function mainLoop() {


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
    updateMenu();

    postUpdate();

    drawMenu(ctx);
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
