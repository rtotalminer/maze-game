
var canvas, ctx;

function loadImages() {
  if (--numOfImages > 0) return;
}

function loadGame() {

  escKeyPressedOnce = false;

  // Check if map is valid ..
  player = new Player(
    "Player",
    P_X0,
    P_Y0,
    32,
    32,
    "player.png",
    4,
    4,
    [1, 3, 0, 2],
    5,
    0,
    0
  );


  // add a dev flag, enabling hitbo and noclip etc.
  if (isDev) {
    player.enableHitbox = false;
    noClip = true;
  }

  roomCount = 0; //startingRooms[Math.floor(Math.random() * startingRooms.length)];
  currentRoom = gameMap[roomCount];
}

window.onload = function () {
  canvas = document.getElementById("game");
  ctx = canvas.getContext("2d");

  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);

  // Create Menu Room
  menuRoom = new Room(map['menu']['map'], [], map['menu']['mobs'], []);

  // Load 
  gameMap = new Array(
    new Room(map['00']['map'], map['00']['items'], map['00']['mobs'], map['00']['npcs'])
  );

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
