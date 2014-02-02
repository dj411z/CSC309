// --------------------------------------------------
// --------------------------------------------------
//  Classes 
// --------------------------------------------------
// --------------------------------------------------


//Game class
function Game() {

  this.lives = 3;

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

welcomeState.prototype.draw = function(context){
  var img = new Image();
    
  img.onload = function () {
    context.drawImage(img, -50, -10);
  }
  
  img.src = "images/start.jpg"; // get the image from this URL
  /*
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "blue";
  context.font = "bold 40px Arial";
  context.fillText("Welcome", 200, 250);
  */
    
}

function gameoverState(canvas){
  this.gameovermsg = "Game over";
}

gameoverState.prototype.draw = function(context){

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "blue";
  context.font = "bold 40px Arial";
  context.fillText("Game over!", 200, 250);
    
}

function playState(canvas){
  this.level = level;
  this.lives = lives;

  this.ship = null;
  this.aliens = null;
  this.lasers = null;
  this.bombs = null;
}

playState.prototype.draw = function(context){
  context.clearRect(0, 0, canvas.width, canvas.height);
  /*context.fillStyle = "blue";
  context.font = "bold 40px Arial";
  context.fillText("Play State!", 200, 250);
  */
  this.ship = new ship(0, 0);
  this.ship.prototype.draw(context);
  //var invaders = [];

}

playState.prototype.fireLaser = function(){
  this.lasers.push(new Laser(this.ship.x, this.ship.y - 10, 10 /*speed*/));
}

function ship(canvas, x, y){
  this.context = canvas.getContext("2d");
  this.x = x;
  this.y = y;
}

ship.prototype.draw = function(context){
  var ship_img = new Image();
    
  ship_img.onload = function () {
    context.drawImage(ship_img, 100, 50);
  }
  
  ship_img.src = "images/alien.png"; // get the image from this URL
}

function checkShipAction(e) {
    var event = window.event ? window.event : e;
    console.log(event.keyCode);
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext("2d");

    ship.prototype.Shipaction(event.keyCode);
}

ship.prototype.Shipaction = function(actionKey){
  //move left
  if(actionKey == 37){
    this.ship.x -= 1;
  }

  //move right
  if(actionkey == 39){
    this.ship.x += 1;
  }

  if(actionkey == 32){
    this.fireLaser();
  }

  //keep ship in game bounds
  if(this.ship.x < game.gameBounds.left) {
      this.ship.x = game.gameBounds.left;
  }
  if(this.ship.x > game.gameBounds.right) {
      this.ship.x = game.gameBounds.right;
  }
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

  this.drawAliens = function () {

    var image = new Image();
    //draw aliens every period of time
    //window.setInterval("drawAliens()", 100)
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
  context = canvas.getContext("2d");
  
  welcomeState.prototype.draw(context);

  document.onkeydown = checkNewGame;
    
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


function checkNewGame(e) {
    var event = window.event ? window.event : e;
    console.log(event.keyCode);
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext("2d");

    if (event.keyCode == 13) {
        playState.prototype.draw(context);
    }
}
