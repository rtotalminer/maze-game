class NPC extends SpriteAnimated {
    constructor(
      name,
      x,
      y,
      w,
      h,
      filename,
      spriteRows,
      spriteCols,
      spriteDirections,
      xOffset,
      npcName
    ) {
      super(
        name,
        x,
        y,
        w,
        h,
        filename,
        spriteRows,
        spriteCols,
        spriteDirections,
        xOffset
      );
  
      this.ox = x;
      this.oy = y;
      this.x = x;
      this.y = y;
  
      this.isDialogue = false;
      this.dialogueCount = 0;
      this.npcName = npcName;
      this.textSequence = new Array();
    }
  
    update(entities) {
    }
  
    draw() {
      if (this.isDialogue){
        // Find suitable place to draw speech bubble
        let x0 = 0;
        let y0 = canvas.height-32*3;
  
        let w = canvas.width;
        let h = 64;
  
        // Draw speech bubble and draw mob face
        colorRect(x0, y0, w, h, "grey");
        draw_image(ctx, "zombie_01_face", x0+2, y0+2, 60, 60);
  
        // Draw text
        let currentText = this.textSequence[this.dialogueCount];
  
        // Set up our font and fill style
        let fontSize = 16;
        let border = 64;
  
        ctx.fillStyle = "#000000"
        ctx.font = `${fontSize}px serif`;
        
        let x = x0 + border;
        let y = y0 + fontSize;
        let maxWidth = canvas.height - 60;
        let lineHeight = 18;
  
        let wrappedText = wrapText(ctx, currentText, x, y, maxWidth, lineHeight);
        wrappedText.forEach(function(item) {
            ctx.fillText(item[0], item[1], item[2]); 
        })
  
        // Get allowed text, chop it up into sequeneces on key press
  
  
      }
      super.draw();
    }
  
    playDialogue() {
      this.isDialogue = true;
    }
  
  }
  