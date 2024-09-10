class BaseItem extends SpriteAnimated {
    constructor(
        name,
        x,
        y,
        spritesheet,
        spritePosX,
        spritePosY,
        offset,
        totalFrames,
        spriteDirections,
        pickupAudio
    ) {
        super(
            name,
            x,
            y,
            spritesheet,
            spritePosX,
            spritePosY,
            offset,
            totalFrames,
            spriteDirections
        )
        this.pickupAudio = new Audio(pickupAudio);
      }

      onPickUp(room) {
        this.pickupAudio.play();
        room.destroyItem(this);
      }
}