// --------------------------------------------------
// --------------------------------------------------
//  Classes 
// --------------------------------------------------
// --------------------------------------------------


//Game class
function Game() {

  this.lives = 3;
  //stack of states for game
  this.states = [];

  //width and height
  this.width = 0;
  this.height = 0;

  //keep track of area for game
  this.gameScreen = {left: 0, right: 0, top: 0, bottom: 0};

  //game canvas to render to
  this.gameCanvas = null;
}

Game.prototype.initGame = function(gameCanvas){
  this.gameCanvas = gameCanvas;
  this.width = gameCanvas.width;
  this.height = gameCanvas.height;

  //set game bounds?

}

//initial welcome state

function welcomeState(canvas){
  this.welcomemsg = "Welcome to Space Invaders";
}

//pause state

function pauseState(canvas){
  this.pausemsg = "Paused";
}

function gameoverState(canvas){
  this.gameovermsg = "Game over";
}

function playState(canvas){
  this.level = level;
  this.lives = lives;

  this.ship = null;
  this.aliens = null;
  this.lasers = null;
  this.bombs = null;
}

function Ship(canvas, x, y){
  this.context = canvas.getContext("2d");
  this.x = x;
  this.y = y;
}

function Laser(canvas, x, y, speed){
  this.context = canvas.getContext("2d");
  this.x = x;
  this.y = y;
  this.speed = speed;
}

function Bomb(canvas, x, y, speed){
  this.context = canvas.getContext("2d");
  this.x = x;
  this.y = y;
  this.speed = speed;
}

// This function stores the details for a single alien
function Alien(canvas, x, y){
  this.context = canvas.getContext("2d");
  this.x = x;
  this.y = y;

  //store whether it is first or not (can drop bombs)
  this.front = false;

  this.draw = function () {

    var image = new Image();

    image.onload = function() {
      context.drawImage(image, this.x, this.y);
    }
    image.src = "images/alien.png";

  }

}

// --------------------------------------------------
// --------------------------------------------------
//  onLoad calls
// --------------------------------------------------
// --------------------------------------------------

var aliens = []; //aliens array holds alien objects

var canvas;
var context;

window.onload = function() {
  canvas = document.getElementById("myCanvas");
  document.onkeydown = checkKey;
  context = canvas.getContext("2d");
  
  var img = new Image();
    
  img.onload = function () {
    context.drawImage(img, -50, -10);
  }
  
  img.src = "images/start.jpg"; // get the image from this URL    
}

// --------------------------------------------------
// --------------------------------------------------
//  Different States Functions 
// --------------------------------------------------
// --------------------------------------------------

//Clears canvas and aliens array and starts a new game
function newGame(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  aliens = [];
  x = 100;
  y = 100;
  for(var i=0; i<6; i++){
    var alien = new Alien(canvas, x, y);
    aliens.push(alien);
    x += 40;
  }

  drawAliens();

}

function pauseGame(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "blue";
  context.font = "bold 40px Arial";
  context.fillText("Pause", 200, 250);

  //press p again to unpause
}

// --------------------------------------------------
// --------------------------------------------------
// Helper Functions
// --------------------------------------------------
// --------------------------------------------------

//Draws alien objects inside aliens array
function drawAliens(){
  for(var i=0; i<aliens.length; i++){
    aliens[i].draw();
  }
}

function checkKey(e) {
    var event = window.event ? window.event : e;
    console.log(event.keyCode);
    if (event.keyCode == 13) {
        newGame();
    }
    else if (event.keyCode == 80){
        pauseGame();
    }
    else if (event.keyCode == 81){
        quitGame();
    }
}