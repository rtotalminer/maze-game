
class MenuButton {
    constructor(x, y, text) {
        this.x = x;
        this.y = y;
        this.text = text;
    }
    draw(ctx) {
        colorRect(this.x-10, this.y-60, 220, 70, 'rgba(0,0,0)')
        drawText(ctx, this.text, this.x, this.y, 'rgba(225,225,225)', 'Dungeon', 60)
    }
}


const startButton = new MenuButton(MAZE_WIDTH/2, MAZE_HEIGHT/2, 'Start')
const mapButton = new MenuButton(MAZE_WIDTH/2, MAZE_HEIGHT/2 + 100, 'Map Maker')
const settingsButton = new MenuButton(MAZE_WIDTH/2, MAZE_HEIGHT/2 + 200, 'Settings')

var buttons = [startButton, mapButton, settingsButton];
var count = 0;

function menu(canvas, ctx) {

    // change state
    if (downKeyPressedOnce) {
        downKeyPressedOnce = false; // lazy
        count += 1;
        if (count > 2)  count = 0;
        // if (selection == 1)
        //     loadGame();
        // showMenu = false;
    }
    if (upKeyPressedOnce) {
        upKeyPressedOnce = false; // lazy
        count -= 1;
        if (count < 0)  count = 2;
    }
    if (spaceKeyPressedOnce) {
        spaceKeyPressedOnce = false;
        if (selectedButton == startButton) {
            loadGame()
            showMenu = false;
        }
    }

    selectedButton = buttons[count]

    menuRoom.update();
    menuRoom.draw();


    colorRect(65, 30, 420, 70, 'rgba(0,0,0)')
    drawText(ctx, 'Dungeon Crawler', 75, 100, 'rgba(225,225,225)', 'Dungeon', 80)


    colorRect(150-20, 150-35, 280, 40, 'rgba(0,0,0)')
    drawText(ctx, 'Made by SaintStudios', 150, 150, 'rgba(225,225,225)', 'Dungeon', 40)

    file = 'goldcoin.png'
    // let coin = new SpriteAnimated("Goldcoin", selectedButton.x-100, selectedButton.y-68, 32, 32, file, 1, 1, 0, 0, 0, 0);
    // coin.w = 84; coin.h = 84;
    //coin.draw();

    startButton.draw(ctx);
    mapButton.draw(ctx);
    settingsButton.draw(ctx);
}

