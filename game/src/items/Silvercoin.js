// This item is simply picked up and returned to an NPC

class Silvercoin extends SpriteBase {
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

      }

      onPickUp(player, room) {
        player.gd += 1;
        room.destoryItem(this) // move to room destory
      }
}