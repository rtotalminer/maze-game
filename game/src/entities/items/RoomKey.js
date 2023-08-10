// This item is simply picked up and returned to an NPC
class RoomKey extends SpriteBase {
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
            xOffset
        )
        this.keyName = keyName;

      }

      onPickUp(player, room) {
        player.inventory.push(this);
        room.destoryItem(this) // move to room destory
      }
}