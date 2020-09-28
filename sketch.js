//declaring the variables
var forestImage, forest;
var monkey, monkey_running;
var ground,ground_img;

var bananaGroup, bananaImage;
var obstaclesGroup, obstacleimg;

var gameOver, gameoverimg;
var restart, restartimg;
var score;
var PLAY= 101010;
var END= 10101010;
var gameState= 101010;
var Iscore;
var sound1, sound2; 

//function preload
function preload(){

  // forest image
  forestimg=loadImage("forest.jpg");
  
  //monkey running
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  //objects image
  bananaImage = loadImage("banana.png");
  obstacleimg = loadImage("stone.png"); 
  gameoverimg= loadImage("gameOver.png");
  restartimg= loadImage("restart.png");
  
 
}


function setup() {
  createCanvas(600, 200);
  
  //forest sprite
 forest= createSprite(300,0,600,200);
  forest.addImage(forestimg); 

  forest.x= forest.width/2;
  
  //monkey sprite
  monkey = createSprite(50,195,20,50);
  monkey.addAnimation("Running", monkey_running);
  monkey.scale = 0.1;
  
  //ground sprite
  ground = createSprite(200,200,400,10);
  ground.visible=false;
  
  //groups
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  //score and inner score
  score = 0;
 Iscore=0;
  
  // restart and gameover
  gameOver = createSprite(300,90);
    restart = createSprite(300,120);
    gameOver.addImage(gameoverimg);
    gameOver.scale = 0.5
    restart.addImage(restartimg);
    restart.scale = 0.5;
  
}
  
//function draw
function draw() {
  
  background(255);
 
  if(gameState===101010){
  
      restart.visible=false;
    gameOver.visible= false; 
    
    // infinite forest
  if(forest.x<=100){
    forest.x= forest.width/2;
  }
  
    //backward veocity for forest
     forest.velocityX=-5;
  
  //score system and monkey resize system
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: monkey.scale=0.1 ;
                break;
        case 20: monkey.scale=0.11;
                break;
        case 30: monkey.scale=0.11;
                break;
        case 40: monkey.scale=0.11;
                break;
        default: break;
    }
  
  // jump controls
     if(keyDown("space") && monkey.y>= 161) {
   monkey.velocityY = -10;
  
  }
 
  //resizing
    if(obstaclesGroup.isTouching(monkey)){ 
        monkey.scale=0.08;
      score= 0;
      Iscore= Iscore + 1; 
    }
    
    
   //gamestate transiton
    if(Iscore===25){ 
       gameState= 10101010;
     
    }
     
    spawnbanana();
    spawnObstacles(); 
  }
   
  // gravity
  monkey.velocityY = monkey.velocityY + 0.6;
  
  //monkey place
  monkey.collide(ground);
  
  //gamestate end
   if(gameState===10101010){
  
     gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    forest.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }

  //reset
  if(mousePressedOver(restart)) {
    reset();
  }
  
  drawSprites();
  
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}

//spawn bananas
function spawnbanana() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,20,10);
    banana.y = random(120,150);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -7;
     //assign lifetime to the variable
    banana.lifetime = 150;
    monkey.depth = banana.depth + 1;
    
    //add each banana to the group
    bananaGroup.add(banana);
  }
}

// spawn obstacles and properties
function spawnObstacles() {
  if(frameCount % 80 === 0) {
    var obstacle = createSprite(600,184,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleimg);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.1;
    obstacle.lifetime = 150;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

//function reset
function reset(){
  gameState = 101010;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  bananaGroup.destroyEach();
  
    // infinite forest
  if(forest.x<100){
    forest.x= forest.width/2;
  }
  
  score = 0;
  Iscore = 0;
}
