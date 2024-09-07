


function menu(canvas, ctx) {

    if (menuRoom != undefined)
        menuRoom.update();
        menuRoom.draw();

    // grab user key directions

    // change state
    if (spaceBarPressed) {
        loadGame();
        showMenu = false;
    }

}