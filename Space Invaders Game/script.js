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
var invadersBullet;
var pBulletFired = false;

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
		this.isDead = false;

		this.update = function()
			{
				ctx.fillStyle = color;
				ctx.fillRect(player.x, player.y,player.width,player.height);
			}
		this.updatePosition = function () 
			{
				this.x += player.speedX;
				this.y += player.speedY;

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
					//start new game
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
				
				player.isDead = false;
				
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
		invaders.forEach(column =>{

			for (i=0;i<10;i++){

				column.push({"x": counterX,"y":counterY}); // add new invader to this row

				counterX += 50;	 // move to the right

				if(i === 9) 				//if it's the last row
					{
						counterY += 30;	 //move down 30px
						counterX = 150;  //return to starting horizontal point 
					}

			}
		})	
		
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
				//if not dead
				//if gameStart
				// for each invader, move 
				// if last invader on right is too far, switch movement direction and lower down
				if(invaders[0][9].x > 760)
					{invade.moveDirection = -1.5}
				else if (invaders[0][0].x < 0)
					{invade.moveDirection = 1.5}			//test			//<<<<<<<<<<<<<<< THIS IS WHERE YOU LEFT OF <<<<<<<<<<<<<<<<<<<<<<



			}
		this.move = function()
			{
				invaders.forEach(column =>{

					column.forEach(invader=>{

						invader.x += invade.moveDirection;
						})

					})
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

				
				// for each bullet, check if y position is less than 0
				// if so, get index and delete that bullet

				// if (playerBullet.y < 0){
				// 	deleteBullet();
				// 	pBulletFired = false;
				// 	console.log("it raAAn");
				// };

				// function deleteBullet()
				// 	{
				// 		playerBullet = undefined;
				// 		console.log("it del");
				// 	}

			}
		this.deleteBullet = function(index)
			{
				playerBullets.splice(index,1);
			}
		
	
}

function invadersBullet()
	{

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

