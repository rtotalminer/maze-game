// This item is simply picked up and returned to an NPC

class QuestItem extends BasicItem {
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
            xOffset
        )

      }

      onPickUp(player, room) {
        player.inventory.push(this);
        super.destroy(room)
      }
}