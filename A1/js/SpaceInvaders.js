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

  this.ship = ship;
  this.aliens = aliens;
  this.lasers = lasers;
}

PlayState.prototype.draw = function(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  initAliens();
  drawAliens();
  this.ship.draw();
}

function fireLaser (){
  lasers.push(new Laser(canvas, ship.x, ship.y - 10, 5 /*speed*/));
}

function Ship(canvas, x, y){
  //this.context = canvas.getContext("2d");
  this.x = x;
  this.y = y;
}

// Ship.prototype.getX = function(){return this.x};
// Ship.prototype.getY = function(){return this.y};

Ship.prototype.draw = function(){

  // Draw the square.
    context.beginPath();
    context.strokeStyle = "blue";
    context.fillStyle = "blue";
    context.rect(this.x, this.y, 20, 20);

    // Draw the outline.
    context.fill();
    context.stroke();   

  // var ship_img = new Image();
    
  // ship_img.onload = function () {
  //   //can just hardcode start for now
  //   context.drawImage(ship_img, 250, 400);
  // }
  
  // ship_img.src = "images/ship.bmp"; // get the image from this URL
}

function checkShipAction(e) {
    var event = window.event ? window.event : e;
    ship.shipaction(event.keyCode);

}

function shipAction(ship, actionKey){

  //move left
  if(actionKey == 37){
    ship.x -= 10;
  }
  //move right
  if(actionKey == 39){
    ship.x += 10;
  }

  if(actionKey == 32){
    console.log("fire");
    fireLaser();
  }

  //keep ship in game bounds
  if(ship.x < 0) {
      ship.x = 0;
  }
  if(ship.x >= canvas.width - 20) {
      ship.x = canvas.width - 20;
  }

  
  //context.clearRect(0, 0, canvas.width, canvas.height);
  //ship.draw();
  //drawAliens();
}

function drawEverything(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawAliens();
  ship.draw();
  drawLasers();
}

function Laser(canvas, x, y, speed){
  //this.context = canvas.getContext("2d");
  this.x = x;
  this.y = y;
  this.speed = speed;
}

Laser.prototype.draw = function (){
    // if(this != null){
    //   //then draw
    // }

    // else{
    //   //null so don't draw?
    // }
  // Draw the laser
    context.beginPath();
    context.strokeStyle = "green";
    context.fillStyle = "green";
    context.rect(this.x, this.y, 5, 10);

    // Draw the outline.
    context.fill();
    context.stroke();   

}

function moveLasers(){

  for(var i=0; i<lasers.length; i++){
      //if off the map, then set that laser to null to get rid of it?
      if (lasers[i].y > -11){
        lasers[i].y -= 10;
      }
      //console.log(lasers[i].x);
      //console.log(lasers[i].y);
  }

}
// This function stores the details for a single alien
function Alien(canvas, x, y){
  //this.context = canvas.getContext("2d");
  this.x = x;
  this.y = y;
}

function initAliens(){

    for (var i = 0; i <= 29; i++){
      var alien = new Alien(canvas, alienX, alienY);
      aliens.push(alien);
      if (alienX == 400){
        alienX = 50;
        alienY = alienY + 25; 
      }
      else{
        alienX += 25;
      }
    }
}
Alien.prototype.draw = function () {

    // Draw the square.
    context.beginPath();
    context.strokeStyle = "red";
    context.fillStyle = "red";
    context.rect(this.x, this.y, 20, 20);

    // Draw the outline.
    context.fill();
    context.stroke();   
}

function shiftDown(){
  for (var i = 0; i >= aliens.length; i++) {
    aliens[i].y += 10;
  }
}

function moveAliensR(){
    for(var i=0; i<aliens.length; i++){
        aliens[i].x += 10;
        if (aliens[aliens.length] = canvas.width - 10){
          shiftDown();
          moveAliensL();
        }
    }
}

function moveAliensL(){
    for(var i=0; i<aliens.length; i++){
        aliens[i].x -= 10;
        if (aliens[0] = 0){
          shiftDown();
          moveAliensL();
        }
    }
}

var canvas;
var context;
var aliens = [];
var lasers = [];
var started = false;
var ship = new Ship(canvas, 250, 400);

var alienX = 50;
var alienY = 50;



window.onload = function() {
  canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");
  
  var welcomeState = new WelcomeState(canvas);
  welcomeState.draw();

  document.onkeydown = checkNewGame;  
}

window.addEventListener("keydown", function keydown(e) {
    var keycode = e.which || window.event.keycode;
    //  Supress further processing of left/right/space (37/29/32)
    if(keycode == 37 || keycode == 39 || keycode == 32) {
        e.preventDefault();
        shipAction(ship, keycode);
    }
    //drawLasers();
    window.setInterval("drawEverything()", 50);
    window.setInterval("moveLasers()", 100);
});
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

//Draws laser objects inside laser array
function drawLasers(){
  for(var i=0; i<lasers.length; i++){
    lasers[i].draw();
  }
}

function checkNewGame(e) {
    var event = window.event ? window.event : e;
    canvas = document.getElementById("myCanvas");

    if (event.keyCode == 13 && !started) {
        started = true;
        var ps = new PlayState(canvas, 1, 3);
        ps.draw(canvas);
    }
}
