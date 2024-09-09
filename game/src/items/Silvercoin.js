// This item is simply picked up and returned to an NPC

class Silvercoin extends BaseItem {
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
	    pickupAudio
        )
        // Audio
        this.pickupAudio = document.getElementById("coinPickup");
      }

      onPickUp(player, room) {
        this.pickupAudio.play();
        player.gd += 1;
          room.destoryItem(this) // move to room destory
	  super.onPickUp(player, room);
      }
}
