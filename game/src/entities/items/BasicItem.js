class BasicItem extends SpriteBase {
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

      destroy(room) {
        let newRoomItems = room.items.filter((item) => item != this);
        room.items = newRoomItems;
      }
}