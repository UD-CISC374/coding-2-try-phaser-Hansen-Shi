export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("background", "assets/images/background.png")
    
    this.load.spritesheet("smol", "assets/spritesheets/ship.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("norm", "assets/spritesheets/ship2.png", {
      frameWidth: 32,
      frameHeight: 16
    });
    this.load.spritesheet("chonk", "assets/spritesheets/ship3.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("boom", "assets/spritesheets/explosion.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("power", "assets/spritesheets/power-up.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("player", "assets/spritesheets/player.png", {
      frameWidth: 16,
      frameHeight: 24
    });
    this.load.spritesheet("beam", "assets/spritesheets/beam.png", {
      frameWidth: 16,
      frameHeight : 16
    });
    this.load.spritesheet("mothership", "assets/spritesheets/mothership.png", {
      frameWidth: 306,
      frameHeight: 270
    });

    this.load.audio("battle", "assets/sounds/battleMusic.mp3");
    this.load.audio("pew", "assets/sounds/pew.mp3");
    this.load.audio("bam", "assets/sounds/explosion.mp3");
  }

  create() {
    this.anims.create({
      key: "smol_anim",
      frames: this.anims.generateFrameNumbers("smol", {start: 0,end: 1}),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "norm_anim",
      frames: this.anims.generateFrameNumbers("norm", {start: 0,end: 1}),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "chonk_anim",
      frames: this.anims.generateFrameNumbers("chonk", {start: 0,end: 1}),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "boom_anim",
      frames: this.anims.generateFrameNumbers("boom", {start: 0,end: 4}),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });

    this.anims.create({
      key: "buddy",
      frames: this.anims.generateFrameNumbers("power", {start: 2, end: 3}),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "bomb",
      frames: this.anims.generateFrameNumbers("power", {start: 1, end: 2}),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "player_anim",
      frames: this.anims.generateFrameNumbers("player", {start: 0, end: 1}),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "beam_anim",
      frames: this.anims.generateFrameNumbers("beam", {start: 0, end: 1}),
      frameRate: 20,
      repeat: -1
    });
    
    this.scene.start('MainScene');
  }
}
