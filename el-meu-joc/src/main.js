import Phaser, { Physics } from "phaser";
import './style.css';
import dudeImg1 from "./assets/gemini1.png"
import dudeImg2 from "./assets/gemini2.png"


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



function preload() {
  this.load.spritesheet('dude1', 'dudeImg1', { frameWidth: 32, frameHeight: 48 });
}

function create() {
  this.add.image(400, 300, 'dude1');

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  let cursors = this.input.keyboard
    .createCursorKeys();

    this.physics
  .add.collider(player, platforms);

this.physics.add
  .overlap(player,
    stars,
    collect,
    null,
    this
  );

stars = this.physics.add.group({
  key: 'star',
  repeat: 11,
  setXY: { x: 12, y: 0, stepX: 70 }
});

stars.children.iterate((child) => {
  child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
});

let scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000000' });

function collect (player, star) {
  star.disableBody(true, true);
  score += 10;
  scoreText.setText('Score: ' + score);
}
}

function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('left', true);
  };
  if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('right', true);
  };
  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  };
};

const game = new Phaser.Game(config);