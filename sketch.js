var PLAY = 1;
var END = 0;
var gameState = PLAY;


var song1;

var b,bImage; 

var gameover,gameoverImage;

var ghost,ghostJumping,ghostStanding;
var door,doorImage,doorGroup;

var climber,climberImage,climberGroup;

var tower,towerImage;

var rand;

function preload(){
  
  song1 = loadSound("spooky.wav");
  
  bImage = loadImage("black.png");
  
  ghostJumping = loadAnimation("ghost-jumping.png");
  
  ghostStanding = loadAnimation("ghost-standing.png");
  
  climberImage = loadImage("climber.png");
  
  doorImage = loadImage("door.png");
  
  towerImage = loadImage("tower.png");
  
  
  gameoverImage = loadImage("gameover.png");
  
}

function setup() {
  createCanvas(400, 400);
  
  
  tower = createSprite(200,0,20,800);
  tower.addImage("tower",towerImage);
  tower.scale = 0.75;
  tower.y = tower.width/2;
  tower.velocityY = 2;
  
  ghost = createSprite(200,200,20,20);
  ghost.addAnimation("ghostStand",ghostStanding);
  ghost.addAnimation("ghost",ghostJumping);
  ghost.scale = 0.25;
  ghost.setCollider("circle",0,0,120);
  
  
  gameover = createSprite(200,200,20,20);
  gameover.addImage(gameoverImage);
  gameover.visible = false;
  
  doorGroup = new Group();
  climberGroup = new Group();
  
  
}

function draw() {
  background(220);
  
 drawSprites();
  if(gameState === PLAY){
    tower.velocityY = 2; 
  ghost.collide(climberGroup);
  console.log (ghost.depth);
   song1.play();
  gameover.visible = false;
  rand = Math.round(random(80,300));
  
  if (tower.y > 400){
    tower.y = tower.width/2;
  }
  if(keyDown("space")){
  ghost.velocityY = -4;
  ghost.changeAnimation("ghost",ghostJumping);
  }
  ghost.velocityY = ghost.velocityY+0.8; 
  ghost.velocityX = 0;
  if(keyDown("RIGHT_ARROW")){
  ghost.velocityX = 8; 
  ghost.changeAnimation("ghostStand",ghostStanding);
  }
  
  if(keyDown("LEFT_ARROW")){
  ghost.velocityX = -8; 
  ghost.changeAnimation("ghostStand",ghostStanding);
  }
  if(ghost.isTouching(doorGroup)|| ghost.y>400){
  gameState =END;
  }
  spawnDoor();
  spawnClimber();
  }
  else if(gameState === END){
    fill("white")
  text("Press on Gameover to restart",130,245)
  gameover.visible = true;
   doorGroup.setLifetimeEach(0);
   climberGroup.setLifetimeEach(0);
   tower.velocityY = 0;
    doorGroup.setVelocityYEach(0);
    climberGroup.setVelocityYEach(0);
    
    if(mousePressedOver(gameover)){
     gameState = PLAY;
    climberGroup.destroyEach();
    doorGroup.destroyEach();
    ghost.x = 200;
    ghost.y = 0;
   
    }
  }
  
  
}
function spawnClimber(){

if(frameCount%180===0){
  climber  = createSprite(200,50,20,20);
  climber.addImage(climberImage);
  //climber.debug =true;
  climber.setCollider("rectangle",0,-9,100,1);
  climber.x = rand;
  climber.velocityY =2;
  climber.lifetime = 190;
  climber.depth = ghost.depth;
  ghost.depth = ghost.depth + 1;
  
 // climber.debug = true;
  climberGroup.add(climber);
  
}
}

function spawnDoor(){
if(frameCount%180===0){
door = createSprite(200,0,20,20);
door.addImage(doorImage);
// door.debug = true;
door.setCollider("rectangle",0,60,50,1);
console.log (door.depth);
door.x = rand;
door.velocityY= 2;
doorGroup.add(door);
  door.depth = ghost.depth;
  ghost.depth = ghost.depth + 1;
doorGroup.setLifetimeEach(190)
}
}
