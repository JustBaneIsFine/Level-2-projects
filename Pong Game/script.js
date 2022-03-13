const canvas = document.getElementById("canvas");

var myBlock;
var secondBlock;

window.onload = () => {
	startGame();

}


function startGame() {
	myBlock = new component(20,80,"red",20,20);
	secondBlock = new component(20,80,"red",760,20);
	gameArea.start();

}

var gameArea = {
	canvas: document.createElement("canvas"),
	start: function ()
	{
		this.canvas.width = 800;
		this.canvas.height = 500;
		this.keys = [];
		this.context = this.canvas.getContext("2d");
		this.canvas.style = "background-color: white";
		document.body.childNodes[3].insertBefore(this.canvas, document.body.childNodes[3].childNodes[0]);
		this.interval = setInterval(updateGameArea,8);

			window.addEventListener("keydown", function(e)
				{
					gameArea.keys = (gameArea.keys || []);
					gameArea.keys[e.keyCode] = (e.type == "keydown");
				})
			window.addEventListener("keyup", function (e) {
					gameArea.keys[e.keyCode] = (e.type == "keydown");
				})
	},
	
	clear: function()
		{
			this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
		}
};

	

function component(width, height,color,x,y){
	this.width = width;
	this.height = height;
	this.speedY = 0;
	this.speedX = 0;
	this.x = x;
	this.y = y;
	
	this.update = function () 
		{
		ctx=gameArea.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height)
		}
	this.newPos = function()
		{
			this.x += this.speedX;
			this.y += this.speedY;
		}


}

function updateGameArea() 
	{
		gameArea.clear();
		myBlock.speedX = 0;
		myBlock.speedY = 0;
		secondBlock.speedX = 0;
		secondBlock.speedY = 0;
		
		// if (gameArea.keys && gameArea.keys[37]){myBlock.speedX = -3;}
		// if (gameArea.keys && gameArea.keys[39]){myBlock.speedX = 3;}
		if (gameArea.keys && gameArea.keys[87]){
			myBlock.speedY = -3;
			if (myBlock.y <= 0){myBlock.y = 0;}
		}
		if (gameArea.keys && gameArea.keys[83]){
			myBlock.speedY = 3;
			if (myBlock.y >= 420){myBlock.y = 420;}
		}

		if (gameArea.keys && gameArea.keys[38]){
			secondBlock.speedY = -3;
			if (secondBlock.y <= 0){secondBlock.y = 0;}
		}
		if (gameArea.keys && gameArea.keys[40]){
			secondBlock.speedY = 3;
			if (secondBlock.y >= 420){secondBlock.y = 420;}
		}
		myBlock.newPos();
		myBlock.update();
		secondBlock.newPos();
		secondBlock.update();


	}
