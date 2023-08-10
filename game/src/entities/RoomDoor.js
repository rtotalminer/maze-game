class RoomDoor extends SpriteBase {
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
      key
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
        this.key = key;

      }

    unlockDoor(player, room) {
      let doorKey = player.inventory.filter((item) => item.name.keyName == this.key);
      if (doorKey.length > 0) {
          room.destoryItem(this);
          player.inventory.splice(this, 1);
      }
    }
}