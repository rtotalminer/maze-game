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
      spritePosX,
      spritePosY,
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
        xOffset,
        spritePosX,
        spritePosY
      );  

      this.isDialogue = false;
      this.isAvailable = true;
      this.npcDialgoueInitiated = false;
      this.dialogueCount = 0;
      this.currentDialogue = 0;
      this.npcName = npcName;
      this.npcFinished = false;
      this.done = false;
      this.textSequence = new Array();

      this.talkingAudio = document.getElementById("mumbling");
    }
  
    update(entities) {
      console.log(this.isDialogue);
      if (!this.isDialogue) {
        this.talkingAudio.pause();
      }
    }
  
    // move most of this to update fx
    draw() {
      if (this.dialogueCount >= this.textSequence.length) {
        this.dialogueCount = -1;
        this.isDialogue = false;
        if (this.currentDialogue == 1) {
          this.npcFinished = true;
        }
        // this.npcDialgoueInitiated = false;
      }
      if (this.isDialogue){
        this.talkingAudio.play();
        // Find suitable place to draw speech bubble
        let x0 = 0;
        let y0 = canvas.height-32*3;
  
        let w = canvas.width;
        let h = 64;
  
        // Draw speech bubble and draw mob face
        colorRect(x0, y0, w, h, "grey");
        draw_image(ctx, "zombie_01_face", x0+2, y0+2, 60, 60);
  
        // Draw text
        let currentText = this.textSequence[this.currentDialogue][this.dialogueCount];
  
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
      if (!this.isDialogue) {
        this.talkingAudio.pause();
      }
      super.draw();
    }

    interact(playerInventory) {
      if (this.isAvailable) {
        let item = playerInventory.find((_item) => _item.returnTo == this.npcName); 
        if (item) {
          console.log(item);
          this.currentDialogue = 1;
          if (!this.npcDialgoueInitiated) {
            this.npcDialgoueInitiated = true;
          }
          this.playDialogue();
        }
        else {
          if (!this.npcDialgoueInitiated) {
            this.npcDialgoueInitiated = true;
          }
          this.playDialogue();
        }
      }


    }

    finished(player) {
      player.gd += 10;

      this.done = true;

      let item = player.inventory.find((_item) => _item.returnTo == this.npcName); 
      if (item) {
          player.inventory = player.inventory.filter((item) => item.keyName != this.key);
      }


    }
  
    playDialogue() {
      if (!this.done) {
        console.log("play dialouge ", this.dialogueCount)
        this.isDialogue = true;
      }
    }

    incrementDialgoueCount() {
      // if (!(this.dialogueCount >= this.textSequence.length - 1)) {
        this.dialogueCount += 1;
      // }
    }
  
  }
  