// Variables

var canvas, ctx;

var isDev = true;

var rightKeyPressed = false;
var leftKeyPressed = false;
var upKeyPressed = false;
var downKeyPressed = false;
var spaceBarPressed = false;
var escKeyPressed = false;
var iKeyPressed = false;

// Movement keys
var wKeyPressed = false;
var aKeyPressed = false;
var sKeyPressed = false;
var dKeyPressed = false;

var escKeyPressedOnce = false;
var spaceKeyPressedOnce = false;

var spaceBarReleased = false;

var gameOver = false;
var gameWon = false;
var showMenu = true;
var paused = false;

var player;
var gameMap;
var roomCount;
var currentRoom;

// Game functions
var numOfImages = 0;
var noClip = false;


function loadImages() {
  if (--numOfImages > 0) return;
}

function loadGame() {

  escKeyPressedOnce = false;
  // Lazyload this?
  // Do I need a structured clone?
  gameMap = new Array(
    new Room(structuredClone(map["maze00"])),
    new Room(structuredClone(map["maze01"])),
    new Room(structuredClone(map["maze02"])),
    new Room(structuredClone(map["maze03"])),
    new Room(structuredClone(map["maze04"])),
    new Room(structuredClone(map["maze05"])),
    new Room(structuredClone(map["maze06"])),
    new Room(structuredClone(map["maze07"])),
    new Room(structuredClone(map["maze08"]))
  );

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
    player.enableHitbox = true;
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

  setInterval(mainLoop, 1000 / 50);
};

function mainLoop() {
  ctx.fillStyle = "rgba(0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //console.log(spaceBarPressed);
  if (gameOver) {
    draw_image(ctx, "deathscreen", 0, 0, canvas.width, canvas.height);

    if (spaceBarPressed) {
      sleep(50).then(() => {
        gameOver = false;
        showMenu = true;
      });
    }
  } else if (showMenu) {
    //colorRect(0, 0, canvas.width, canvas.height, "white");
    draw_image(ctx, "menu", 0, 0, canvas.width, canvas.height);
    if (spaceBarPressed) {
      sleep(0).then(() => {
        loadGame();
        showMenu = false;
      });
    }
  } else if (escKeyPressedOnce) {
    currentRoom.draw();

    player.draw();
    player.drawHealthbar();

    ctx.fillStyle = "rgba(225,225,225, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "22px Impact";
    ctx.fillStyle = "rgba(0,0,0)";
    ctx.fillText(`PAUSED`, canvas.width / 2 - 27, canvas.height / 2);
  } else if (gameWon) {
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
  } else {

    currentRoom.update();
    player.update(currentRoom);

    spaceBarReleased = false;

    if (player.hp <= 0) {
      gameOver = true;
    }


    currentRoom.draw();
    player.draw();
  }
}
