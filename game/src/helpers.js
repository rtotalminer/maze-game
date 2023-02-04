// Helper Functions

function colorRect(x, y, w, h, c) {
  ctx.fillStyle = c;
  ctx.fillRect(x, y, w, h);
}

function keyPressed(e) {
  if (e.keyCode == LEFT_KEY) {
    leftKeyPressed = true;
  }
  if (e.keyCode == DOWN_KEY) {
    downKeyPressed = true;
  }
  if (e.keyCode == UP_KEY) {
    upKeyPressed = true;
  }
  if (e.keyCode == RIGHT_KEY) {
    rightKeyPressed = true;
  }
  if (e.keyCode == SPACE_BAR) {
    spaceBarPressed = true;
  }
  if (e.keyCode == ESC_KEY) {
    escKeyPressed = true;
  }

  if (e.keyCode == ESC_KEY) {
    escKeyPressedOnce = !escKeyPressedOnce;
  }
  if (e.keyCode == SPACE_BAR) {
    spaceKeyPressedOnce = !spaceKeyPressedOnce;
  }
}

function keyReleased(e) {
  if (e.keyCode == LEFT_KEY) {
    leftKeyPressed = false;
  }
  if (e.keyCode == DOWN_KEY) {
    downKeyPressed = false;
  }
  if (e.keyCode == UP_KEY) {
    upKeyPressed = false;
  }
  if (e.keyCode == RIGHT_KEY) {
    rightKeyPressed = false;
  }
  if (e.keyCode == SPACE_BAR) {
    spaceBarPressed = false;
    spaceBarReleased = true;
  }
  if (e.keyCode == ESC_KEY) {
    escKeyPressed = false;
  }
}

function draw_image(ctx, fileid, x, y, w, h) {
  let img = document.getElementById(fileid);
  ctx.drawImage(img, x, y, w, h);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function collisionDetection(c_ent, ent) {
  let x0 = c_ent.x + c_ent.xOffset;
  let y0 = c_ent.y;
  let w0 = c_ent.w - 2 * c_ent.xOffset;
  let h0 = c_ent.h;

  let x1 = ent.x + ent.xOffset;
  let y1 = ent.y;
  let w1 = ent.w;
  let h1 = ent.h;

  if (x0 + w0 > x1 && x0 < x1 + w1) {
    if (y0 + h0 > y1 && y0 < y1) {
      console.log("Collision on bottom side.");
      c_ent.y = y1 - h0;
      return ent.name;
    } else if (y0 > y1 && y0 < y1 + h1) {
      // Collision on bottom side
      console.log("Collision on top side.");
      c_ent.y = y1 + h1;
      return ent.name;
    }
  }

  if (y0 + h0 > y1 && y0 < y1 + h1) {
    if (x0 + w0 > x1 && x0 < x1) {
      console.log("Collision on right side.");
      //Collision on left side
      c_ent.x = x1 - c_ent.w + c_ent.xOffset;
      return ent.name;
    } else if (x0 > x1 && x0 < x1 + w1) {
      // Collision on right side
      c_ent.x = x1 + ent.w - c_ent.xOffset;
      console.log("Collision on left side.");
      return ent.name;
    }
  }

  // if (c_ent.x + c_ent.w > ent.x && c_ent.x < ent.x + ent.w) {
  //   if (c_ent.y + c_ent.h > ent.y && c_ent.y < ent.y) {
  //     // Collision on top side
  //     console.log("Collision on bottom side");
  //     c_ent.y = ent.y - ent.h;
  //     return ent.name;
  //   } else if (c_ent.y > ent.y && c_ent.y < ent.y + ent.h) {
  //     console.log("Collision on top side");
  //     // Collision on top side
  //     c_ent.y = ent.y + ent.h;
  //     return ent.name;
  //   }
  // }
  // if (c_ent.y + c_ent.h > ent.y && c_ent.y < ent.y + ent.h) {
  //   if (c_ent.x + c_ent.w > ent.x && c_ent.x < ent.x) {
  //     console.log("Collision on right side");
  //     c_ent.x = ent.x - ent.w;
  //     return ent.name;
  //   } else if (c_ent.x > ent.x && c_ent.x < ent.x + ent.w) {
  //     // Collision on left side
  //     console.log("Collision on left side");
  //     c_ent.x = ent.x + ent.w;
  //     return ent.name;
  //   }
  // }
}
