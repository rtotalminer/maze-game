// This item is simply picked up and returned to an NPC
class RoomKey extends SpriteAnimated {
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
      )
        this.keyName = keyName;

      }

      onPickUp(player, room) {
        player.inventory.push(this);
        room.destoryItem(this) // move to room destory
      }
}