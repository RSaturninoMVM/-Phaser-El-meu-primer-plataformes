import Phaser, { Physics } from "phaser";
import './style.css';
import dudeImg from "./assets/sprite_nino.png";
//import dudeImg2 from "";


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
    update: update,
  }
};

var player;
var stars;
var cursors;
var score = 0;
var scoreText;

function preload() {
  this.load.spritesheet('dude', 'dudeImg', { 
    frameWidth: 32, frameHeight: 48 });
}

function create() {
  player = this.physics.add.sprite(100, 600, 'dude');
  player.setCollideWorldBounds(true);
  stars = this.physics.add.sprite(500, 600, 'dude');
  stars.setCollideWorldBounds(true);
  cursors = this.input.keyboard.createCursorKeys();

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 4 }),
    frameRate: 10,
    repeat: -1
  });

  stars = this.physics.add.group({
    key: 'star',
    repeat: 5,
    setXY: { x: 200, y: 0, stepX: 70 }
  });

  stars.children.iterate((child) => {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  let scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#ffffff' });
}

  function collect (player, star) {
    player.disableBody(true, true);
    star.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
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
    player.anims.play('up', true);
  };
};


const game = new Phaser.Game(config);