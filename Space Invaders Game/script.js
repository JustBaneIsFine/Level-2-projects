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
var player;
var invade;
var invaders = [[],[],[],[],[]];

var playerBullet;
var playerBullets = [];
var invaderBullet;
var invadersBullets = [];
var pBulletFired = false;
var invaderBulletCount = 500;

var leftMostInvader = 0;
var rightMostInvader = 0;
var lowestInvader = 0;


window.onload = () => 
	{
		gameArea.start();
		highscoreBox.innerHTML =  JSON.parse(storage.getItem("store"));
	}




var gameArea = 
	{
		canvas: document.createElement("canvas"),
		start: function ()
			{
				invade = new invader();
				invaderBullet = new invadersBullet();
				this.invaderBulletInterval = setInterval(invaderBullet.generateBullet,invaderBulletCount);
				player = new player(50,20,"green",400,460);
				playerBullet = new playerBullet(0,0);
				this.gameInterval = setInterval(updateGameArea,1000/120);

				this.canvas.width = 800;
				this.canvas.height = 500;
				this.context = this.canvas.getContext("2d");
				this.canvas.style = "background-color: white";
				document.body.childNodes[3].insertBefore(this.canvas, document.body.childNodes[3].childNodes[0]);
				
				this.keys = 
					{
						 37: {pressed: false, func: function(){player.speedX = -Math.abs(player.moveSpeed)}},
						 65: {pressed: false, func: function(){player.speedX = -Math.abs(player.moveSpeed)}},  
						 39: {pressed: false, func: function(){player.speedX= Math.abs(player.moveSpeed)}},  
						 68: {pressed: false, func: function(){player.speedX= Math.abs(player.moveSpeed)}},
						 32: {pressed: false, func: function(){player.fireBullet()}}
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

function invader()
	{	
		
		this.moveDirection = 1.5;
		
		var counterX = 150;
		var counterY = 30; 
		var counterLeft= 150;
		var counterRight = 190;
		var counterTop = 30;
		var counterBottom = 50;

		this.drawInvaders = function()
			{
				//for each column create 10 invaders
				invaders.forEach(column =>{

					for (i=0;i<10;i++){

					column.push({
					"x": counterX,
					"y":counterY,
					"left":counterLeft,
					"right":counterRight,
					"top":counterTop,
					"bottom":counterBottom
					});

					counterX += 50;
					counterLeft +=50;
					counterRight+=50;

					if(i === 9) 				//if it's the last row
						{
							counterY += 30;
							counterTop += 30;
							counterBottom +=30; 
							counterX = 150;
							counterRight = 190;  //return to starting horizontal point 
						}

				}})	
			}
		this.drawInvaders();
		
		this.render = function()
			{
				//draws each invader
				invaders.forEach(column =>{
					column.forEach(invader =>{

						// for each invader, draw invader
						ctx.fillStyle = "red";
						ctx.fillRect(invader.x,invader.y,40,20);

					})

				})
			}
		this.moveHandler = function()
			{
			//If all to the left or right, change direction and go down one step
				if(findRightMost() > 760)
					{
						invade.moveDirection = -Math.abs(invade.moveDirection);
						invaders.forEach(column =>{

						column.forEach(invader=>{

						invader.y += 10;
						invader.top += 10;
						invader.bottom += 10;
						})
					rightMostInvader = 0;

					})


					}
				else if (findLeftMost() < 0) //if LeftMost invader is less than 0
					{
						invade.moveDirection = Math.abs(invade.moveDirection);

						invaders.forEach(column =>{

						column.forEach(invader=>{

						invader.y += 10;
						invader.top += 10;
						invader.bottom += 10;

						})})
						leftMostInvader = 0;
					}			//test			//<<<<<<<<<<<<<<< THIS IS WHERE YOU LEFT OF <<<<<<<<<<<<<<<<<<<<<<

				if(findLowest()>440) // if lowest is lower than player GAME OVER
					{
						

						this.resetAll()
						leftMostInvader = 0;
						rightMostInvader = 0;
						lowestInvader = 0;
						player.death();
						return;
					}

			//functions
				function findLeftMost()
					{

						invaders.forEach(column =>{
							if(column[0]!= undefined){
							if(column[0].x<leftMostInvader)
								{
									leftMostInvader = column[0].x;
								}

						}});
						return leftMostInvader;
					}
				function findRightMost()
					{

						invaders.forEach(column =>{
							if(column[column.length-1] != undefined){
							if(column[column.length-1].x>rightMostInvader)
								{
									rightMostInvader = column[column.length-1].x;
								}
							else if (column[column.length-1].x === undefined){
								// do nothing
								}
						}});



						return rightMostInvader;
					}

				function findLowest()
					{

						invaders.forEach(column =>{
							if(column[0] != undefined){
							if(column[0].y>lowestInvader)
								{
									lowestInvader = column[0].y;
								} 
							else if(column[0].y === undefined)
								{};
						}});
						return lowestInvader;

					}




			}
		this.move = function()
			{
				invaders.forEach(column =>{

					column.forEach(invader=>{

						invader.x += invade.moveDirection;
						invader.left = invader.x;
						invader.right += invade.moveDirection;

						})

					})
			}
		this.resetAll = function()
			{
				counterX = 150;
				counterY = 30; 
				counterLeft= 150;
				counterRight = 190;
				counterTop = 30;
				counterBottom = 50;
				this.moveDirection = 1.5;
				invaders = [[],[],[],[],[]];
			}
		
	};

function playerBullet(x,y)
	{				
		this.render = function()
			{
				playerBullets.forEach(b => {
					if(b.x != 0 || b.y != 0)
						{
							// render bullet
							ctx.fillStyle = "red";
							ctx.fillRect(b.x, b.y,5,15);
						}
				})
			}
		this.updatePosition = function()
			{
				playerBullets.forEach(b => {
					b.y -= 5;

				})
			}
		this.checkPosition = function()
			{
				if (playerBullets.length === 0)
					{
						pBulletFired = false;
					} 
				else 
					{
					 	playerBullets.forEach(b => {
						 	if(b.y < 0){
						 		playerBullet.deleteBullet(playerBullets.indexOf(b));
						 	} 
					 	})
					}

			}
		this.deleteBullet = function(index)
			{
				playerBullets.splice(index,1);
			}
		this.collisionDetection = function()
			{
				// for each bullet
				// if bullet position is the same as invader
				// delete bullet and invader
				// increase score 

				playerBullets.forEach(b => {
					invaders.forEach(column => {

						column.forEach(invader=>{
							if(b.x > invader.left && b.x+5 < invader.right && b.y < invader.bottom && b.y+15 > invader.top){


								// do something with that bullet and that invader..
								var indexBullet = playerBullets.indexOf(b);
								playerBullet.deleteBullet(indexBullet);

								if(column.indexOf(invader) != -1)
									{
										column.splice(column.indexOf(invader),1);
									}
								
								
								score += 1;
								
							}

						})
					})

				})
			}
	
	}

function invadersBullet()
	{
		this.bulletSpeed = 5;
		this.generateBullet = function()
			{
				// generates a random number in range(0 to invaderCount)
				// matches that number with the invader that will shoot.

				
				var invaderCount = 0;
				
				invaders.forEach(column=> {
					column.forEach(invader => invaderCount+=1)
				})

				if(invaderCount != 0){
					var random = randomInteger(0,invaderCount); //5
					var counter = 0;
					var exit = false;

					invaders.forEach(column=> {
						if(exit){return};
						column.forEach(invader => {
							if(exit){return};
							if (counter === random)
								{

									invadersBullets.push({"x":invader.x+20,"y":invader.y+10})
									//this invader fires bullet
									exit = true;
								}

							counter+=1;
						})
					})
				} else if (invaderCount === 0){player.newLevel()};


			}
		this.render = function()
			{
				invadersBullets.forEach(b => {
					if(b.x != 0 || b.y != 0)
						{
							ctx.fillStyle = "red";
							ctx.fillRect(b.x, b.y,5,15);
						}
				})
			}
		this.updatePosition = function()
			{
				invadersBullets.forEach(b => {
					b.y += this.bulletSpeed;

				})
			}
		this.checkPosition = function()
			{
				 invadersBullets.forEach(b => {
				 	if(b.y > 500){
				 		invaderBullet.deleteBullet(invadersBullets.indexOf(b));
				 	}})
			}
		this.deleteBullet = function(index)
			{
				invadersBullets.splice(index,1);
			}
		this.collisionDetection = function()
			{
				invadersBullets.forEach(b => {
							if(b.x+5 > player.left && b.x < player.right && b.y < player.bottom && b.y+15 > player.top){
								var indexBullet = invadersBullets.indexOf(b);
								invaderBullet.deleteBullet(indexBullet);
								player.death();
							}})
			}			
	
	}

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