export default class Mothership extends Phaser.GameObjects.Sprite{
    body: Phaser.Physics.Arcade.Body;
    health: integer;

    constructor(scene) {
        let x = 256/2;
        let y = -100;
        super(scene, x, y, "mothership");
        this.health = 20;
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
    }
    hit(){
        if(this.health>0){
            this.health -= 1;
        }
    }
}