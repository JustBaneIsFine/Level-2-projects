// to do:
// clearRect
// update snake food grid
// snake.move , snake.changeDirection , snake.addLenght , snake.death
// food.newPosition 
// etc..

const canvas = document.getElementById("canvas");

var snake;
var food;
var score = 0;
var grid = [];

window.onload = () => {gameArea.start()}

														// blockSize = 20;
														// xBlockNumber = 25;	//vertical
														// yBlockNumber = 35;	//horizontal

														// numberOfBlocks = 875;




var gameArea = 
	{
		canvas: document.createElement("canvas"),
		start: function ()
		{
			snake = new snake(20,20,"red", 260,260);
			food = new food(20,20,"green",400,400);

			this.canvas.width = 700;
			this.canvas.height = 500;
			this.context = this.canvas.getContext("2d");
			this.canvas.style = "background-color: white";
			document.body.childNodes[3].insertBefore(this.canvas, document.body.childNodes[3].childNodes[0]);
			this.gameInterval = setInterval(updateGameArea,1000/30);
			grid.push()

				window.addEventListener("keydown", function(e)
					{
						var temp;
						if (e.keycode === 38 || e.keycode === 87){
							temp = "up";
						} else if (e.keycode === 40 || e.keycode === 83){
							temp = "down";
						} else if (e.keycode === 37 || e.keycode === 65){
							temp = "left";
						} else if (e.keycode === 39 || e.keycode === 68){
							temp = "right";
						};

						if (temp != undefined){snake.changeDirection(temp)};
			
					})
		},
		
		clear: function()
			{	
				this.context.clearRect(0,0,this.canvas.width, this.canvas.height);

			}
	};

ctx = gameArea.context;

function snake(width, height,color,x,y)
	{
		this.width = width;
		this.height = height;
		this.color = color;
		this.speed = 1;
		this.x = x;
		this.y = y;
		this.body = [];
		this.bodyCount;
		this.direction = "right";
		this.length = 1;
		this.moveHandler = setInterval(moveHandler, speed*1000);
		this.isDead = false;

		this.update = function()
			{
				//----For each body part, do this..
				ctx.fillStyle = this.color;
				ctx.fillRect(this.x, this.y, this.width, this.height)
			}
		this.moveHandler = function()
			{

				if (!isDead && bodyCount === body.length)
					{
						function moveFull()
							{
								// move in the this.direction.
								// if direction right, snake.body add to start (current x position + 20(one block) + current y position)
								// remove last from snake.body
							}
					} 
				else if (!isDead && bodyCount != body.length)
					{

						function moveHead()
							{
								// same as moveFull except last is not removed until body.length and bodyCount match up (has to be on the move interval!)
								// we make one move, then update, on next move() iteration, it will do the same, until bodyCount === body.length.
							}
					}
				else 
					{
						// do not move
					}
					
					



			
				
			}
		
		this.addLength = function()
			{

				//when food and body[0] are in the same grid
				//we increase bodyCount by x number..
				// then the moveHead function will run until it's done and then the moveFull continues..

			}
			
		this.changeDirection = function (dir) 
			{
				switch(dir){
					case "left":
					if (!direction === "right"){}
					direction = dir;
					break;
					case "right":
					if (!direction === "left"){}
					direction = dir;
					break;
					case "up";
					if (!direction === "down"){}
					direction = dir;
					break;
					case "down";
					if (!direction === "up"){}
					direction = dir;
					break;
				}
				 // if new direction right, left etc.
				 // direction = right,left etc.
			}
		this.newSnake = function()
			{
				//reset all snake stats which starts the game again
			}
	};

function food(width, height,color,x,y)
	{
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
		this.color = color;

		this.update = function()
			{	
						ctx.fillStyle = this.color;
						ctx.fillRect(this.x, this.y, this.width, this.height)
			}
		this.newPosition = function()
			{
				this.y = (Math.floor(Math.random()*(25)))*20;
				this.x = (Math.floor(Math.random()*(35)))*20;
			}

	};

function updateScore()
	{
		
		ctx.font = "20px Arial";
		ctx.fillText(score, 4*800/8-5,20);
	}

function updateGameArea()
	{

		//update the same as snake speed interval?











		if (checkPositions(snake.x,snake.y,food.x,food.y))
			{
				snake.addLength();
				food.newPosition();
			}
		
	}

function checkPositions(ax,ay,bx,by)
	{
		ax === bx && ay === by ? true : false;
	}