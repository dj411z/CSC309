window.onload = function() {
  canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");

  var img = new Image();
	  
  img.onload = function () {
	  context.drawImage(img, -50, -10);
  }
  
  img.src = "start.jpg"; // get the image from this URL	  
};
function alien(canvas, x, y){

  this.context = canvas.getContext("2d");
  this.x = x;
  this.y = y;

}
aliens = {};

function newGame(){
	context.clearRect(0, 0, canvas.width, canvas.height);
}