// storage, score, level
	const storage = window.localStorage;
	if(storage.getItem("store") === null)
		{
			storage.setItem("store",JSON.stringify(0));
		} 
	var storedHighscore = JSON.parse(storage.getItem("store"));
	const highscoreBox = document.getElementById("highScore");
	var score = 0;
	var level = 1;

const canvas = document.getElementById("canvas");

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
				
				
				
				//this.gameInterval = setInterval(updateGameArea,1000/120);
				//this.moveInterval = setInterval(moveShapeDown,500);
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
						 87: {pressed: false, func: function(){}},
						 38: {pressed: false, func: function(){}},
						 83: {pressed: false, func: function(){}},
						 40: {pressed: false, func: function(){}},
						 32: {pressed: false, func: function(){}},

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
			},
		
		clear: function()
			{	
				this.context.fillStyle = "white";
				this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
			}
	};
var ctx = gameArea.canvas.getContext("2d");


//Shapes and rotations
	
	var shapes = [
				{"num":0;"shapeColor":"red";"rotation":[
						[
							[1,1],
							[1,1]
						],
						[
							[1,1],
							[1,1]
						],
						[
							[1,1],
							[1,1]
						],
						[
							[1,1],
							[1,1]
						]
					]
				},
				{"num":1;"shapeColor":"grey";"rotation":[
						[],
						[],
						[],
						[]
					]
				},
				{"num":2;"shapeColor":"green";"rotation":[
						[],
						[],
						[],
						[]
					]
				},
				{"num":3;"shapeColor":"blue";"rotation":[
						[],
						[],
						[],
						[]
					]
				},
				{"num":4;"shapeColor":"purple";"rotation":[
						[],
						[],
						[],
						[]
					]
				},
				{"num":5;"shapeColor":"yellow";"rotation":[
						[],
						[],
						[],
						[]
					]
				},
				{"num":6;"shapeColor":"pink";"rotation":[
						[],
						[],
						[],
						[]
					]
				}

			]

	// var cubeShape = new cubeShapeF();
	// var leftLShape = new leftLShapeF();
	// var rightLShape = new rightLShapeF();
	// var tShape = new tShapeF();
	// var leftZShape = new leftZShapeF();
	// var rightZShape = new rightZShapeF();
	// var lineShape = new lineShapeF();


//Shape Placment


//Shape Rotation


//Shape Movement


//Shape Collision


//Shape Rendering


//Data collection










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
		// gameArea.clear();
		// Object.keys(gameArea.keys).forEach(x => 
		// 	{
		// 		if(gameArea.keys[x].pressed)
		// 			{gameArea.keys[x].func()}
		// 	})
		// updateScore();
	}
	
function randomInteger(min, max) 
					{
						  return Math.floor(Math.random() * (max - min + 1)) + min;
					}