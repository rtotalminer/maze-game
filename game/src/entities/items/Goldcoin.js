// This item is simply picked up and returned to an NPC

class Goldcoin extends BasicItem {
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
      xOffset
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

      }

      onPickUp(player, room) {
        player.gd += 5;
        super.destroy(room)
      }
}