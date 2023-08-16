// Helper Functions

function colorRect(x, y, w, h, c) {
  ctx.fillStyle = c;
  ctx.fillRect(x, y, w, h);
}

function drawText(text, x, y, c) {
 
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
  if (e.keyCode == I_KEY) {
    iKeyPressed = true;
  }

  if (e.keyCode == ESC_KEY) {
    escKeyPressedOnce = !escKeyPressedOnce;
    paused = !paused;
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
  if (e.keyCode == I_KEY) {
    iKeyPressed = false;
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


const wrapText = function(ctx, text, x, y, maxWidth, lineHeight) {
  // First, start by splitting all of our text into words, but splitting it into an array split by spaces
  let words = text.split(' ');
  let line = ''; // This will store the text of the current line
  let testLine = ''; // This will store the text when we add a word, to test if it's too long
  let lineArray = []; // This is an array of lines, which the function will return

  // Lets iterate over each word
  for(var n = 0; n < words.length; n++) {
      // Create a test line, and measure it..
      testLine += `${words[n]} `;
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;
      // If the width of this test line is more than the max width
      if (testWidth > maxWidth && n > 0) {
          // Then the line is finished, push the current line into "lineArray"
          lineArray.push([line, x, y]);
          // Increase the line height, so a new line is started
          y += lineHeight;
          // Update line and test line to use this word as the first word on the next line
          line = `${words[n]} `;
          testLine = `${words[n]} `;
      }
      else {
          // If the test line is still less than the max width, then add the word to the current line
          line += `${words[n]} `;
      }
      // If we never reach the full max width, then there is only one line.. so push it into the lineArray so we return something
      if(n === words.length - 1) {
          lineArray.push([line, x, y]);
      }
  }
  // Return the line array
  return lineArray;
}

function fancyTimeFormat(duration) {
  // Hours, minutes and seconds
  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  const secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;

  return ret;
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

  if (noClip && c_ent.name == "Player" && ent.name == "Wall") { 
    ;
  }
  else {
  if (x0 + w0 > x1 && x0 < x1 + w1) {
    if (y0 + h0 > y1 && y0 < y1) {
      // Collision on top side
      // if (!(c_ent.name == "Player")) {
        
        
      // }
      if (c_ent.name == "Player" &&
        (ent.name == "Goldcoin" ||
        ent.name == "Silvercoin" ||
        ent.name == "RoomDoor")
        ) {
        
        c_ent.y = y0;
      }
      else {
        c_ent.y = y1 - h0;
      }

      
      
      return ent.name;
    } else if (y0 > y1 && y0 < y1 + h1) {
      // Collision on bottom side
      if (c_ent.name == "Player" &&
        (ent.name == "Goldcoin" ||
        ent.name == "Silvercoin" ||
        ent.name == "RoomDoor")
        ) {
        
        c_ent.y = y0;
      }
      else {
        c_ent.y = y1 + h1;
      }
      return ent.name;
    }
  }

  if (y0 + h0 > y1 && y0 < y1 + h1) {
    if (x0 + w0 > x1 && x0 < x1) {
      //Collision on left side
      c_ent.x = x1 - c_ent.w + c_ent.xOffset;
      return ent.name;
    } else if (x0 > x1 && x0 < x1 + w1) {
      // Collision on right side
      c_ent.x = x1 + ent.w - c_ent.xOffset;
      return ent.name;
    }
  }
}
}


function loadImages() {
  if (--numOfImages > 0) return;
}
