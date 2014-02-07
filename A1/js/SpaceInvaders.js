//Global variables
var canvas, context;

//Initialize states of the game
var ws = new WelcomeState();
var ps = new PlayState();
var gs = new GameoverState();

var game, lives = 3;

//Stacks to keep track of game objects
var aliens = [], lasers = [], bombs = [], ship;

var canFire = true;
var hitLeft = true, hitRight = false, hitBottom = false;

var started = false, gameLoopInterval;

//Keep track of score and level
var currscore = 0, level = 1;

//Configuration settings for game
//numAl is configurable number of aliens, shiftAm is speed at which aliens move
var numAl = 30, shiftAm = 1, points = 50, bombSpeed = 1000;


window.onload = function() {
  canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");
  
  ws.draw();

  document.onkeydown = checkNewGame;
}

function checkNewGame(e) {
    var event = window.event ? window.event : e;

    if (event.keyCode == 13 && !started) {
        started = true;
        game = new Game();
        game.start();
    }
}

window.addEventListener("keydown", function keydown(e) {
    var keycode = e.which || window.event.keycode;
    //  Supress further processing of left/right/space
    if(keycode == 37 || keycode == 39 || keycode == 32) {
        e.preventDefault();
        shipAction(keycode);
    }
    // Suppress up/down key presses to prevent scrolling in browser
    else if (keycode == 38 || keycode == 40){
      e.preventDefault();
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
  //space to fire
  if(actionKey == 32){
    fireLaser();
  }

  //keep ship on the canvas
  if(ship.x < 0) {
      ship.x = 0;
  }
  if(ship.x >= canvas.width - 20) {
      ship.x = canvas.width - 20;
  }
}

//Game class
function Game() {};

function gameLoop(){
  ps.draw(game);
	ps.update(game);
}

Game.prototype.start = function(){
    ps.init();
  	gameLoopInterval = window.setInterval("gameLoop(game)", 20);
    window.setInterval("dropBombs()", bombSpeed);
}

function WelcomeState(){};

WelcomeState.prototype.draw = function(){

  var img = new Image();
    
  img.onload = function () {
    context.drawImage(img, -50, -10);
  }
  // get the image from this URL
  img.src = "images/start.jpg"; 
}

function PlayState(){};

PlayState.prototype.init = function(){
	ship = new Ship(canvas.width / 2, canvas.height - 100);
	initAliens();
}

PlayState.prototype.update = function(){
	moveLasers();
	moveAliens();
  moveBombs();

	testLaserHit();
	testCollision();
  testBombHit();
}

PlayState.prototype.draw = function(){
	context.clearRect(0, 0, canvas.width, canvas.height);

	ship.draw();
	drawAliens();
	drawLasers();
  drawBombs();
}

function testLaserHit(){
  for (var i = 0; i < aliens.length; i++){
    var a = aliens[i];
    var hitAlien = false;

    for (var j = 0; j < lasers.length; j++){
      var l = lasers[j];

      if (l.x >= (a.x - (a.width / 2)) && l.x <= (a.x + a.width)
          && l.y >= (a.y - a.height) && l.y <= (a.y + a.height)){
        lasers.splice(j--, 1);
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

function testBombHit(){
  for (var i = 0; i < bombs.length; i++){
    var b = bombs[i];
    var hitShip = false;

    if (b.x >= (ship.x - (ship.width / 2)) && b.x <= (ship.x + ship.width) 
      && b.y >= (ship.y - ship.height) && b.y <= (ship.y + ship.height)){
        bombs.splice(i--, 1);
        hitShip = true;
    }
    if (hitShip){
      lives -= 1;
      updateLives();
      if (lives == 0){
        gs.draw();
      }
    }
  }
}

function testCollision(){
  for (var i = 0; i < aliens.length; i++){
    var a = aliens[i];

    if ((a.x + (a.width / 2)) > (ship.x - (ship.width / 2)) 
      && (a.x - (a.width / 2)) < (ship.x + (ship.width / 2))
        && (a.y + (a.height / 2)) > (ship.y - (ship.height / 2))
        && (a.y - (a.height / 2)) < (ship.y + (a.height / 2))){
      //collided so game over
      gs.draw();
    }
  }

}

function moveLasers(){

  for(var i=0; i<lasers.length; i++){
      lasers[i].y -= 10;
      if (lasers[i].y < 0){
        lasers.splice(i--, 1);
      }
  }
}

function moveBombs() {

  for(var i=0; i<bombs.length; i++){
      bombs[i].y += 2;
      if (bombs[i].y > ((canvas.height - 100) + ship.height)){
        bombs.splice(i--, 1);
      }
  }
}

function initAliens(){
	var alienX = 50;
	var alienY = 50;
    for (var i = 0; i < numAl; i++){
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

    for(i=0; i < aliens.length; i++) {
        var a = aliens[i]; 

        if(hitLeft === false && a.x < 0) {
            hitLeft = true;
            shiftDown();
            hitRight = false;
        }
        else if(hitRight === false && (a.x + (a.width))> canvas.width) {
            hitRight = true;
            shiftDown();
            hitLeft = false;
        }
        else if(hitBottom === false && a.y > (canvas.height - 100)) {
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
    this.height = 20;
}

Ship.prototype.draw = function(){

  // Draw the square.
    context.beginPath();
    context.strokeStyle = "blue";
    context.fillStyle = "blue";
    context.rect(this.x, this.y, this.width, this.height);

    // Draw the outline.
    context.fill();
    context.stroke();   
}

function Bomb(x, y){
  this.x = x;
  this.y = y;
}

Bomb.prototype.draw = function() {
  // Draw the bomb
    context.beginPath();
    context.strokeStyle = "yellow";
    context.fillStyle = "yellow";
    context.rect(this.x, this.y, 5, 5);

    // Draw the outline.
    context.fill();
    context.stroke();   

}

function Laser(x, y) {
    this.x = x;
    this.y = y;
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
    lasers.push(new Laser(ship.x, ship.y - 10));
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

    this.width = 20;
    this.height = 20;
} 

Alien.prototype.draw = function () {

    // Draw the square.
    context.beginPath();
    context.strokeStyle = "red";
    context.fillStyle = "red";
    context.rect(this.x, this.y, this.width, this.height);

    // Draw the outline.
    context.fill();
    context.stroke();   
}

//Draws alien objects inside aliens array
function drawAliens(){
  for(var i = 0; i < aliens.length; i++){
    aliens[i].draw();
  }
}

//Draws laser objects inside laser array
function drawLasers(){
  for(var i = 0; i < lasers.length; i++){
    lasers[i].draw();
  }
}

function drawBombs(){
  for(var i = 0; i < bombs.length; i++){
    bombs[i].draw();
  }
}

function dropBombs(){
  var random = Math.floor(Math.random() * (aliens.length));
  var alien = aliens[random];
  var bomb = new Bomb(alien.x, alien.y);
  bombs.push(bomb);
}

function GameoverState(){
}

GameoverState.prototype.draw = function(){
  //clear objects, stop gameLoop
  aliens = [];
  lasers = [];
  ship = null;
  window.clearInterval(gameLoopInterval);

  context.clearRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "orange";
  context.font = "bold 40pt Arial";
  context.fillText("Game over!", 150, 100);

  context.fillStyle = "yellow";
  context.font = "bold 16pt Arial";
  context.fillText("Your Score: " + currscore , 200, 200);
  context.fillText("Level: " + level , 200, 250);
  
  //refresh page in 5 seconds
  window.setTimeout("location.reload()", 5000);
}

function updateScore() {
  var displayScore = document.getElementById("currscore");
  displayScore.innerHTML = "Current Score: " + currscore;

}

function updateLives(){
  var displayLives = document.getElementById("lives");
  displayLives.innerHTML = "Lives: " + lives;
}

function levelUp() {
  level += 1;
  bombSpeed -= 100;
  numAl += 15;
  shiftAm += 1;
  points += 10
  var displayLevel = document.getElementById("level");
  displayLevel.innerHTML = "Level: " + level;
};


