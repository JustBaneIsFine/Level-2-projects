const storage = window.localStorage;

// if no storage, create storage
if(storage.getItem("store") === null)
	{
		storage.setItem("store",JSON.stringify(0));

	} 

var storedHighscore = JSON.parse(storage.getItem("store"));


const highscoreBox = document.getElementById("highScore");

const canvas = document.getElementById("canvas");

var player;
var invade;
var invaders = [[],[],[],[],[]];
var score;
var playerBullet;
var playerBullets = [];
var invaderBullet;
var invadersBullets = [];
var pBulletFired = false;
var iBulletFired = false;
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
			// for invaderSpeed that is slower (classical step by step move)
			//this.invaderInterval = setInterval(invade.move,500);
			invaderBullet = new invadersBullet();
			this.invaderBulletInterval = setInterval(invaderBullet.generateBullet,500)
			player = new player(50,20,"green",400,460);
			playerBullet = new playerBullet(0,0)
			this.canvas.width = 800;
			this.canvas.height = 500;
			var tempLeft;
			var tempRight;
			this.context = this.canvas.getContext("2d");
			this.canvas.style = "background-color: white";
			document.body.childNodes[3].insertBefore(this.canvas, document.body.childNodes[3].childNodes[0]);
			this.gameInterval = setInterval(updateGameArea,1000/120);
			this.keys = 
				{
					 37: {pressed: false, func: function(){player.speedX = -3}},
					 65: {pressed: false, func: function(){player.speedX = -3}},  
					 39: {pressed: false, func: function(){player.speedX= 3}},  
					 68: {pressed: false, func: function(){player.speedX= 3}},
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

		this.update = function()
			{
				ctx.fillStyle = color;
				ctx.fillRect(player.x, player.y,player.width,player.height);
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
				if(!pBulletFired)
					{
						var middle = this.x + 20;
						var middleTop = this.y -15;
						playerBullets.push({"x":middle,"y":middleTop})
						pBulletFired = true;
						setTimeout(()=>pBulletFired=false,100); //sets the amount of bullets that can be fired in a given time..
					} 
				else 
					{
						console.log("there is already a bullet");
					}
				
				

			}

		this.death = function()
			{
				
				var result = confirm("Do you want to play again? Your score is: " + score); 
				if (result === true)
					{
						player.newGame();
					//start new game
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


			}
		this.newGame = function()
			{
				//reset all stats and start the game again
				invade.resetAll();
				invade.drawInvaders();
				playerBullets = [];
				invadersBullets = [];
				gameArea.keys.forEach(x => x.pressed = false);

				
			}
	};

function invader()
	{	
		
		this.moveDirection = 1.5 // positive goes right, negative goes left
		// invaderCount =  50;
		// horizontal = 10;
		// vertical = 5;
		
		var counterX = 150;
		var counterY = 30; 
		var counterLeft= 150;
		var counterRight = 190;
		var counterTop = 30;
		var counterBottom = 50;

		this.drawInvaders = function()
			{
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
			
				if(findRightMost() > 760) //if RightmostInvader is further than 760
					{
						invade.moveDirection = -1.5;
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
						invade.moveDirection = 1.5;

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
						console.log("gameOver");

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
								{console.log("it's undefined")};
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
				if (playerBullets.length === 0){
					pBulletFired = false;
				} else 
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
								
								
								console.log("SHOT");
							}

						})
					})
					
					//if bullet position === invader position (get invaders sides, bottom, left, right and top >> look at ping pong game)
					//Delete invader (in future maybe add health) and delete bullet.
				})
			}
	
	}

function invadersBullet()
	{
		this.generateBullet = function()
			{
				//1. we need to choose which invader will shoot..
				// so we need to take all the available invaders, and choose from them..
				// generate a random number in the available range
				console.log("ran");
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
				}


			}
		this.render = function()
			{
				invadersBullets.forEach(b => {
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
				invadersBullets.forEach(b => {
					b.y += 5;

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
								console.log("hit");

								// do something with that bullet and that invader..
								var indexBullet = invadersBullets.indexOf(b);
								invaderBullet.deleteBullet(indexBullet);

								player.death();
							}})
			}			
	
	}

function updateScore()
	{
		// score = >>>> score is the difference of remaining vs all the invaders..
		// times the level. if lvl 1 score = 1*score..
		// if lvl 2, score = 2*score etc...
		//levels differ only on invader speed and their bullet speed

		// ctx.font = "20px Arial";
		// ctx.fillStyle= "red";
		// ctx.fillText(score, 700/2,20);

	};

function updateGameArea()
	{

		
		gameArea.clear();
		invade.render();
		invade.move();
		invade.moveHandler();

		// if (playerBullet === fired){playerBulletUpdate()};
		// if (invadersBullet === fired){invadersBulletUpdate()};


		// invaders.updatePosition();
		// invaders.update();

		Object.keys(gameArea.keys).forEach(x => {  if(gameArea.keys[x].pressed){gameArea.keys[x].func();};
		})	
		player.updatePosition();
		player.update();

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
		
		;

		// updateScore();


	}

function checkAllPositions()
	{
	
	}
	
function increaseSpeed()
	{
	};

function randomInteger(min, max) 
					{
						  return Math.floor(Math.random() * (max - min + 1)) + min;
					}