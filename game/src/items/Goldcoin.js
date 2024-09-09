// This item is simply picked up and returned to an NPC

class Goldcoin extends SpriteBase {
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
        this.pickupAudio = document.getElementById("coinPickup");

      }

      onPickUp(player, room) {
        this.pickupAudio.play();
        player.gd += 3;
        room.destoryItem(this) // move to room destory
      }
}