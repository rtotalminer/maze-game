// This item is simply picked up and returned to an NPC
class QuestItem extends BaseItem {
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
      returnTo,
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
        this.returnTo = returnTo;
      }

      onPickUp(player, room) {
        let pickUp = super.onPickUp(player, room);
        if (pickUp) {
          player.inventory.push(this);
        }
      }
}