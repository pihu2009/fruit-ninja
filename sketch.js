
var play=1
var end=0
var gameState=play
var knife
var fruit 
var monster
var fruitGroup
var monsterGroup 
var score
var r
var randomFruit 
var position
var knifeImage  
var fruit1,fruit2,fruit3,fruit4
var monsterImage,gameOverImage
var gameOverSound,knifeSwooshSound

function preload()
{
  knifeImage= loadImage("knife.png");
  monsterImage= loadAnimation("alien1.png","alien2.png")
  fruit1= loadImage("fruit1.png");
  fruit2= loadImage("fruit2.png");
  fruit3= loadImage("fruit3.png");
  fruit4= loadImage("fruit4.png");
  gameOverImage= loadImage("gameover.png")
  gameOverSound= loadSound("gameover.mp3")
  knifeSwooshSound= loadSound("knifeSwoosh.mp3")
}

function setup() 
{
  createCanvas(windowWidth,windowHeight)
  
  knife=createSprite(windowWidth/2,windowHeight/2,20,20);
  knife.addImage(knifeImage);
  knife.scale=0.7
  
  knife.setCollider("rectangle",0,0,40,40);
  score=0;
  
  fruitGroup=createGroup()
  monsterGroup = new Group ()  

  gameover=createSprite(windowWidth/2,windowHeight/2,30,30)
  gameover.addImage(gameOverImage);
  gameover.scale=2
}

function draw() 
{
  background("lightblue");
  
  if(gameState===play)
  {
    
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
   
    gameover.visible=false
   
    fruits();
    Monster();

    if(knife.isTouching(fruitGroup))
    {
      fruitGroup.destroyEach()
      knifeSwooshSound.play()
      score=score+2;
    }
     
    if(knife.isTouching(monsterGroup))
    {
     
      gameOverSound.play()
      gameState=end;
    
    }
  
  }
  else if(gameState===end)
  {
    
      //  console.log("end")
      gameover.visible=true 
     
      //gameOverSound.play()
      
      knife.destroy()

      fruitd()
      monsterd()
    
    
    

  }
  
  
  drawSprites();
  //Display score
  textSize(40);
  text("Score : "+ score,windowWidth-200,windowHeight/5.5);
}  
  
function Monster()
{
  if(World.frameCount%200===0)
  {
    monster=createSprite(windowWidth,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(windowHeight,windowHeight/6));
    monster.velocityX=-(8+score/10);
    monster.lifetime=windowWidth;
    
    
    monsterGroup.add(monster);
  }
}

function fruits()
{
  if(World.frameCount%80===0)
  {
    position = Math.round(random(1,2));
    fruit=createSprite(windowWidth,300,20,20);
   
    if(position==1)
       {
         fruit.x=windowWidth;
         fruit.velocityX=-(7+(score/4));
       }
  else if(position==2)
       {
         fruit.x=0;
         fruit.velocityX=(7+(score/4));
       }
        fruit.scale=0.2;
     
      r=Math.round(random(1,4));
      switch(r)
      {
        case 1 : fruit.addImage(fruit1)
                 break;
        case 2 : fruit.addImage(fruit2)
                 break;  
        case 3 : fruit.addImage(fruit3)
                 break; 
        case 4 : fruit.addImage(fruit4)
                 break;
        
        default:break;
      }

    fruit.y=Math.round(random(windowHeight,windowHeight/6));
    fruit.lifetime=windowWidth;
    fruitGroup.add(fruit);
  }
}

function fruitd()
{
  fruitGroup.setVelocityXEach(0)
  //fruitGroup.setLifetimeEach(-1)
  fruitGroup.destroyEach()
}

function monsterd()
{
  monsterGroup.setVelocityXEach(0)
 // monsterGroup.setLifetimeEach(-1)
  monsterGroup.destroyEach()
}








































































































































