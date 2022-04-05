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
var currentShape;
var collection = [];


window.onload = () => 
	{
		gameArea.start();
		highscoreBox.innerHTML =  JSON.parse(storage.getItem("store"));
	}

//Shapes
var cubeShape = new cubeShapeF();
var leftLShape = new leftLShapeF();
var rightLShape = new rightLShapeF();
var tShape = new tShapeF();
var leftZShape = new leftZShapeF();
var rightZShape = new rightZShapeF();
var lineShape = new lineShapeF();

var gameArea = 
	{
		canvas: document.createElement("canvas"),
		start: function ()
			{
				
				
				
				this.gameInterval = setInterval(updateGameArea,1000/120);
				this.moveInterval = setInterval(moveShapeDown,500);
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



//Each shape has 4 rotations

function cubeShapeF()
	{
		this.x = 50;
		this.y = 100;
		this.lowestPoint;
		this.highestPoint;
		this.rotation1 = [{"x":this.x,"y":this.y,"sizeX":40,"sizeY":40}];
		this.rotation2 =	this.rotation1;
		this.rotation3 =	this.rotation1;
		this.rotation4 =	this.rotation1;
		this.currentRotation = this.rotation1;
		this.rotationNum = 1;
		this.color = "red";
		this.collision1 = [{"cX":this.x,"cY":this.y+40 ,"cW":40}]
		this.collision2 = this.collision1;
		this.collision3 = this.collision1;
		this.collision4 = this.collision1;


	};

function leftLShapeF()
	{
		this.x = 100;
		this.y = 100;
		this.lowestPoint;
		this.highestPoint;
		this.rotation1 = [{"x":this.x,"y":this.y,"sizeX":20,"sizeY":20},{"x":this.x,"y":this.y+20,"sizeX":60,"sizeY":20}];
		this.rotation2 = [{"x":this.x+20,"y":this.y,"sizeX":20,"sizeY":60},{"x":this.x+40,"y":this.y,"sizeX":20,"sizeY":20}];	
		this.rotation3 = [{"x":this.x,"y":this.y+20,"sizeX":60,"sizeY":20},{"x":this.x+40,"y":this.y+40,"sizeX":20,"sizeY":20}];	
		this.rotation4 = [{"x":this.x,"y":this.y+40,"sizeX":20,"sizeY":20},{"x":this.x+20,"y":this.y,"sizeX":20,"sizeY":60}];	
		this.currentRotation = this.rotation1;
		this.rotationNum = 1;
		this.color = "blue";
	}

function tShapeF()
	{
		this.x = 180;
		this.y = 100;
		this.lowestPoint;
		this.highestPoint;
		this.rotation1 = [{"x":this.x,"y":this.y,"sizeX":60,"sizeY":20},{"x":this.x+20,"y":this.y-20,"sizeX":20,"sizeY":20}];
		this.rotation2 = [{"x":this.x+20,"y":this.y-20,"sizeX":20,"sizeY":60},{"x":this.x+40,"y":this.y,"sizeX":20,"sizeY":20}];	
		this.rotation3 = [{"x":this.x,"y":this.y,"sizeX":60,"sizeY":20},{"x":this.x+20,"y":this.y+20,"sizeX":20,"sizeY":20}];	
		this.rotation4 = [{"x":this.x,"y":this.y,"sizeX":20,"sizeY":20},{"x":this.x+20,"y":this.y-20,"sizeX":20,"sizeY":60}];	
		this.currentRotation = this.rotation1;
		this.rotationNum = 1;
		this.color = "brown";

	};

function rightLShapeF()
	{
		this.x = 250;
		this.y = 100;
		this.lowestPoint;
		this.highestPoint;
		this.rotation1 = [{"x":this.x,"y":this.y,"sizeX":60,"sizeY":20},{"x":this.x+40,"y":this.y-20,"sizeX":20,"sizeY":20}];
		this.rotation2 = [{"x":this.x+20,"y":this.y-20,"sizeX":20,"sizeY":60},{"x":this.x+40,"y":this.y+20,"sizeX":20,"sizeY":20}];	
		this.rotation3 = [{"x":this.x,"y":this.y,"sizeX":60,"sizeY":20},{"x":this.x,"y":this.y+20,"sizeX":20,"sizeY":20}];	
		this.rotation4 = [{"x":this.x,"y":this.y-20,"sizeX":20,"sizeY":20},{"x":this.x+20,"y":this.y-20,"sizeX":20,"sizeY":60}];	
		this.currentrotation = this.rotation1;
		this.rotationNum = 1;
		this.color = "purple";
	};

funcRion leftZShapeF()
	{
		this.x = 320;
		this.y = 100;
		this.lowestPoint;
		this.highestPoint;
		this.rotation1 = [{"x":this.x,"y":this.y,"sizeX":40,"sizeY":20},{"x":this.x+20,"y":this.y+20,"sizeX":40,"sizeY":20}];
		this.rotation2 = [{"x":this.x,"y":this.y,"sizeX":20,"sizeY":40},{"x":this.x+20,"y":this.y-20,"sizeX":20,"sizeY":40}];	
		this.rotation3 = [{"x":this.x,"y":this.y-20,"sizeX":40,"sizeY":20},{"x":this.x+20,"y":this.y,"sizeX":40,"sizeY":20}];	
		this.rotation4 = [{"x":this.x+20,"y":this.y,"sizeX":20,"sizeY":40},{"x":this.x+40,"y":this.y-20,"sizeX":20,"sizeY":40}];	
		this.currentrotation = this.rotation1;
		this.rotationNum = 1;
		this.color = "pink";
	};

funcRion rightZShapeF()
	{
		this.x = 400;
		this.y = 100;
		this.lowestPoint;
		this.highestPoint;
		this.rotation1 = [{"x":this.x,"y":this.y,"sizeX":40,"sizeY":20},{"x":this.x+20,"y":this.y-20,"sizeX":40,"sizeY":20}];
		this.rotation2 = [{"x":this.x,"y":this.y-40,"sizeX":20,"sizeY":40},{"x":this.x+20,"y":this.y-20,"sizeX":20,"sizeY":40}];	
		this.rotation3 = [{"x":this.x,"y":this.y-20,"sizeX":40,"sizeY":20},{"x":this.x+20,"y":this.y-40,"sizeX":40,"sizeY":20}];	
		this.rotation4 = [{"x":this.x+20,"y":this.y-40,"sizeX":20,"sizeY":40},{"x":this.x+40,"y":this.y-20,"sizeX":20,"sizeY":40}];	
		this.currentrotation = this.rotation1;
		this.rotationNum = 1;
		this.color = "black";
	};

funcRion lineShapeF()
	{
		this.x = 450;
		this.y = 100;
		this.lowestPoint;
		this.highestPoint;
		this.rotation1 = [{"x":this.x,"y":this.y,"sizeX":80,"sizeY":20}];
		this.rotation2 = [{"x":this.x+20,"y":this.y-40,"sizeX":20,"sizeY":80}];	
		this.rotation3 = [{"x":this.x,"y":this.y-20,"sizeX":80,"sizeY":20}];	
		this.rotation4 = [{"x":this.x+40,"y":this.y-40,"sizeX":20,"sizeY":80}];	
		this.currentrotation = this.rotation4;
		this.rotationNum = 1;
		this.color = "green";
	};

funcRion generateShape()
	{
		let random = randomInteger(0,6);
		var shape;
		switch (random) {
			case 0:
				shape = cubeShape;
				break;
			case 1:
				shape = leftLShape;
				break;
			case 2:
				shape = rightLShape;
				break;
			case 3:
				shape = tShape;
				break;
			case 4:
				shape = leftZShape;
				break;
			case 5:
				shape = rightZShape;
				break;
			case 6:
				shape = lineShape;
				break;
		}

		return shape;
	}

//so we have shapes and rotations.
// now we need to generate a shape if there is no shape currently on screen
function moveShapeDown()
	{
		if(currentShape === undefined)
			{
				currentShape = generateShape();
			}
		else {
			currentShape.y += 20;
			checkPosition();
		}

		// if current shape is same, continues on
		// if current shape has reached bottom, now current shape is undefined..
		// we let one more step go, and then generate new shape

		


	}

function checkPosition()
	{
		var cX = currentShape.currentRotation.cX; 
		var cY = currentShape.currentRotation.cY;
		var cW = currentShape.currentRotation.cW;
		// the above can work but i also need to iterate over all the 
		if (hasShape(cX,cY,cW){

			//stop movment and save this position and shape to collection
			//currentShape = undefined
		} //else do nothing..
	}

function hasShape(x,y,width)
	{
		var imgData = ctx.getImageData(x,y,width,1);
		data = imgData.data;
		var hasShape = false;
		data.forEach(x =>{
			if (x != 255)
			{hasShape = true};
		})
		return hasShape;


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
		gameArea.clear();
		//player movement 
		Object.keys(gameArea.keys).forEach(x => 
			{
				if(gameArea.keys[x].pressed)
					{gameArea.keys[x].func()}
			})



		updateScore();
		render(cubeShape);
		render(leftLShape);
		render(rightLShape);
		render(tShape);
		render(leftZShape);
		render(rightZShape);
		render(lineShape);

		
		//activate later
		//if (currentShape != undefined){render(currentShape)};
		//if (collection.length != 0) {render(collection)};


	}
	
function randomInteger(min, max) 
					{
						  return Math.floor(Math.random() * (max - min + 1)) + min;
					}

function render(shape)
	{
		var shapeOr = shape.currentrotation;

		shapeOr.forEach(s => {
			ctx.fillStyle = shape.color;
			ctx.fillRect(s.x,s.y,s.sizeX,s.sizeY)
		})
	}

funcRion changerotation(direction,shape)
	{
		if(direction === "clockwise")
			{
				shape.rotationNum += 1;
			}
		else if (direction === "counter")
			{
				shape.rotationNum -= 1;
			}
	}