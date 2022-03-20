// setting the basic functions i see i will need

// const storage = window.localStorage;

// if(storage.getItem("store") === null)
// 	{
// 		storage.setItem("store",JSON.stringify(0));

// 	} // if no storage, create storage

// var storedHighscore = JSON.parse(storage.getItem("store"));


// const highscoreBox = document.getElementById("highScore");

// const canvas = document.getElementById("canvas");

// var player;
// var invaders;
// var score;



// window.onload = () => 
// 	{
// 		// gameArea.start();
// 		// highscoreBox.innerHTML =  JSON.parse(storage.getItem("store"));
// 	}




// var gameArea = 
// 	{
// 		canvas: document.createElement("canvas"),
// 		start: function ()
// 		{
// 			invader = new invader(20,20,"blue", 260,260);
// 			food = new food(20,20,"green",400,400);
// 			food.newPosition();
// 			this.canvas.width = 700;
// 			this.canvas.height = 500;
// 			this.context = this.canvas.getContext("2d");
// 			this.canvas.style = "background-color: white";
// 			document.body.childNodes[3].insertBefore(this.canvas, document.body.childNodes[3].childNodes[0]);
// 			this.gameInterval = setInterval(updateGameArea,1000/60);
			
			

// 				window.addEventListener("keydown", function(e)
// 					{

// 						var temp;
// 						if (e.keyCode === 38 || e.keyCode === 87){
// 							temp = "up";

// 						} else if (e.keyCode === 40 || e.keyCode === 83){
// 							temp = "down";
// 						} else if (e.keyCode === 37 || e.keyCode === 65){
// 							temp = "left";
// 						} else if (e.keyCode === 39 || e.keyCode === 68){
// 							temp = "right";
// 						};

// 						if (temp != undefined){snake.changeDirection(temp)};
			
// 					})
// 		},
		
// 		clear: function()
// 			{	
// 				this.context.fillStyle = "white";
// 				this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
// 			}
// 	};
// var ctx = gameArea.canvas.getContext("2d");



// // function player(width, height,color,x,y)
// 	{
// 		this.width = width;
// 		this.height = height;
// 		this.color = color;
// 		this.x = x;
// 		this.y = y;
// 		this.isDead = false;

// 		this.update = function()
// 			{
				
// 			}
// 		this.moveHandler = function()
// 			{
				
// 			}
// 		this.changeDirection = function (dir) 
// 			{

// 			}
// 		this.death = function()
// 			{
				


// 				var result = confirm("Do you want to play again? Your score is: " + score); 
// 				if (result === true)
// 					{
// 					//start new game
// 					};
// 				if (score > storedHighscore)
// 					{
// 						storedHighscore = score; 
// 						storage.setItem("store",JSON.stringify(storedHighscore));
// 					};


// 				highscoreBox.innerHTML = JSON.parse(storage.getItem("store")); 


// 			}
// 		this.newGame = function()
// 			{
// 				//reset all stats and start the game again
				
// 				player.isDead = false;
				
// 			}
// 	};

// // function invaders(width, height,color,x,y)
// 	{
// 	};

// // function updateScore()
// 	{
// 		// score = >>>> score is the difference of remaining vs all the invaders..
// 		// times the level. if lvl 1 score = 1*score..
// 		// if lvl 2, score = 2*score etc...
// 		//levels differ only on invader speed and their bullet speed

// 		// ctx.font = "20px Arial";
// 		// ctx.fillStyle= "red";
// 		// ctx.fillText(score, 700/2,20);

// 	};

// // function updateGameArea()
// 	{
// 		// gameArea.clear();
// 		// if (playerBullet === fired){playerBulletUpdate()};
// 		// if (invadersBullet === fired){invadersBulletUpdate()};


// 		// invaders.updatePosition();
// 		// invaders.update();

// 		// player.updatePosition();
// 		// player.update();

// 		// updateScore();


// 	}

// // function checkAllPositions()
// 	{
	
// 	}
	

// // function increaseSpeed()
// 	{
// 	};




// increaseB.addEventListener("click", increaseHandler);
// decreaseB.addEventListener("click", decreaseHandler);