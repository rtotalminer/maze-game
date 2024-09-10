

var menuSelectionCount = 0;
var menuBackground;

var menuPointer;
var menuPointerInitY = (MAZE_HEIGHT/2.5) - 4;

function loadMenu() {
    menuPointer = new SpriteAnimated("Menu Pointer", MAZE_WIDTH/2 - 64, menuPointerInitY, textures[0], 47, 0, 0, 5, []);
    menuPointer.w = 64;
    menuPointer.h = 64;
    menuBackground = new Room(map['menu']['map'], [], map['menu']['mobs'], []);
}

function updateMenu() {
    menuBackground.update();
    menuPointer.y = menuPointerInitY + (menuSelectionCount * 100);

    if (downKeyPressedOnce) {
        menuSelectionCount += 1;
    }
    if (upKeyPressedOnce) {
        menuSelectionCount -= 1;
    }
    if (spaceBarPressedOnce) {
        if (menuSelectionCount == 0) {
            loadGame();
            showMenu = false;
        }
    }

    if (menuSelectionCount > 2)  menuSelectionCount = 0;
    if (menuSelectionCount < 0)  menuSelectionCount = 2;

}

function drawMenu(ctx) {
    menuBackground.draw();
    menuPointer.draw();

    colorRect(65, 30, 420, 70, 'rgba(0,0,0)')
    drawText(ctx, 'Dungeon Crawler', 75, 100, 'rgba(225,225,225)', 'Dungeon', 80)

    colorRect(150-20, 150-35, 280, 40, 'rgba(0,0,0)')
    drawText(ctx, 'Made by SaintStudios', 150, 150, 'rgba(225,225,225)', 'Dungeon', 40)

    colorRect(MAZE_WIDTH/2, MAZE_HEIGHT/2.5, 220, 60, 'rgba(0,0,0)')
    drawText(ctx, 'Play', 10 + MAZE_WIDTH/2, MAZE_HEIGHT/2.5 + 45, 'rgba(225,225,225)', 'Dungeon', 40)

    colorRect(MAZE_WIDTH/2, MAZE_HEIGHT/2.5 + 100, 220, 60, 'rgba(0,0,0)')
    drawText(ctx, 'Map Maker', 10 + MAZE_WIDTH/2, MAZE_HEIGHT/2.5 + 145, 'rgba(225,225,225)', 'Dungeon', 40)

    colorRect(MAZE_WIDTH/2, MAZE_HEIGHT/2.5 + 200, 220, 60, 'rgba(0,0,0)')
    drawText(ctx, 'Settings', 10 + MAZE_WIDTH/2, MAZE_HEIGHT/2.5 + 245, 'rgba(225,225,225)', 'Dungeon', 40)

}
