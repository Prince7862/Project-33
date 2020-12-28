const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
 
var plinkos = [];
var divisions = [];
var particle;
var turn = 0;
var gameState = "start";
var divisionHeight = 300;
var score = 0;

function setup() {
  var canvas = createCanvas(890, 796);
  engine = Engine.create();
  world = engine.world;

   for (var k = 0; k <=width; k = k + 80){
     divisions.push(new Division(k, height-divisionHeight/2, 10, divisionHeight));
   }
    for (var j = 75; j <=width; j=j+50){
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50){
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50){
       plinkos.push(new Plinko(j,275));
    }
     for (var j = 50; j <=width-10; j=j+50){
       plinkos.push(new Plinko(j,375));
    }
}
 


function draw() {
  background(0);
  textSize(20);
  text("Score : "+ score ,20,30);
  Engine.update(engine);
 
  if(particle != null){
    particle.display();

    if(particle.body.position.y>760){
      if(particle.body.position.x<300){
        score=score+500;
        particle = null;
        if (turn >= 5) gameState = "end";
      }
      else if(particle.body.position.x>300 && particle.body.position.x<600){
        score = score + 300;
        particle = null;
        if (turn >= 5) gameState = "end";
      }
      else if(particle.body.position.x>600 && particle.body.position.x<900){
        score = score + 200;
        particle = null;
        if (turn >= 5) gameState = "end";
      }
    }
  }
    
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }

   for(var a = 20; a<300; a=a+80){
     text("500",a,520);
   }
 
   for(var a = 340; a<600; a=a+80){
    text("300",a,520);
  }

  for(var a = 660; a<900; a=a+80){
    text("200",a,520);
  }
  
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }
   if(gameState == "end"){
     text("GameOver",445,398);
     textSize(150)
   }
}

function mousePressed(){
  if(gameState != "end"){
    turn++;
    particle=new Particle(mouseX,10,10)
  }
}