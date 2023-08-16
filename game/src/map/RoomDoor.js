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
      xOffset,
      spritePosX,
      spritePosY,
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
          xOffset,
          spritePosX,
          spritePosY,
        )
        this.key = key;
        this.unlockAudio = new Audio("game/static/audio/item_pickup.mp3");

      }

    unlockDoor(player, room) {
      console.log(player.inventory, this.key)
      let doorKey = player.inventory.find((item) => item.keyName == this.key);
      console.log(doorKey, this.key)
      if (doorKey) {
          room.destoryItem(this);
          player.inventory = player.inventory.filter((item) => item.keyName != this.key);
          this.unlockAudio.play();
      }
    }
}