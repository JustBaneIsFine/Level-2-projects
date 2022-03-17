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
			this.snakeInterval = setInterval(snake.moveHandler,snake.speed*1000);
			this.canvas.width = 700;
			this.canvas.height = 500;
			this.context = this.canvas.getContext("2d");
			this.canvas.style = "background-color: white";
			document.body.childNodes[3].insertBefore(this.canvas, document.body.childNodes[3].childNodes[0]);
			this.gameInterval = setInterval(updateGameArea,1000/30);

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
				this.context.fillStyle = "white";
				this.context.fillRect(0,0,this.canvas.height,this.canvas.width);
			}
	};

var ctx = gameArea.canvas.getContext("2d");



function snake(width, height,color,x,y)
	{
		this.width = width;
		this.height = height;
		this.color = color;
		this.speed = 1;
		this.x = x;
		this.y = y;
		this.body = [{"x":260, "y":260}];
		this.bodyCount = 1;
		this.direction = "right";
		this.length = 1;
		// this.moveInterval = setInterval(this.moveHandler, this.speed*1000);
		this.isDead = false;

		this.update = function()
			{
				//----For each body part, do this..
				this.body.forEach(o =>{
					ctx.fillStyle = this.color;
					ctx.fillRect(o.x, o.y, this.width, this.height);

				})

				
			}
		this.moveHandler = function()
			{
				
				var headPosition = snake.body[0];

				var headX = headPosition.x;
				var headY = headPosition.y;
				

				if (!snake.isDead && snake.bodyCount === snake.body.length) // works without second argument
					{

						//moves whole body once
							

								switch(snake.direction)	
									{

										case "up":
										headX -= 20;
										snake.body.push({"y": headY, "x":headX});
										snake.body.pop();
										break;

										case "down":
										headX += 20;
										snake.body.push({"y": headY, "x":headX});
										snake.body.pop();
										break;

										case "left":
										headY -= 20;
										snake.body.push({"y": headY, "x":headX});
										snake.body.pop();
										break;

										case "right":
										headY += 20;
										snake.body.unshift({"y": headY, "x":headX});
										// snake.body.pop();
										
										break;
									}
								checkAllPositions();
						
					} 
				else if (!snake.isDead && snake.bodyCount != snake.body.length)
					{


						// moves only the head once, leaves the rest of the body where it was.
						// until bodyCount and bodyLength match up..
						function moveHead()
							{
								switch(snake.direction)	
									{
										case "up":
										headX -= 20;
										snake.body.push({"y": headY, "x":headX});
										break;

										case "down":
										headX += 20;
										snake.body.push({"y": headY, "x":headX});
										break;

										case "left":
										headY -= 20;
										snake.body.push({"y": headY, "x":headX});
										break;

										case "right":
										headY += 20;
										snake.body.push({"y": headY, "x":headX});
										break;
									}
								checkAllPositions();
							}
					}
				else 
					{
						// do not move
					}
					
					



			
				
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
					case "up":
					if (!direction === "down"){}
					direction = dir;
					break;
					case "down":
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
				snake.bodyCount = 1; 
				snake.body = [];		
				snake.x = 260;
				snake.y = 260;
				snake.direction = "right";
				
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
		gameArea.clear();
		snake.update();
		food.update();
		//update the same as snake speed interval



	}

function checkAllPositions()
	{
		var head = snake.body[0];
		var canvasX = gameArea.canvas.height;
		var canvasY = gameArea.canvas.width;
		var snakeHasEaten = false;

		//checks colision with food 1st
		if (head.x === food.x && head.y === food.y)
			{
				snake.bodyCount += 5;
				snakeHasEaten = true;
				food.newPosition();
			}
		if(!snakeHasEaten)
			{
				// checks collision with wall 2nd
				if(head.x >= canvasX || head.x <= 0 || head.x >= canvasY || head.x <= 0)
					{snake.isDead = true;}

				if(!snake.isDead)
				{
					//checks colision with body <<<<<<< do this last since it will take longest, and if already dead or position is food, no need to check this
					snake.body.forEach(o => {
						if (snake.body.indexOf(o) != 0)	//if item compared is not the first one
							{ 
								if(o.x === head.x && o.y === head.y ) // if position of part of body === position of head
									{snake.isDead = true;}
							}
					})
				}
			}
	}