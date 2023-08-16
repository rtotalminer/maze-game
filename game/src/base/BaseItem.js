// This item is simply picked up and returned to an NPC

class BaseItem extends SpriteAnimated {
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
      pickupAudio
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
          spritePosY,
        )

        // Audio
        this.pickupAudio = new Audio(pickupAudio);
      }

      onPickUp(room) {
        this.pickupAudio.play();
        room.destoryItem(this);
      }
}