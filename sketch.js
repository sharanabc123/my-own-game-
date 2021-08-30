var bg,bgImg;
var player, shooterImg;
var meteorite,meteoriteImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var meteoriteGroup;

var bullets = 70,bulletImg;

var gameState = "fight"

var count=0;
var score=0;

var restart,loadAgain;
var boom,boomImg;
function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/rocket.png")
  
  restart=loadImage("assets/restart.jpg")

  meteoriteImg = loadImage("assets/meteorite.png")

 boomImg=loadImage("assets/boom.png")

bulletImg=loadImage("assets/lazer.png")

  bgImg = loadImage("assets/space1.jpg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  
 

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
 bg.addImage(bgImg)
 bg.scale = 6
 bg.velocityY=4
 
  
  
 
//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
  // player.debug = true
   player.setCollider("rectangle",0,0,300,500)

   

   //creating sprites to depict lives remaining
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   
    loadAgain=createSprite(450,500)
  loadAgain.addImage(restart)
  loadAgain.scale=0.18
   loadAgain.visible=false

    //creating groups for zombies and bullets
    bulletGroup = new Group()
    meteoriteGroup = new Group()

   

}

function draw() {
 
  background(0); 
  if(bg.y>900){
    bg.y=displayHeight/2
  }

  boom = createSprite(player.x+30,player.y+70,50,50);
   boom.addImage(boomImg);
   boom.scale=0.3;
   boom.depth=boom.depth+5
   boom.visible=false;


if(gameState === "fight"){
  
 


 
 

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("LEFT_ARROW")||touches.length>0){
  player.x= player.x-30
}
if(keyDown("RIGHT_ARROW")||touches.length>0){
 player.x = player.x+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bullet = createSprite(player.x,displayHeight-270,10,20)
  bullet.addImage(bulletImg)
  bullet.scale=0.20
  bullet.velocityY= -20
  bullet.setCollider("rectangle",0,0,20,520);
 // bullet.debug=true
  bulletGroup.add(bullet)

  player.depth = bullet.depth
  player.depth = player.depth+2
  
  //bullets = bullets-1
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

//go to gameState "bullet" when player runs out of bullets
// if(bullets==0){
//   gameState = "bullet"
    
// }

//destroy the zombie when bullet touches it
if(meteoriteGroup.isTouching(bulletGroup)){
  for(var i=0;i<meteoriteGroup.length;i++){     
      
   if(meteoriteGroup[i].isTouching(bulletGroup)){
    meteoriteGroup[i].destroy()
        bulletGroup.destroyEach()
       score++;
        } 
  
  }
}

//destroy zombie when player touches it
if(meteoriteGroup.isTouching(player)){

 for(var i=0;i<meteoriteGroup.length;i++){     
      
  if(meteoriteGroup[i].isTouching(player)){
    meteoriteGroup[i].destroy()
       count++;
       boom.x=player.x
       boom.lifetime=10
       boom.visible=true;
       } 
 
 }
}



if(count===1){
  heart1.visible=false
  heart2.visible = true
  heart3.visible = false
}

if(count===2){
  heart1.visible=true
  heart2.visible = false
  heart3.visible = false
}

if(count===3){
  heart1.visible=false
  heart2.visible = false
  heart3.visible = false
}

if(count===4){
  heart1.visible=false
  heart2.visible = false
  heart3.visible = false
  gameState="lost";
}

if(score===10){
  gameState="won"
}

//calling the function to spawn zombies
enemy();
}

drawSprites();

if(mousePressedOver(loadAgain)) {
   
  reset();
   
}  

textSize(40)
fill("white")
text("Score = " + score,100,100)


//destroy zombie and player and display a message in gameState "lost"
if(gameState == "lost"){
  
  textSize(100)
  fill("red")
  text("You Lost ",400,400)
  meteoriteGroup.destroyEach();
  //player.changeImage()
  count=0;
  loadAgain.visible=true
}

//destroy zombie and player and display a message in gameState "won"
else if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("You Won ",400,400)
  meteoriteGroup.destroyEach();
  
score=0;
loadAgain.visible=true
}

//destroy zombie, player and bullets and display a message in gameState "bullet"
// else if(gameState == "bullet"){
 
//   textSize(50)
//   fill("yellow")
//   text("You ran out of bullets!!!",470,410)
//   zombieGroup.destroyEach();
//   player.destroy();
//   bulletGroup.destroyEach();

// }

}


//creating function to spawn zombies
function enemy(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    meteorite = createSprite(random(100,displayHeight),random(100,500),40,40)

    meteorite.addImage(meteoriteImg)
    meteorite.scale = 0.30
    meteorite.velocityY = +3
    //meteorite.debug= true
   meteorite.setCollider("circle",0,0,150);
   
   meteorite.lifetime = 400
   meteoriteGroup.add(meteorite)
  }

}



function reset(){

loadAgain.visible = false
score=0;
count=0;
//player.addImage(shooterImg)
gameState="fight" 

  }