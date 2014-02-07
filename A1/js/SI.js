var canvas;
var context;
var ws = new WelcomeState();
var ps = new PlayState();
var gs = new GameoverState();
var game;
var level;
var aliens = [];
var lasers = [];
var ship;
var canFire = true;
var hitLeft = true, hitRight = false, hitBottom = false;
var gameLoopInterval;
var currscore = 0;
var level = 1;
var numAl = 29;
var shiftAm = 1;
var points = 50;

window.onload = function() {
  canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");
  
  ws.draw();

  document.onkeydown = checkNewGame;  
}

function checkNewGame(e) {
    var event = window.event ? window.event : e;

    if (event.keyCode == 13) {
        game = new Game();
        game.start();
    }
}

window.addEventListener("keydown", function keydown(e) {
    var keycode = e.which || window.event.keycode;
    //  Supress further processing of left/right/space (37/29/32)
    if(keycode == 37 || keycode == 39 || keycode == 32) {
        e.preventDefault();
        shipAction(keycode);
    }
});

function shipAction(actionKey){

  //move left
  if(actionKey == 37){
    ship.x -= 10;
  }
  //move right
  if(actionKey == 39){
    ship.x += 10;
  }

  if(actionKey == 32){
    fireLaser();
  }

  //keep ship in game bounds
  if(ship.x < 0) {
      ship.x = 0;
  }
  if(ship.x >= canvas.width - 20) {
      ship.x = canvas.width - 20;
  }
}

//Game class
function Game() {

  this.lives = 3;

  //width and height
  this.width = 500;
  this.height = 500;
  this.numAliens = numAl;

  //game canvas to render to
  this.canvas = canvas;
}

function gameLoop(){
	context = game.canvas.getContext("2d");
  ps.draw(game);
	ps.update(game);
	
}

Game.prototype.start = function(){
    ps.init();
  	gameLoopInterval = window.setInterval("gameLoop(game)", 20);
}

function WelcomeState(){};

WelcomeState.prototype.draw = function(){

  var img = new Image();
    
  img.onload = function () {
    context.drawImage(img, -50, -10);
  }
  
  img.src = "images/start.jpg"; // get the image from this URL
    
}

function PlayState(){
	this.aliensCurrentVelocity = 10;
  this.aliensNextVelocity = null;
	this.aliensAreDropping = false;

}

PlayState.prototype.init = function(){
	ship = new Ship(250, 400);
	initAliens();
}

PlayState.prototype.update = function(){
	//move ship
	moveLasers();
	moveAliens();

	testHit();
	testCollision();

	//check for game lives = 0, then gameOver

}

PlayState.prototype.draw = function(){
	context.clearRect(0, 0, canvas.width, canvas.height);

	ship.draw();
	drawAliens();
	drawLasers();
}

function testHit(){
  for (var i = 0; i < aliens.length; i++){
    var a = aliens[i];
    var hitAlien = false;

    for (var j = 0; j < lasers.length; j++){
      var l = lasers[j];

      if (l.x >= (a.x - 10) && l.x <= (a.x + 10)
          && l.y >= (a.y - 10) && l.y <= (a.y + 10)){
        lasers.splice(j--, 1);
        //add score
        hitAlien = true;
        break;
      }
    }

    if (hitAlien){
      aliens.splice(i--, 1);
      currscore += points;
      updateScore();
      if (aliens.length == 0){
        window.clearInterval(gameLoopInterval);
        levelUp();
        game = new Game();
        game.start();
      }
    }
  }
}

function testCollision(){
  for (var i = 0; i < aliens.length; i++){
    var a = aliens[i];

    if ((a.x + 10) > (ship.x - 10) && (a.x - 10) < (ship.x + 10)
        && (a.y + 10) > (ship.y - 10) && (a.y - 10) < (ship.y + 10))
      gs.draw();
      //lives = 0;
  }

}

function moveLasers(){

  for(var i=0; i<lasers.length; i++){
      //if off the map, then set that laser to null to get rid of it?
      lasers[i].y -= 10;
      if (lasers[i].y < 0){
        lasers.splice(i--, 1);
      }
  }

}

function initAliens(){
	// change up for each level
	var alienX = 50;
	var alienY = 50;
    for (var i = 0; i <= game.numAliens; i++){
      var alien = new Alien(alienX, alienY);
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

function moveAliens(){
  //  Move the invaders.

    for(i=0; i<aliens.length; i++) {
        var a = aliens[i]; 

        if(hitLeft === false && a.x < 0) {
            hitLeft = true;
            shiftDown();
            hitRight = false;
        }
        else if(hitRight === false && (a.x + 20)> canvas.width) {
            hitRight = true;
            shiftDown();
            hitLeft = false;
        }
        else if(hitBottom === false && a.y > 400) {
            hitBottom = true;
        }
    }

    //  If we've hit the left, move down then right.
    if(hitLeft) {
       shiftRight();
       hitRight = false;
    }
    //  If we've hit the right, move down then left.
    if(hitRight) {
        shiftLeft();
        hitLeft = false;
    }
    //  If we've hit the bottom, it's game over.
    if(hitBottom) {
        gs.draw();
    } 
 }

function shiftRight(){
  for (var i = 0; i < aliens.length; i++){
    var a = aliens[i];

    a.x += shiftAm;

  }

}

function shiftLeft(){
  for (var i = 0; i < aliens.length; i++){
    var a = aliens[i];

    a.x -= shiftAm;
  }

}

function shiftDown(){
  for (var i = 0; i < aliens.length; i++){
    var a = aliens[i];

    a.y += 10;
  }

}

function Ship(x, y) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 16;
}

Ship.prototype.draw = function(){

  // Draw the square.
    context.beginPath();
    context.strokeStyle = "blue";
    context.fillStyle = "blue";
    context.rect(this.x, this.y, 20, 20);

    // Draw the outline.
    context.fill();
    context.stroke();   
}

function Laser(x, y, velocity) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
}

Laser.prototype.draw = function (){

  // Draw the laser
    context.beginPath();
    context.strokeStyle = "green";
    context.fillStyle = "green";
    context.rect(this.x, this.y, 5, 10);

    // Draw the outline.
    context.fill();
    context.stroke();   

}

function fireLaser (){
  if (canFire == true){
    lasers.push(new Laser(ship.x, ship.y - 10, 5 /*speed*/));
    reloading();
  }
}

function reloading(){
  canFire = false;
  window.setTimeout("reloaded()", 250);
}

function reloaded(){
  canFire = true;  
}

 
function Alien(x, y) {
    this.x = x;
    this.y = y;

    this.width = 18;
    this.height = 14;
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

function GameoverState(){
}

GameoverState.prototype.draw = function(){
  aliens = [];
  lasers = [];
  ship = null;
  window.clearInterval(gameLoopInterval);

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "blue";
  context.font = "bold 40px Arial";
  context.fillText("Game over!", 200, 100);
  context.fillText("Score: " + currscore , 200, 150);
  context.fillText("Level: " + level , 200, 250);
  //display score and level
  window.setTimeout("location.reload()", 5000);
}

function updateScore() {

  var score = document.getElementById("currscore");
  score.innerHTML = "Current Score: " + currscore;

}

function levelUp() {

  level += 1;
  numAl += 15;
  shiftAm += 1;
  points += 10
  var lev = document.getElementById("level");
  lev.innerHTML = "Level: " + level;

};
