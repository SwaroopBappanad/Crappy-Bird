function setup(){
  createCanvas(500, 500);
  pipeX = random(100, 200);
  pipe_len = random(50, 300);  
}
let playing = true;
flying = false;
let points = 0;
let impulse = true;
var offset = 70;
let newPipe = false;
let turn = 1;

//Dedicated to Loony Tunes
class Tweety{
  constructor() {
    this.birdX = 30;
    this.birdY = 230;
    this.diam = 30;
    this.com = 5;
    this.collided = false;
  }

  gravity() {
   if (this.birdY <= 500 && this.birdY >= 0){
    this.birdY += 3;
   }

   else{
     playing = false;
     loseScreen();
   }
  }

  fly() {
    this.birdY -= 60;
    pipeX += .50;
   }
  //So pipes can spawn in front of tweety
  getCoords(){
    return this.birdX;
    console.log(this.birdX);
  } 

  animate() {
    fill(255, 255, 0);
    ellipse(this.birdX, this.birdY, this.diam);
  }

  checkCollision(){
  /*
  y: (pipe_len + offset); 
  h: 500-(pipe_len+offset);
  */
  if (this.birdX >= (pipeX - 10) && this.birdX <= (pipeX + 10)){
    if (this.birdY < (pipe_len) || this.birdY > (pipe_len+offset)) { 
      this.collided = true;
      playing = false;
      console.log("you lose!");
      loseScreen();
  }
   else if (this.birdX >= (pipeX - 5) && this.birdX <= (pipeX + 5) && !this.collided) {
      points += 1;
      impulse = false;
      turn += 1;
      newPipe = true;
      console.log(pipe_len)
    }
  }

}
}


whaffwey = new Tweety();



function draw(){
 if (playing){      
  background(0, 255, 255);
  whaffwey.animate();
  fill(0, 255, 0);
  text("Points: "+points, 250, 20);
  if (!flying) whaffwey.gravity();
  if (turn != 1){    
    if (newPipe){ reroll(); } 
    genPipes2();
    }
  if (!newPipe && turn == 1) genPipes1();
  }
}

function keyTyped(){
  if (key == ' ') {
    flying = true;
    whaffwey.fly();
    setTimeout(function(){ flying = false; }, 50);
  }
}
//Needs work 
function loseScreen(){
  if (!playing){
    background(255, 0, 0); 
    
  }
}
   
function reroll(){
  x = whaffwey.getCoords();
  pipeX = x + random(0, 400);
  pipe_len = random(0, 200);
}

function genPipes2(){
  newPipe = false;

  fill(0, 100, 0);
  rect(pipeX, 0, 40, pipe_len);
  //Self-correcting algorithm so pipes don't intersect
  rect(pipeX, (pipe_len + offset), 40, 500-(pipe_len+offset));

  moveDemPipes();
}

function genPipes1(){
  fill(0, 100, 0);
  rect(pipeX, 0, 40, pipe_len);
  //Self-correcting algorithm so pipes don't intersect
  rect(pipeX, (pipe_len + offset), 40, 500-(pipe_len+offset));
  moveDemPipes();
}

function moveDemPipes(){
  --pipeX;  
  whaffwey.checkCollision();
} 
