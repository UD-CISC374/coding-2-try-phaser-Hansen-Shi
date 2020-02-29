import Beam from "./beam";

export default class MainScene extends Phaser.Scene {
  background: Phaser.GameObjects.TileSprite;
  
  ship1: Phaser.GameObjects.Sprite;
  ship2: Phaser.GameObjects.Sprite;
  ship3: Phaser.GameObjects.Sprite;
  mothership: Phaser.GameObjects.Sprite;
  player: Phaser.Physics.Arcade.Sprite;

  boosts: Phaser.Physics.Arcade.Group;
  
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  spacebar: Phaser.Input.Keyboard.Key;
  bomb: Phaser.Input.Keyboard.Key;
  projectiles: Phaser.GameObjects.Group;
  enemies: Phaser.Physics.Arcade.Group;

  bombCount: integer;
  buddyCount: integer;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() { 
    this.background = this.add.tileSprite(0,0, 256, 272, "background");
    this.background.setOrigin(0,0);
    
    this.ship1 = this.add.sprite(256/2 - 50, 272/2, "smol");
    this.ship2 = this.add.sprite(256/2, 272/2, "norm");
    this.ship3 = this.add.sprite(256/2 + 50, 272/2, "chonk");
    this.mothership = this.add.sprite(256/2, -100, "mothership");
    this.mothership.setScale(.5);

    this.player = this.physics.add.sprite(256/2 - 8, 272-64, "player");
    this.player.play("player_anim");
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.bomb = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

    this.projectiles = this.add.group();
    
    this.boosts = this.physics.add.group();

    var maxBoosts = 3;
    for (var i = 0; i <= maxBoosts; i++){
      var boost = this.physics.add.sprite(16, 16, "power");
      this.boosts.add(boost);
      boost.setRandomPosition(0, 0, 256, 272);
      
      if(Math.random() > .25){
      boost.play("bomb");
    }
      else {
        boost.play("buddy");
    }

    boost.setVelocity(50, 50);
    boost.setCollideWorldBounds(true);
    boost.setBounce(1);
  }

    this.ship1.play("smol_anim");
    this.ship2.play("norm_anim");
    this.ship3.play("chonk_anim");

    this.enemies = this.physics.add.group();
    this.enemies.add(this.ship1);
    this.enemies.add(this.ship2);
    this.enemies.add(this.ship3);

    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();
    this.mothership.setInteractive();
    this.player.setInteractive();

    this.physics.add.overlap(this.player, this.boosts, this.pickUp);
    this.physics.add.overlap(this.player, this.enemies, this.playerDeath);
    this.physics.add.overlap(this.projectiles, this.enemies, this.hit);

  }

  pickUp(player, boost){
    boost.disableBody(true, true);
    boost.destroy();
    }
  playerDeath(player, buddyCount){
    player.x = 256/2 - 8;
    player.y = 272 - 30;
    player.disableBody(true, true);
  }
  hit(projectile, enemy){
    projectile.destroy();
    enemy.destroy();
  }
  moveEnemy(ship: Phaser.GameObjects.Sprite, speed: integer){
    ship.y += speed;
    if (ship.y > 272){
      this.spawnEnemy(ship);
    }
  }
  moveBoss(ship: Phaser.GameObjects.Sprite, speed:integer){
    ship.y += speed;
    if (ship.y > 350){
      this.spawnEnemy(ship);
    }
  }
  movePlayer(){
    if (this.cursorKeys.left?.isDown){
      this.player.setVelocityX(-200);
    }
    else if (this.cursorKeys.right?.isDown){
      this.player.setVelocityX(200);
    }
    else {
      this.player.setVelocityX(0);
    }
    
    if (this.cursorKeys.up?.isDown){
      this.player.setVelocityY(-200);
    }
    else if (this.cursorKeys.down?.isDown){
      this.player.setVelocityY(200);
    }
    else {
      this.player.setVelocityY(0);
    }
  }
  spawnEnemy(ship: Phaser.GameObjects.Sprite){
    var random_x = Phaser.Math.Between(0, 256);
    ship.y = 0;
    ship.x = random_x;
  }
  spawnPowerUps(boost: Phaser.Physics.Arcade.Sprite){
    if (boost.y > 272){
      var random_y = Phaser.Math.Between(0, 272);
      boost.x = 0;
      boost.y = random_y;
    }
    if (boost.x > 256){
      var random_y = Phaser.Math.Between(0,272);
      boost.x = 0;
      boost.y = random_y;
    }
  }
  destroyEnemy(gameObject){
    gameObject.setTexture("boom");
    gameObject.play("boom_anim");
  }
  shoot(){
    var beam = new Beam(this);
  }
  update() {
    this.moveEnemy(this.ship1, 3);
    this.moveEnemy(this.ship2, 2);
    this.moveEnemy(this.ship3, 1);

    this.background.tilePositionY -= .5;
    this.movePlayer();

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
      this.shoot();
    }
    if (Phaser.Input.Keyboard.JustDown(this.bomb) && this.bombCount > 0){
      for (var i = 0; i <= this.enemies.getChildren().length; i++){
        let exploded = this.enemies.getChildren()[i];
        exploded.destroy();
      }
      this.bombCount -= 1;
    }

    for (var i = 0; i < this.projectiles.getChildren().length; i++){
      var beam = this.projectiles.getChildren()[i];
      beam.update;
    }

    if (this.enemies.getChildren().length === 0){
      this.moveBoss(this.mothership, 1);
    }

    if (this.boosts.getChildren().length <= 2){
      this.bombCount = 2;
    }
    if (this.boosts.getChildren().length === 0){
      this.buddyCount = 2;
    }
    
    if (!this.player.active){
      this.add.text(256/2 - 40, 272/2, "Game Over");
    }
  }

  }
