 
var trex ,trex_running, ground, ground_img, invisible_ground, cloud, cloud_img, still_trex, ob1;
var ob2, ob3, ob4, ob5, ob6, obstacle, score = 0;
var play = 1, end = 0;
var gameState = play;
var obstaclesGroup, cloudsGroup;


function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  ground_img = loadImage("ground2.png");
  cloud_img = loadImage("cloud.png");
  still_trex = loadImage("trex1.png");
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
}

function setup(){
  createCanvas(600,200)
  
  //create a trex sprite
 trex = createSprite(50,150,40,40)
 trex.addAnimation("running", trex_running);
 trex.addAnimation("still", still_trex);
 trex.scale = 0.5;

 //create a ground sprite
 ground = createSprite(300,180,600,20);
 ground.addImage(ground_img);

 //invisible ground
 invisible_ground = createSprite(300,190,600,10);
 invisible_ground.visible = false;

 //creating the groups
 obstcalesGroup = createGroup();
 cloudsGroup = createGroup();

}

function draw(){
  background("white")

if (gameState === play)
{
  //Movement of ground
  ground.velocityX = -5;

  //Infinite ground
  if (ground.x < 0)
  { 
    ground.x = ground.width / 2;
  }

  //Jumping the trex
  if (keyDown("space") && trex.y >= 155) 
  {   
   trex.velocityY = -11 
   trex.changeAnimation("still");
  } 
  
  //Moving the trex and changing it's animation
  trex.velocityY = trex.velocityY + 0.9;
  if (trex.y > 161.5)
  {
    trex.changeAnimation("running");
  }

  //Scoring
  score = score + Math.round(frameCount / 60);

  //Calling the function spawnCloud to display
  spawnClouds();

  //Calling function for obstacle 1
  spawnObstacles();

  //Condition if the obstacles are touching the trex or not
  if (obstaclesGroup.isTouching(trex))
 {
  gameState = end;
 }

}

else if (gameState === end)
{
  //stopping the movement of the ground
  ground.velocityX = 0;
 
  
}
 
  
 

  //displaying score as a text
  text("Score " +score, 540, 10);
 
  //colliding trex with the invisible ground
  trex.collide(invisible_ground);


  //displaying trex y position on the console
  //console.log(trex.y);

  //displaying any error
  //console.error("This is how an error appears");

  //displaying warning
  //console.warn("This is how a warning appears");

  //more info
  //console.info("Press space to start and see if you can make it to the end");


  drawSprites()
}


//declaring cloud variable
function spawnClouds()
{
  if (frameCount % 60 === 0)
  {
    cloud = createSprite(590, 50, 50, 50);
    cloud.velocityX = -3;
    cloud.addImage(cloud_img);
    cloud.scale = 0.55;
    cloud.y = Math.round(random(10, 100));
    console.log(trex.depth);
    console.log(cloud.depth);
    cloud.depth = trex.depth - 1;
    cloud.lifetime = 205
    cloudsGroup.add(cloud)
  }
}

function spawnObstacles()
{
  if (frameCount % 80 === 0)
  {
    obstacle = createSprite(600, 165, 10, 40);
    obstacle.velocityX = -6;

  var num1 = Math.round(random(1,6));
  switch(num1){
     case 1 : obstacle.addImage(ob1);
              break;
     
     case 2 : obstacle.addImage(ob2);
              break;

     case 3 : obstacle.addImage(ob3);
              break;

     case 4 : obstacle.addImage(ob4);
              break;

     case 5 : obstacle.addImage(ob5);
              break;

     case 6 : obstacle.addImage(ob6);
              break;
     
     default: break;
       
  }
  obstacle.scale = 0.4;
  obstacle.lifetime = 107;
  obstaclesGroup.add(obstacle);

  }

}