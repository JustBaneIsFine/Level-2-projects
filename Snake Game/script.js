// to do:
// clearRect
// draw snake food grid
// snake.move , snake.changeDirection , snake.addLenght , snake.death
// food.newPosition 
// etc..

const canvas = document.getElementById("canvas");

var snake;
var food;
var score = 0;


window.onload = () => {gameArea.start()}


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
			this.gameInterval = setInterval(updateGameArea,1000/120);

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
		this.lenght = 1;
		this.move = setInterval(moveHandler, speed*1000);

		this.draw = function()
			{
				drawSnake(this.body);
			}
		this.moveHandler = function()
			{
				// if body === bodyCount ---> moveFull
				// else if body != bodyCount ---> moveHead (once)
			}
		this.moveFull = function()
			{
				// move in the this.direction.
				// if direction right, snake.body add to start (current x position + 20(one block) + current y position)
				// remove last from snake.body
			}
		this.moveHead = function()
			{
				// same as moveFull except last is not removed until body.length and bodyCount match up (has to be on the move interval!)
			}
		this.addLength = function()
			{
				//when food and body[0] are in the same grid
				//we increase bodyCount by x number..
				// then the moveHead function will run until it's done and then the moveFull continues..

			}
		this.changeDirection = function (dir) 
			{
				 // if new direction right, left etc.
				 // direction = right,left etc.
			}
	};

function food(width, height,color,x,y)
	{
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
		this.color = color;
		this.draw = function()
			{
				drawFood(this.body);
			}
		this.newPosition = function()
			{
				newFood();
			}

	};

function drawScore()
	{
		ctx = gameArea.context;
		ctx.font = "20px Arial";
		ctx.fillText(score, 4*800/8-5,20);
	}

function updateGameArea()
	{

	}

