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

var started = false, paused = false, gameLoopInterval, dropBombsInterval;

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

//Checks for enter key to initalize game
function checkNewGame(e) {
    var event = window.event ? window.event : e;

    if (event.keyCode == 13 && !started) {
        started = true;
        game = new Game();
        ps.init();
        game.start();
    }
}

//Listens for either "key arrows" to move ship or "p" to pause game 
window.addEventListener("keydown", function keydown(e) {
    var keycode = e.which || window.event.keycode;
    //  Supress further processing of all keys
    e.preventDefault();
    if((keycode == 37 || keycode == 39 || keycode == 32) && !paused) {
        shipAction(keycode);
    }
    
    // p to pause game
    else if (keycode == 80){
      paused = !paused;
      pauseGame();
    }
});

//Take keycode and either move ship or fire laser
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

//Main method to update and draw game 
function gameLoop(){
  ps.draw(game);
	ps.update(game);
}

//Sets intervals for main game lopp and the bomb dropping
Game.prototype.start = function(){
  	gameLoopInterval = window.setInterval("gameLoop(game)", 20);
    dropBombsInterval = window.setInterval("dropBombs()", bombSpeed);
}

//Keep drawn canavs objects still while pausing game
function pauseGame(){
  if (paused && (ship != null)){
    window.clearInterval(gameLoopInterval);
    window.clearInterval(dropBombsInterval);
    context.fillStyle = "orange";
    context.font = "bold 40pt Arial";
    context.fillText("Paused!", 150, 200);
  }

  else if (!paused && (ship != null)){
    game.start();
  }
}

//Initial state of the game
function WelcomeState(){};

//Display welcome state image 
WelcomeState.prototype.draw = function(){

  var img = new Image();
    
  img.onload = function () {
    context.drawImage(img, -50, -10);
  }
  // get the image from this URL
  img.src = "images/start.jpg"; 
}

//Class to keep track of game play 
function PlayState(){};

//Initialize ship and populate aliens array 
PlayState.prototype.init = function(){
	ship = new Ship(canvas.width / 2, canvas.height - 100);
	initAliens();
}

//Adjust movement of aliens, lasers, and bombs and test for object collisions  
PlayState.prototype.update = function(){
	moveLasers();
	moveAliens();
  moveBombs();

	testLaserHit();
	testCollision();
  testBombHit();
}

//Update canvas with drawings of objects
PlayState.prototype.draw = function(){
	context.clearRect(0, 0, canvas.width, canvas.height);

	ship.draw();
	drawAliens();
	drawLasers();
  drawBombs();
}
//Check for laser-alien collisions and remove them as nessecary 
function testLaserHit(){
  for (var i = 0; i < aliens.length; i++){
    var a = aliens[i];
    var hitAlien = false;

    for (var j = 0; j < lasers.length; j++){
      var l = lasers[j];
      //Check overlapping of laser and alien object
      if (l.x >= (a.x - (a.width / 2)) && l.x <= (a.x + a.width)
          && l.y >= (a.y - a.height) && l.y <= (a.y + a.height)){ 
        //Remove laser from array
        lasers.splice(j--, 1); 
        hitAlien = true;
        break;
      }
    }

    if (hitAlien){
      //Destroy alien 
      aliens.splice(i--, 1);
      currscore += points;
      updateScore();
      //If no more aliens then update level
      if (aliens.length == 0){
        window.clearInterval(gameLoopInterval);
        levelUp();
        game = new Game();
        ps.init();
        game.start();
      }
    }
  }
}

//Check ship-bomb collisions
function testBombHit(){
  for (var i = 0; i < bombs.length; i++){
    var b = bombs[i];
    var hitShip = false;
    //Check overlapping of ship and bombs
    if (b.x >= (ship.x - (ship.width / 2)) && b.x <= (ship.x + ship.width) 
      && b.y >= (ship.y - ship.height) && b.y <= (ship.y + ship.height)){
        bombs.splice(i--, 1);
        hitShip = true;
    }
    //adjust lives if hit 
    if (hitShip){
      lives -= 1;
      updateLives();
      //Game over
      if (lives == 0){
        gs.draw();
      }
    }
  }
}

//Check for ship-alien collisions 
function testCollision(){
  for (var i = 0; i < aliens.length; i++){
    var a = aliens[i];
    //Check overlapping ship and aliens 
    if ((a.x + (a.width / 2)) > (ship.x - (ship.width / 2)) 
      && (a.x - (a.width / 2)) < (ship.x + (ship.width / 2))
        && (a.y + (a.height / 2)) > (ship.y - (ship.height / 2))
        && (a.y - (a.height / 2)) < (ship.y + (a.height / 2))){
      //collided so game over
      gs.draw();
    }
  }

}

//Modify coordinates of laser objects
function moveLasers(){

  for(var i=0; i<lasers.length; i++){
      lasers[i].y -= 10;
      //If off screen boundary, remove from array 
      if (lasers[i].y < 0){
        lasers.splice(i--, 1);
      }
  }
}

//Modify coordinates of bomb objects
function moveBombs() {

  for(var i=0; i<bombs.length; i++){
      bombs[i].y += 2;
      //If off screen boundary, remove from array
      if (bombs[i].y > ((canvas.height - 100) + ship.height)){
        bombs.splice(i--, 1);
      }
  }
}

//Populate aliens array
function initAliens(){
	var alienX = 50;
	var alienY = 50;
    for (var i = 0; i < numAl; i++){
      var alien = new Alien(alienX, alienY);
      aliens.push(alien);
      //Adjust coordinates for alien initial location  
      if (alienX == 400){
        alienX = 50;
        alienY = alienY + 25; 
      }
      else{
        alienX += 25;
      }
    }
}

//Process of shifting alien group towards ship
function moveAliens(){

    for(i=0; i < aliens.length; i++) {
        var a = aliens[i]; 
        //If left boundary hit move group down and start movement to right
        if(hitLeft === false && a.x < 0) {
            hitLeft = true;
            shiftDown();
            hitRight = false;
        }
        //If right boundary hit move group down and start movement to left
        else if(hitRight === false && (a.x + (a.width))> canvas.width) {
            hitRight = true;
            shiftDown();
            hitLeft = false;
        }
        //Bottom boundary hit  
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


//Move alien group to right by configured shift amount speed
function shiftRight(){
  for (var i = 0; i < aliens.length; i++){
    var a = aliens[i];
    a.x += shiftAm;
  }
}

//Move alien group to the left by configured shift amount speed
function shiftLeft(){
  for (var i = 0; i < aliens.length; i++){
    var a = aliens[i];
    a.x -= shiftAm;
  }
}

//Move alien group down
function shiftDown(){
  for (var i = 0; i < aliens.length; i++){
    var a = aliens[i];
    a.y += 10;
  }
}

//Ship class
function Ship(x, y) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
}

//Draw ship object 
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

//Bomb class
function Bomb(x, y){
  this.x = x;
  this.y = y;
}

//Draw bomb object
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

//Laser class
function Laser(x, y) {
    this.x = x;
    this.y = y;
}

//Draw laser object 
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

//Populate laser array according to established fire rate
function fireLaser (){
  //If reloaded add new laser then toggle canFire to wait for reload
  if (canFire == true){
    lasers.push(new Laser(ship.x + (ship.width / 2), ship.y - 10));
    reloading();
  }
}

//Helper function to toggle fire rate
function reloading(){
  canFire = false;
  window.setTimeout("reloaded()", 250);
}

//Helper function to toggle fire rate
function reloaded(){
  canFire = true;  
}

//Alien class
function Alien(x, y) {
    this.x = x;
    this.y = y;

    this.width = 20;
    this.height = 20;
} 

//Draw alien object
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

//Draws alien objects from aliens array
function drawAliens(){
  for(var i = 0; i < aliens.length; i++){
    aliens[i].draw();
  }
}

//Draws laser objects from laser array
function drawLasers(){
  for(var i = 0; i < lasers.length; i++){
    lasers[i].draw();
  }
}

//Draws bomb objects from bomb array
function drawBombs(){
  for(var i = 0; i < bombs.length; i++){
    bombs[i].draw();
  }
}

//Select random alien to drop bomb
function dropBombs(){
  var random = Math.floor(Math.random() * (aliens.length));
  var alien = aliens[random];
  var bomb = new Bomb(alien.x + (alien.width / 2), alien.y + (alien.height));
  bombs.push(bomb);
}

//Class to keep track of when game ends
function GameoverState(){};

//Draw game over prompts and clear all objects 
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

//Change score in html doc 
function updateScore() {
  var displayScore = document.getElementById("currscore");
  displayScore.innerHTML = "Current Score: " + currscore;

}

//Change lives in html doc
function updateLives(){
  var displayLives = document.getElementById("lives");
  displayLives.innerHTML = "Lives: " + lives;
}

//Increase appropriate configurations for next level
function levelUp() {
  level += 1;
  bombSpeed -= 100;
  numAl += 15;
  shiftAm += 1;
  points += 10
  //Change level in html doc
  var displayLevel = document.getElementById("level");
  displayLevel.innerHTML = "Level: " + level;
};


