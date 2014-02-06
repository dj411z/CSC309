var canvas;
var context;
var ws = new WelcomeState();
var ps = new PlayState();
var gos = new GameoverState();
var game;
var level;
var aliens = [];
var lasers = [];
var ship;
var canFire = true;


window.onload = function() {
  canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");
  
  ws.draw();

  document.onkeydown = checkNewGame;  
}

function checkNewGame(e) {
    var event = window.event ? window.event : e;

    if (event.keyCode == 13) {
        ps.draw();
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
}

//Game class
function Game() {

  this.lives = 3;

  //width and height
  this.width = 500;
  this.height = 500;

  //game canvas to render to
  this.canvas = canvas;
}

function gameLoop(){
	context = game.canvas.getContext("2d");

	ps.update(game);
	ps.draw(game);
}

Game.prototype.start = function(){
  	window.setInterval("gameLoop(game)", 20);
}

function WelcomeState(){

}

WelcomeState.prototype.draw = function(){

  var img = new Image();
    
  img.onload = function () {
    context.drawImage(img, -50, -10);
  }
  
  img.src = "images/start.jpg"; // get the image from this URL
    
}

function PlayState(){
	this.aliensCurrentVelocity = 10;
	this.aliensCurrentDroppingDistance = 0;
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

}

function testCollision(){

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

function moveAliens(){
	//give each alien in the array a destination to move to
	//once it hits that destination, give new destination


	//if hits bottom, gameover
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
    lasers.push(new Laser(canvas, ship.x, ship.y - 10, 5 /*speed*/));
    reloading();
  }

  else{
    console.log("Wait for reload!");
  }  
}

function reloading(){
  canFire = false;
  window.setTimeout("reloaded()", 500);
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

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "blue";
  context.font = "bold 40px Arial";
  context.fillText("Game over!", 200, 250);
    
}