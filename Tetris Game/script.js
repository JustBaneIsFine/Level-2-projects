const storage = window.localStorage;

// if no storage, create storage
if(storage.getItem("store") === null)
	{
		storage.setItem("store",JSON.stringify(0));
	} 



var storedHighscore = JSON.parse(storage.getItem("store"));
const highscoreBox = document.getElementById("highScore");
var score = 0;
const canvas = document.getElementById("canvas");

var level = 1;



window.onload = () => 
	{
		gameArea.start();
		highscoreBox.innerHTML =  JSON.parse(storage.getItem("store"));
	}

//Shapes
var cubeShape = new cubeShapec();
var leftLShape;
var rightLShape;
var tShape;
var leftZShape;
var rightZShape;
var lineShape;

var gameArea = 
	{
		canvas: document.createElement("canvas"),
		start: function ()
			{
				
				
				
				//this.gameInterval = setInterval(updateGameArea,1000/120);

				this.canvas.width = 800;
				this.canvas.height = 500;
				this.context = this.canvas.getContext("2d");
				this.canvas.style = "background-color: white";
				document.body.childNodes[3].insertBefore(this.canvas, document.body.childNodes[3].childNodes[0]);
				
				this.keys = 
					{
						 37: {pressed: false, func: function(){}},
						 65: {pressed: false, func: function(){}},  
						 39: {pressed: false, func: function(){}},  
						 68: {pressed: false, func: function(){}},
						 32: {pressed: false, func: function(){}}
					};
				window.addEventListener("keydown", function(e)
						{
							
							if(gameArea.keys[e.keyCode]){
								gameArea.keys[e.keyCode].pressed = true;
							}

						});
				window.addEventListener("keyup", function(e){
							if(gameArea.keys[e.keyCode]){
								gameArea.keys[e.keyCode].pressed = false;
								player.speedX = 0;
							}
							})


							// if (tempLeft != undefined || tempRight != undefined){player.changeDirection(temp)};
				
						
									//
									//;

			},
		
		clear: function()
			{	
				this.context.fillStyle = "white";
				this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
			}
	};
var ctx = gameArea.canvas.getContext("2d");
var shapeNum = 7;



//Each shape has 4 orientations



function cubeShapeF()
	{
		this.x = 0;
		this.y = 0;
		this.lowestPoint;
		this.highestPoint;
		this.dimension = 20;
		this.orientation1 = [{"x":this.x,"y":this.y},{"x":this.x+20,"y":this.y},{"x":this.x,"y":this.y+20},{"x":this.x+20,"y":this.y+20}];
		this.orientation2 =	orientation1;
		this.orientation3 =	orientation1;
		this.orientation4 =	orientation1;
		this.currentPosition;
	};
function leftLShapeF()
	{
		this.x = 0;
		this.y = 0;
		this.lowestPoint;
		this.highestPoint;
		this.dimens

function tShapeF()ionSmall = 20;
		this.dimensionBig = 60;
		this.shape = [{"x":0,"y":0},{"x":20,"y":0},{"x":0,"y":20},{"x":20,"y":20}];
		this.orientation1 = [{"x":this.x,"y":this.y},{"x":this.x+20,"y":this.y}];
		this.orientation2 =	[{"x":this.x,"y":this.y},{"x":this.x+20,"y":this.y}];
		this.orientation3 =	[{"x":this.x,"y":this.y},{"x":this.x+20,"y":this.y}];
		this.orientation4 =	[{"x":this.x,"y":this.y},{"x":this.x+20,"y":this.y}];
		this.currentPosition 	};

function rightLShapeF()
	{};
	{};

function leftZShapeF()
	{};

function rightZShapeF()
	{};

function lineShapeF()
	{};





function player(width, height,color,x,y)
	{
		this.width = width;
		this.height = height;
		this.color = color;
		this.x = x;
		this.y = y;
		this.speedX = 0;
		this.speedY = 0;
		this.left;
		this.right;
		this.bottom;
		this.top;
		this.bulletTime = 500;
		this.moveSpeed = 3;

		this.update = function()
			{
				ctx.fillStyle = color;
				ctx.fillRect(this.x, this.y,this.width,this.height);
			}
		this.updatePosition = function () 
			{
				this.x += player.speedX;
				this.y += player.speedY;
				this.left = this.x;
				this.right = this.x+40;
				this.bottom = this.y+20;
				this.top = this.y;

			
				if (player.x > 750){player.x = 750}
				else if (player.x < 0){player.x = 0};
			}
		this.fireBullet = function()
			{	
				//generates bullet to be rendered, IF bullet hasn't been fired for a time(bulletTime);
				if(!pBulletFired) 
					{
						var middle = this.x + 20;
						var middleTop = this.y -15;
						playerBullets.push({"x":middle,"y":middleTop})
						pBulletFired = true;
						setTimeout(()=>pBulletFired=false,this.bulletTime); //sets the amount of bullets that can be fired in a given time..
					}
				
				

			}

		this.death = function()
			{
				
				var result = confirm("You died. Want to try again? Your score is: " + score); 
				if (result === true)
					{
						player.newGame();
					}
					else if(result ===false)
					{
						this.death()
					};

				if (score > storedHighscore)
					{
						storedHighscore = score; 
						storage.setItem("store",JSON.stringify(storedHighscore));
					};


				highscoreBox.innerHTML = JSON.parse(storage.getItem("store")); 
				score = 0;
				level = 1;


			}
		this.newGame = function()
			{
				//reset all stats and start the game again
				invade.resetAll();
				invade.drawInvaders();
				playerBullets = [];
				invadersBullets = [];

				//if button was held when player died, clear all movement for the new game
				Object.values(gameArea.keys).forEach(x =>
					{
						x.pressed = false;
						console.log(x);
					})
				this.speedX = 0;
				this.speedY = 0;


				
			}
		this.newLevel = function()
			{
				// resets some stats and increases game speed (bullets, movement...)
				this.newGame();
				invade.moveDirection += 0.5;
				invaderBullet.bulletSpeed += 1;
				invaderBulletCount -= 50;
				player.bulletTime -= 50;
				if (player.bulletTime < 100){
					player.bulletTime = 100;
				}
				player.moveSpeed +=0.5;
				level += 1;


			}
	};




function updateScore()
	{
		ctx.font = "20px Arial";
		ctx.fillStyle= "red";
		ctx.fillText(score, 500,20);
		ctx.font = "20px Arial";
		ctx.fillStyle= "red";
		ctx.fillText("current level: "+ level, 800/4,20);
	};

function updateGameArea()
	{
		//player movement 
		Object.keys(gameArea.keys).forEach(x => 
			{
				if(gameArea.keys[x].pressed)
					{gameArea.keys[x].func()}
			})

		gameArea.clear();
		player.updatePosition();
		player.update();
		invade.render();
		invade.move();
		invade.moveHandler();

		//if there are bullets
		if(playerBullets.length != 0)
			{
				playerBullet.render();
				playerBullet.updatePosition();
				playerBullet.checkPosition();
				playerBullet.collisionDetection();
			}	
		if (invadersBullets.length != 0)
			{
				invaderBullet.render();
				invaderBullet.updatePosition();
				invaderBullet.checkPosition();
				invaderBullet.collisionDetection();

			}

		updateScore();
	}
	
function randomInteger(min, max) 
					{
						  return Math.floor(Math.random() * (max - min + 1)) + min;
					}