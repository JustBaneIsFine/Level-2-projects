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
var invaders;
var score;
var playerBullet;
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
			invaders = new invaders(40,20,"red", 260,260);
			player = new player(50,20,"green",400,460);
			this.canvas.width = 800;
			this.canvas.height = 500;
			var tempLeft;
			var tempRight;
			this.context = this.canvas.getContext("2d");
			this.canvas.style = "background-color: white";
			document.body.childNodes[3].insertBefore(this.canvas, document.body.childNodes[3].childNodes[0]);
			this.gameInterval = setInterval(updateGameArea,1000/120);

				window.addEventListener("keydown", function(e)
					{
						console.log("down ran")
						if (e.keyCode === 37 || e.keyCode === 65)
							{
								player.speedX = -3;
							} 
						else if (e.keyCode === 39 || e.keyCode === 68)
							{
								player.speedX= 3;
							}
						else if (e.keyCode === 32){
							player.fireBullet();
							pBulletFired = true;
						}

					});
				window.addEventListener("keyup", function(e){
					console.log("up ran");
						if (e.keyCode === 37 || e.keyCode === 65)
							{
								player.speedX = 0;
							} 
						else if (e.keyCode === 39 || e.keyCode === 68)
							{
								player.speedX = 0;
							};

						})
						// if (tempLeft != undefined || tempRight != undefined){player.changeDirection(temp)};
			
					


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
				var middle = this.x + 20;
				playerBullet = new playerBullet(middle,this.y);
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

function invaders(width, height,color,x,y)
	{
	};

function playerBullet(x,y)	
	{
		this.width = 5;
		this.height = 15;
		this.x = x;
		this.y = y;
		this.speed = 5;

							
		this.update = function()
			{
				ctx.fillStyle = "red";
				ctx.fillRect(playerBullet.x, playerBullet.y,playerBullet.width,playerBullet.height);
			}
		this.updatePosition = function()
			{
				playerBullet.y -= 5;
			}
		this.checkPosition = function()
			{


				if (playerBullet.y < 0){
					deleteBullet();
					pBulletFired = false;
				};

				function deleteBullet()
					{
						playerBullet = undefined;
						console.log("it raAAn")
					}

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
		// if (playerBullet === fired){playerBulletUpdate()};
		// if (invadersBullet === fired){invadersBulletUpdate()};


		// invaders.updatePosition();
		// invaders.update();
		
		player.updatePosition();
		player.update();
		if(pBulletFired)
			{
				playerBullet.update();
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

