import Phaser, { Physics } from "phaser";
import './style.css';
import dudeImg from "./assets/sprite_nino.png";
import dudeImg2 from "./assets/estrella.png";


const config = {
  type: Phaser.AUTO,
  width: 800, height: 600,
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
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
  this.load.spritesheet('dude', dudeImg, { 
    frameWidth: 122, frameHeight: 150
  });

  this.load.spritesheet('star', dudeImg2, { 
    frameWidth: 150, frameHeight: 233
  });
}

function create() {
  player = this.physics.add.sprite(100, 600, 'dude');
  player.setCollideWorldBounds(true);

  
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 4 }),
    frameRate: 10,
    repeat: -1
  });

  stars = this.physics.add.group({
    key: 'star',
    repeat: 5,
    setXY: { x: 300, y: 0, stepX: 90 }
  });

  stars.children.iterate((child) => {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.6));
    child.setCollideWorldBounds(true);
    child.setScale(0.6);
  });

  scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#ffffff' });
  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.overlap(stars, player, collect, null, this);
}

function update() {
  if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('right', true);
  } else if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('right', true);
  } else {
    player.setVelocityX(-0);
  };
  
  if (cursors.up.isDown && (player.body.touching.down || player.body.blocked.down))  {
    player.setVelocityY(-330);
  }
};

function collect (player, star) {
  star.disableBody(true, true);
  score += 11.166666666666666666666666666666666666667;
  scoreText.setText('Score: ' + score);
}



const game = new Phaser.Game(config);