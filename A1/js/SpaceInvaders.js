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

function WelcomeState(canvas){
  this.context = canvas.getContext("2d");
  this.welcomemsg = "Welcome to Space Invaders";
}

WelcomeState.prototype.draw = function(){

  var img = new Image();
    
  img.onload = function () {
    context.drawImage(img, -50, -10);
  }
  
  img.src = "images/start.jpg"; // get the image from this URL
    
}

function GameoverState(canvas){
  this.context = canvas.getContext("2d");
  this.gameovermsg = "Game over";
}

GameoverState.prototype.draw = function(){

  this.context.clearRect(0, 0, canvas.width, canvas.height);
  this.context.fillStyle = "blue";
  this.context.font = "bold 40px Arial";
  this.context.fillText("Game over!", 200, 250);
    
}

function PlayState(canvas, level, lives){
  this.context = canvas.getContext("2d");
  this.level = level;
  this.lives = lives;

  this.ship = new Ship(canvas, 100, 100);
  this.aliens = [];
  this.lasers = [];
}

PlayState.prototype.draw = function(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  this.ship.draw();
}

PlayState.prototype.fireLaser = function(){
  this.lasers.push(new Laser(this.ship.x, this.ship.y - 10, 10 /*speed*/));
}

function Ship(canvas, x, y){
  //this.context = canvas.getContext("2d");
  this.x = x;
  this.y = y;
}

Ship.prototype.getX = function(){return this.x};
Ship.prototype.getY = function(){return this.y};

Ship.prototype.draw = function(){

  var ship_img = new Image();
    
  ship_img.onload = function () {
    //can just hardcode start for now
    context.drawImage(ship_img, 100, 100);
  }
  
  ship_img.src = "images/ship.bmp"; // get the image from this URL
}

function checkShipAction(e) {
    var event = window.event ? window.event : e;
    Ship.prototype.Shipaction(event.keyCode);
}

Ship.prototype.Shipaction = function(actionKey){
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
      this.context.drawImage(image, this.x, this.y);
    }
    image.src = "images/alien.png";

  }

}

// --------------------------------------------------
// --------------------------------------------------
//  onLoad calls
// --------------------------------------------------
// --------------------------------------------------

var canvas;
var context;
var shipx = Ship.prototype.getX();
var shipy = Ship.prototype.getY();

window.onload = function() {
  canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");
  
  var welcomeState = new WelcomeState(canvas);
  welcomeState.draw();

  document.onkeydown = checkNewGame;
    
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
    canvas = document.getElementById("myCanvas");

    if (event.keyCode == 13) {
        var ps = new PlayState(canvas, 1, 3);
        ps.draw(canvas);
    }
}
