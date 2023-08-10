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
      console.log(doorKey);
      if (doorKey.length > 0) {
          super.destroy(room);
          player.inventory.splice(this, 1);
      }
    }
}