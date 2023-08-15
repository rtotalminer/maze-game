// This item is simply picked up and returned to an NPC
class QuestItem extends SpriteBase {
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
      returnTo
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
        this.returnTo = returnTo;
        console.log(returnTo)

      }

      onPickUp(player, room) {
        player.inventory.push(this);
        room.destoryItem(this)
      }
}