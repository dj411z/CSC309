var gamePieces;


var p1win;
var p2win;
var tie;

var gamePieces;
var gameBoard;

window.onload = function() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  
  startGame();

 canvas.onmousedown = canvasClick;

}

function canvasClick(e, player) {
  // Get the canvas click coordinates.
  var x = e.pageX;
  var y = e.pageY;

  if(x > 50 && x < 100){
		dropPiece(0, player);
	} else if (x > 100 && x <150) {
		dropPiece(1,player);
	} else if (x > 150 && x <200){
		dropPiece(2, player);
	} else if (x > 200 && x <250){
		dropPiece(3, player);
	} else if (x > 250 && x <300){
		dropPiece(4, player);
	} else if (x > 300 && x <350){
		dropPiece(5, player);
	} else if (x > 350 && x <400){
		dropPiece(6, player);
	}
}

function GamePiece(x, y, player){
	this.x = x;
	this.y = y;
	this.player = player;
	this.radius = 20;
}

GamePiece.prototype.drawPiece = function (){
	context.beginPath();
	//context.arc(x,y,r,sAngle,eAngle,counterclockwise);

	context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);

	if(this.player == 1){
		context.fillStyle = 'yellow';
	}

	else if(this.player == 2){
		context.fillStyle = 'green';
	}
	
	context.fill();
	context.lineWidth = 2;
	context.stroke();
}

function drawPieces(){
	for(var i = 0; i < gamePieces.length; i++){
    	gamePieces[i].drawPiece();
  	}
}

function startGame(){
	canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

	context.clearRect(0, 0, canvas.width, canvas.height);
	
	gameBoard = new Array(7);
	for (var col = 0; col < 7; col ++){
		gameBoard[col] = [0, 0, 0, 0, 0, 0];
	}
	

	gamePieces = [];
	p1win = false;
	p2win = false;
    tie = false;
    
	drawBoard();
}

function checkWin(){

	checkTie();
	checkRows();
	checkCols();
	checkUpperDiags();
	checkLowerDiags();
	if (p1win == true){
		alert("P1 WIN");
		startGame();
	}

	else if (p2win == true){
		alert("P2 WIN");
		startGame();
	}

	else if (tie == true){
		alert("TIE");
		startGame();
	}
}

function checkTie(){
	var full = true;
	for(var col = 0; col < 7; col ++){
		for(var row = 0; row < 6; row ++){
			if (gameBoard[col][row] == 0){
				full = false;
			}
		}
	}

	if (full == true){
		tie = true;
	}

}

//horinzontal checking
function checkRows(){
	for(var col = 0; col < 7; col ++){
		for(var row = 0; row < 3; row ++){
			if (gameBoard[col][row] != 0){
				//get value of that piece
				var who = gameBoard[col][row];
				if (gameBoard[col][row + 1] == who && gameBoard[col][row + 2] == who && gameBoard[col][row + 3] == who){
					if(who == 1){
						p1win = true;
					}
					else{
						p2win = true;
					}
				}
			}
		}
	}
}

//vertical checking
function checkCols(){
	for(var col = 0; col < 4; col ++){
		for(var row = 0; row < 6; row ++){
			if (gameBoard[col][row] != 0){
				//get value of that piece
				var who = gameBoard[col][row];
				if (gameBoard[col + 1][row] == who && gameBoard[col + 2][row] == who && gameBoard[col + 3][row] == who){
					if(who == 1){
						p1win = true;
					}
					else{
						p2win = true;
					}
				}
			}
		}
	}
}

function checkUpperDiags(){
	for(var col = 0; col < 4; col ++){
		for(var row = 0; row < 3; row ++){
			if (gameBoard[col][row] != 0){
				//get value of that piece
				var who = gameBoard[col][row];
				//check increasing diags
				if (gameBoard[col + 1][row + 1] == who && gameBoard[col + 2][row + 2] == who && gameBoard[col + 3][row + 3] == who){
					if(who == 1){
						p1win = true;
					}
					else{
						p2win = true;
					}
				} 
			}
		}
	}
}

function checkLowerDiags(){
	for(var col = 6; col > 2; col --){
		for(var row = 0; row < 3; row ++){
			if (gameBoard[col][row] != 0){
				//get value of that piece
				var who = gameBoard[col][row];

				if (gameBoard[col - 1][row + 1] == who && gameBoard[col - 2][row + 2] == who && gameBoard[col - 3][row + 3] == who){
					if(who == 1){
						p1win = true;
					}
					else{
						p2win = true;
					}
				} 
			}
		}
	}
}

function dropPiece(column, player){

	//column is between 0 and 6 for easy array access
	var xpos;
	switch(column){
		case 0:
			xpos = 25;
			break;
		case 1:
			xpos = 75;
			break;
		case 2:
			xpos = 125;
			break;
		case 3:
			xpos = 175;
			break;
		case 4:
			xpos = 225;
			break;
		case 5:
			xpos = 275;
			break;
		case 6:
			xpos = 325;
			break;
	}
	//add to xpos to account for canvas
	xpos += 50;

	//check if entire column is full
	if (gameBoard[column][0] != 0){
		alert("Column is full");
	}

	for (var row = 6; row > 0; row--){
		if (gameBoard[column][row] == 0){
			gameBoard[column][row] = player;
			break;
		}
	}

	var ypos;
	//row is between 0 and 5
	switch(row){
		case 0:
			ypos = 25;
			break;
		case 1:
			ypos = 75;
			break;
		case 2:
			ypos = 125;
			break;
		case 3:
			ypos = 175;
			break;
		case 4:
			ypos = 225;
			break;
		case 5:
			ypos = 275;
			break;
	}
	//add to ypos to account for canvas
	ypos += 50;

	var p = new GamePiece(xpos, ypos, player);
	gamePieces.push(p);
	drawPieces();

	checkWin();
}

function drawBoard(){

	var s = 50;

	for (var x = 0; x <= 350; x += 50) {
    	context.moveTo(0.5 + x + s, s);
    	context.lineTo(0.5 + x + s, 300 + s);
	}


	for (var y = 0; y <= 300; y += 50) {
    	context.moveTo(s, 0.5 + y + s);
    	context.lineTo(350 + s, 0.5 + y + s);
	}

	context.strokeStyle = "blue";
	context.stroke();
	
}




//checkGameInterval = window.setInterval("checkWin()", 1000);


