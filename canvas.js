var canvas = document.querySelector('canvas');
var scoreDisplay = document.getElementById('score');

var score = 0;

window.onload = showCanvas;
window.onresize = showCanvas;

var x = 0;
var y = 0;

function showCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  x = window.innerWidth/2;
  y = window.innerHeight/2;
}

var c = canvas.getContext('2d');


function Object(x, y, radius, color){
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;

  this.update = function(){
    this.draw();
  }
  this.draw = function(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }
}

function getDistance(x1, y1, x2, y2){
  var xDistance = x2 - x1;
  var yDistance = y2 - y1;

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

// c.fillStyle = 'red';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'blue';
// c.fillRect(300, 400, 100, 100);
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.strokeStyle = 'green';
// c.stroke();

// for (var i = 0; i < 80; i++){
//   var x = Math.random() * window.innerWidth;
//   var y = Math.random() * window.innerHeight;
//   c.beginPath();
//   c.strokeStyle = 'orange';
//   c.arc(x, y, 30, 0, Math.PI*2, true);
//   c.stroke();
// }
var leftOn = false;
var rightOn = false;


window.addEventListener('keydown', function checkKeyDown(e){
  if(e.key === 'ArrowLeft' || e.key === 'a'){
    leftOn = true;
  }
  if(e.key === 'ArrowRight' || e.key === 'd'){
  rightOn = true;
  }
});

window.addEventListener('keyup', function checkKeyUp(e){
  if(e.key === 'ArrowLeft' || e.key === 'a'){
    leftOn = false;
  }
  if(e.key === 'ArrowRight' || e.key === 'd'){
  rightOn = false;
  }
});

var numBalls = 3;
var gromp;
// var grompWidth;
// var grompHeight;
var player;
var ball;
var isEaten;
function init(){
  scoreDisplay.innerHTML = score;
  gromp = new Image();
  gromp.src = 'http://www.pngall.com/wp-content/uploads/2016/06/Goat-PNG-Clipart.png';
  // gromp.onload = function(){
  //   grompWidth = this.width;
  //   grompHeight = this.height;
  //   console(this.width);
  // }
  player = new Object(window.innerWidth/2 , window.innerHeight - 180, 80, 'transparent');
  ball = new Object(Math.random()*window.innerWidth, 40, 20, 'green');
  isEaten = false;
}

function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);


  if(leftOn){
    player.x-=8;
  }
  if(rightOn){
    player.x+=8;
  }
  ball.y+=3;

  if(getDistance(player.x, player.y, ball.x, ball.y) < player.radius + ball.radius){
    //delete ball
    ball = null;
    //create new ball
    ball = new Object(Math.random()*window.innerWidth, 40, 20, 'green');
    scoreDisplay.innerHTML = score+=1;
  }

  if(ball.y >= window.innerHeight){
    //delete ball
    ball = null;
    //create new ball
    ball = new Object(Math.random()*window.innerWidth, 40, 20, 'green');
  }
  // c.drawImage(img,25,25);
  gromp.onload = function(){
    console.log(this.height);
  }
  c.drawImage(gromp, player.x - 455/2, player.y - 355/2);

  ball.update();
  player.update();
}


init();
animate();
