import Phaser, { Physics } from "phaser";
import './style.css';
// import dudeImg from "assets/Sprite.jpeg"

class EscenaProva extends Phaser.Scene {
  constructor() { super({ key: 'EscenaProva' }); }

  create() {
    this.add.text(400, 300, 'PHASER ESTA VIU!!!', {
      fontSize: '40px', color: '#00ff00', fontStyle: 'bold'
    }).setOrigin(0.5);
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800, height: 600,
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

let cursors = this.input.keyboard
  .createCursorKeys();

if (cursors.left.isDown) {
  player.setVelocityX(-160);
  player.anims.play('left', true);
}

if (cursors.up.isDown
  && player.body.touching.down) {
  player.setVelocityY(-330);
}

this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });

this.anims.create({
  key: 'left',
  frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
  frameRate: 10,
  repeat: -1
});