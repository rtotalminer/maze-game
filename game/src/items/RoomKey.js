// This item is simply picked up and returned to an NPC
class RoomKey extends BaseItem {
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
      pickupAudio,
      keyName,
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
        pickupAudio,
      )
        this.keyName = keyName;
        // this.pickUpAudio = document.getElementById("itemPickup");
      }

      onPickUp(player, room) {
        let pickUp = super.onPickUp(player, room);
        if (pickUp) {
          player.inventory.push(this);
        }
      }
}