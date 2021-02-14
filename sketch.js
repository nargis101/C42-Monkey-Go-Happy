var backImage, bg;
var player, player_running;
var ground, ground_img;

var PLAY = 0;
var END = 1;
var gameState = PLAY;
var score = 0;

function preload() {
  bgImg = loadImage("images/bg.jpg");
  bg1Img = loadImage("images/bg1.jpg");
  bg2Img = loadImage("images/bg2.jpg");
  bg3Img = loadImage("images/bg3.jpg");
  bg4Img = loadImage("images/bg4.jpg");

  player_running = loadAnimation("images/monkey1.png", "images/monkey2.png", "images/monkey3.png",
    "images/monkey4.png", "images/monkey5.png", "images/monkey6.png", "images/monkey7.png", "images/monkey8.png",
    "images/monkey9.png", "images/monkey10.png");
  bananaImg = loadImage("images/banana.png");

  obstacleImg = loadImage("images/stone.png");
  gameOverImg = loadImage("images/gameOver.png");
  replayImg = loadImage("images/replay.png");
  goodJobImg = loadImage("images/goodJob.png");
  nextLevelImg = loadImage("images/nextLevel.png")
  squirrelImg = loadImage("images/squirrel.png")
  grapesImg = loadImage("images/grapes.png")
  breadImg = loadImage("images/bread.png")
  flowerImg = loadImage("images/flower.png")

  gameOverSound = loadSound("sounds/gameOver.wav")
  collectSound = loadSound("sounds/collect.wav");
  jumpSound = loadSound("sounds/jump.wav");

}

function setup() {
  createCanvas(800, 400);


  bg = createSprite(0, 70, 800, 400);
  bg.addImage("first", bgImg);
  bg.addImage("second", bg1Img);
  bg.addImage("third", bg2Img);
  bg.addImage("fourth", bg3Img);
  bg.addImage("fifth", bg4Img);
  bg.scale = 1.4;
  bg.velocityX = -4;
  bg.x = bg.width / 2;

  player = createSprite(100, 230, 20, 50);
  player.addAnimation("Running", player_running);
  player.scale = 0.12;

  ground = createSprite(400, 340, 800, 10);
  ground.visible = false;

  gameOver = createSprite(400, 200, 10, 10);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 1;
  gameOver.visible = false;

  gameOver1 = createSprite(400, 200, 10, 10);
  gameOver1.addImage(gameOverImg);
  gameOver1.scale = 1;
  gameOver1.visible = false;

  replay = createSprite(400, 270, 10, 10);
  replay.addImage(replayImg);
  replay.scale = 0.1;
  replay.visible = false;

  replay1 = createSprite(400, 270, 10, 10);
  replay1.addImage(replayImg);
  replay1.scale = 0.1;
  replay1.visible = false;

  goodJob = createSprite(400, 180, 10, 10);
  goodJob.addImage(goodJobImg);
  goodJob.scale = 1;
  goodJob.visible = false;

  nextLevel = createSprite(400, 270, 10, 10);
  nextLevel.addImage(nextLevelImg);
  nextLevel.scale = 0.35;
  nextLevel.visible = false;
  score = 0;

  foodGroup = new Group();
  obstacleGroup = new Group();
  squirrelGroup = new Group();
  grapesGroup = new Group();
  breadGroup = new Group();
  flowerGroup = new Group();

}

function draw() {
  background(0);

  //GAMESTATE PLAY
  if (gameState === PLAY) {
    
    spawnObstacles();
    

    textSize(10);
    fill(0);
    text("Level 1", 100, 100);


    player.velocityY = player.velocityY + 0.8;

    //moving background
    if (bg.x < 100) {
      bg.x = bg.width / 2;
    }

    //player jump
    if (player.collide(ground) && keyDown("space") && player.y > 50) {
      player.velocityY = -16.5;
      jumpSound.play();
      jumpSound.volume = 0.5;
    }

    //player is touching banana
    for (var i = 0; i < foodGroup.length; i++) {
      if (foodGroup[i].isTouching(player)) {
        foodGroup[i].destroy();
        score = score + 1;
        collectSound.play();
      }
    }

    //player is touching squirrel
    for (var m = 0; m < squirrelGroup.length; m++) {
      if (squirrelGroup[m].isTouching(player)) {
        squirrelGroup[m].destroy();
        score = score + 1;
        collectSound.play();
      }
    }

    //player is touching grape
    for (var n = 0; n < grapesGroup.length; n++) {
      if (grapesGroup[n].isTouching(player)) {
        grapesGroup[n].destroy();
        score = score + 1;
        collectSound.play();
      }
    }

    //player is touching bread
    for (var r = 0; r < breadGroup.length; r++) {
      if (breadGroup[r].isTouching(player)) {
        breadGroup[r].destroy();
        score = score + 1;
        collectSound.play();
      }
    }

    //player is touching grape
    for (var p = 0; p < flowerGroup.length; p++) {
      if (flowerGroup[p].isTouching(player)) {
        flowerGroup[p].destroy();
        score = score + 1;
        collectSound.play();
      }
    }

    //player is touching obstacle
    if (player.isTouching(obstacleGroup)) {
      //player.velocityY = -17;
      //jumpSound.play();
      gameState = END;
      gameOverSound.play();
    }

    if(score >= 0 && score <= 3 && gameState === PLAY){
      spawnFood();
    }

    if(score >= 4 && score <= 7 && gameState === PLAY){
      bg.changeImage("second", bg1Img);
      spawnSquirrels();
      foodGroup.destroyEach();
    }

    if(score >= 8 && score <= 11 && gameState === PLAY){
      bg.changeImage("third", bg2Img);
      spawnGrapes();
      squirrelGroup.destroyEach();
    }

    if(score >= 12 && score <= 15 && gameState === PLAY){
      bg.changeImage("fourth", bg3Img);
      spawnBread();
      grapesGroup.destroyEach();
    }

    if(score >= 16 && gameState === PLAY){
      bg.changeImage("fifth", bg4Img);
      spawnFlower();
      breadGroup.destroyEach();
    }

  } else if (gameState === END) {

    player.destroy()
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();
    squirrelGroup.destroyEach();
    grapesGroup.destroyEach();
    breadGroup.destroyEach();
    flowerGroup.destroyEach();
    bg.velocityX = 0;

    gameOver.visible = true;
    replay.visible = true;

    if (mouseIsOver(replay) && gameState === END) {
      replay.scale = 0.11;
    } else {
      replay.scale = 0.1
    }

    if (mousePressedOver(replay) && gameState === END) {
      reset();
    }
  }

  drawSprites();

  textSize(15);
  fill(255);
  text("Try and score 4 points each to get to the next levels!", 20, 30);
  text("Let's see how much you get!", 20, 50);

  textSize(20);
  stroke(255);
  strokeWeight(1);
  fill(255);
  text("Score: " + score, 680, 30);
  
}




function spawnFood() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(820, 250, 40, 10);
    banana.y = random(120, 180);
    banana.addImage(bananaImg);
    banana.scale = 0.07;
    banana.velocityX = -6;

    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 125 === 0) {
    var obstacle = createSprite(810, 308, 40, 10);
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.17;
    obstacle.velocityX = -(7 + score / 4);

    obstacle.lifetime = 300;

    obstacleGroup.add(obstacle);
  }
}

function spawnSquirrels(){
  if (frameCount % 80 === 0) {
    var squirrel = createSprite(810, 308, 40, 10);
    squirrel.y = random(120, 180);
    squirrel.addImage(squirrelImg);
    squirrel.scale = 0.07;
    squirrel.velocityX = -(6 + score / 4);

    squirrel.lifetime = 300;

    squirrelGroup.add(squirrel);
  }
}

function spawnGrapes(){
  if (frameCount % 80 === 0) {
    var grapes = createSprite(810, 308, 40, 10);
    grapes.y = random(120, 180);
    grapes.addImage(grapesImg);
    grapes.scale = 0.15;
    grapes.velocityX = -(6 + score / 4);

    grapes.lifetime = 300;

    grapesGroup.add(grapes);
  }
}

function spawnBread(){
  if (frameCount % 80 === 0) {
    var bread = createSprite(810, 308, 40, 10);
    bread.y = random(120, 180);
    bread.addImage(breadImg);
    bread.scale = 0.125;
    bread.velocityX = -(6 + score / 4);

    bread.lifetime = 300;

    breadGroup.add(bread);
  }
}

function spawnFlower(){
  if (frameCount % 80 === 0) {
    var flower = createSprite(810, 308, 40, 10);
    flower.y = random(120, 180);
    flower.addImage(flowerImg);
    flower.scale = 0.1;
    flower.velocityX = -(6 + score /4);

    flower.lifetime = 300;

    flowerGroup.add(flower);
  }
}


function reset() {
  gameOver.visible = false
  replay.visible = false
  bg.changeImage("first", bgImg);

  bg.velocityX = -4;
  if (bg.x < 50) {
    bg.x = bg.width / 2;
  }

  score = 0;
  gameState = PLAY;

  player = createSprite(100, 230, 20, 50);
  player.addAnimation("Running", player_running);
  player.scale = 0.12;
}