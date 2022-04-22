const canvas = document.getElementById("canvas");

var myBlock;
var secondBlock;
var ball;
var resultLeft = 0;
var resultRight = 0;
var net;
var score = {"scoreLeft": resultLeft, "scoreRight":resultRight};

window.onload = () => {
	startGame();
}


function startGame() {
	net = new component(3,500,"grey",400-5,0);
	myBlock = new component(20,80,"red",20,20);
	secondBlock = new component(20,80,"red",760,20);
	ball = new component(20,20,"grey");
	gameArea.start();
	ballLaunch();
	drawScore();
}


function drawScore()
	{
		ctx = gameArea.context;
		ctx.font = "90px Arial";
		ctx.fillText(resultLeft, 2.5*800/8,100);
		ctx.fillText(resultRight, 5*800/8,100);
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
		this.interval = setInterval(updateGameArea,1000/120);

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



function ballLaunch()
	{	
		ball.y = 500/2;
		ball.x = ((800/2)-10);
		ball.speedY = 0.2;
		ball.speedX = 3;
		ball.speed = 3;
	}

function currentPlayer()
	{
		
		if(ball.x < gameArea.canvas.width/2){
			return "left";
		}else {
			return "right";
		}
	}

function component(width, height,color,x,y){
	this.width = width;
	this.height = height;
	this.speed = 3;
	this.speedY = 0;
	this.speedX = 0;
	this.x = x;
	this.y = y;
	this.leftSide = this.x;
	this.rightSide = this.x + this.width;
	this.topSide = this.y;
	this.bottomSide = this.y + this.height;
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
			this.topSide = this.y;
			this.bottomSide = this.y +this.height;
			this.leftSide = this.x;
			this.rightSide = this.x + this.width;
		}
}

	function collisionDetection(b,p) 
		{
			if(b.rightSide > p.leftSide && b.leftSide < p.rightSide && b.topSide < p.bottomSide && b.bottomSide > p.topSide){
				return true; 
			}else {return false;}
		}

function updateGameArea() 
	{
		gameArea.clear();
		myBlock.speedX = 0;
		myBlock.speedY = 0;
		secondBlock.speedX = 0;
		secondBlock.speedY = 0;

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
		var current;
			if (currentPlayer() === "left")
				{current = myBlock;}
			else
				{current = secondBlock};


		if (ball.y <= 0)
			{ball.speedY = reverse(ball.speedY)};
		if (ball.y >= gameArea.canvas.height-20)
			{ball.speedY = reverse(ball.speedY)};

		
		


		drawScore();
		myBlock.newPos();
		myBlock.update();
		secondBlock.newPos();
		secondBlock.update();
		ball.newPos();
		ball.update();
		net.update();
		if (ball.x <= 0){
			resultRight += 1;
			ballLaunch();
			// ball.speedX = 0;
			// ball.speedY = 0;
			// ball.newPos();
			// ball.update();
			// startGame();
			
		}else if (ball.x >=800){
			resultLeft +=1;
			ballLaunch();
			// ball.speedX = 0;
			// ball.speedY = 0;
			// ball.newPos();
			// ball.update();
			// startGame();
		}

		if(collisionDetection(ball,current)){
			// ball.speedX = reverse(ball.speedX);

			let collidePoint = ((ball.y + ((ball.height)/2)) - (current.y + current.height/2))/(current.height/2);
			console.log(collidePoint);

			var direction;

			if (current === myBlock) 			{direction = 1;}
			else if (current === secondBlock)	{direction = -1;}
			let angleRad = (Math.PI/4)*collidePoint;
			

			ball.speedX = direction * ball.speed * Math.cos(angleRad);
			ball.speedY = ball.speed * Math.sin(angleRad);
			

			ball.speed += 0.5;

			ball.newPos();
			ball.update();
			console.log(ball.speedX, "<<<<<< speed X");
			
			
		}



	}

function reverse(a){return a-(a*2);}