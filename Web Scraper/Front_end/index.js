import {sortPriceAsc,sortPriceDesc,sortNameAsc,sortNameDesc,sortYearAsc,sortYearDesc} from './sorting.js';
var storage = window.localStorage;


window.onload = ()=>
	{
		var inputs = document.getElementsByTagName('input');
		for (var i=0;i<inputs.length;i++)
			{
				inputs[i].value = '';
			}

	}



// *change*
// change the names of the variables to be more understandable, what is what..
var alerted = false;
var requestSent = false;

var buttonTest = document.getElementById('testDisplay');
buttonTest.addEventListener('click',testDisplay);


var makeP = document.getElementById("makeP");
var modelP = document.getElementById("modelP");
var yearPstart = document.getElementById("yearOptionsPstart");
var yearPend = document.getElementById("yearOptionsPend");

var makeK = document.getElementById("makeK");
var modelK = document.getElementById("modelK");
var yearKstart = document.getElementById("yearOptionsKstart");
var yearKend = document.getElementById("yearOptionsKend");

var makeOptionsP = document.getElementById("makeOptionsP");
var modelOptionsP = document.getElementById("modelOptionsP");
var yearOptionsP = document.getElementById("yearOptionsP");

var makeOptionsK = document.getElementById("makeOptionsK");
var modelOptionsK =document.getElementById("modelOptionsK");
var yearOptionsK = document.getElementById("yearOptionsK");

var yearStartK = document.getElementById('yearKstart');
var yearStartP = document.getElementById('yearPstart');
var yearEndK = document.getElementById('yearKend');
var yearEndP = document.getElementById('yearPend');
var tableSection = document.getElementById('tableSection');


var makeOptions;
var modelOptions;
var yearOptions;

var makeHandled = false;
var modelHandled = false;
var yearHandled = false;

var finalStoredData;


export function getMake()
	{
		console.log('getting make')
		// *change*
		// later we will be able to choose which websites we want
		// for now we have a fixed choice

		var arrayOfWebsites = {1:'polovni',2:'kupujem'};

		var xhr = new XMLHttpRequest();
		xhr.open("POST", "/getMake", true);
		xhr.setRequestHeader('Content-Type', 'application/json');

		xhr.onload = function()
			{
				var makeOptions = JSON.parse(xhr.responseText);
				console.log('got data', makeOptions);
				var optionsArrayK = makeOptions["kupujem"];
				var optionsArrayP = makeOptions["polovni"];
				console.log(makeOptions,"makeOptions return")

				optionsArrayP.forEach(val => {
					var el = document.createElement("option");
					el.value = val;

					makeOptionsP.append(el);
				})

				optionsArrayK.forEach(val => {
					var el = document.createElement("option");
					el.value = val;

					makeOptionsK.append(el);
				})

			}
		xhr.send(JSON.stringify(arrayOfWebsites)); 
		
	}

export function getModel()
	{
		console.log('getting model');

		var arrayOfMake = [];
		arrayOfMake.push(makeP.value);
		arrayOfMake.push(makeK.value);


		var xhr = new XMLHttpRequest();
		xhr.open("POST", "/getModel", true);
		xhr.setRequestHeader('Content-Type', 'application/json');


		xhr.onload = function()
			{
				var modelOptions = JSON.parse(xhr.responseText);
				console.log(modelOptions,'modelOPTIONS RECIEVED  FROM SERVER')
				var optionsArrayP = modelOptions["polovni"];
				var optionsArrayK = modelOptions["kupujem"];

				optionsArrayP.forEach(val => {
					var el = document.createElement("option");
					el.value = val;

					modelOptionsP.append(el);
				})

				optionsArrayK.forEach(val => {
					var el = document.createElement("option");
					el.value = val;

					modelOptionsK.append(el);
				})

			}

		xhr.send(JSON.stringify(arrayOfMake));
	}

export function getYear()
	{
		console.log('getting years')
		var arrayOfModel = [modelP.value,modelK.value]


		var xhr = new XMLHttpRequest();
		xhr.open("POST", "/getYear", true);
		xhr.setRequestHeader('Content-Type', 'application/json');

		xhr.onload = function()
			{

				var yearOptions = JSON.parse(xhr.responseText);
				var Pstart = yearOptions['polovni']['yearStart'];
				var Pend = yearOptions['polovni']['yearEnd'];
				var Kstart = yearOptions['kupujem']['yearStart'];
				var Kend = yearOptions['kupujem']['yearEnd'];
				
				// *change*
				// export this function outside this block of code
				// _______________________________________________

				function createElFromData(appendToMe,data)
					{
						//data is an array as well
						data.forEach(x=>{
							var el = document.createElement('option');
							el.value = x;

							appendToMe.append(el);
						})

					}
				//________________________________________________


				createElFromData(yearPstart,Pstart);
				createElFromData(yearPend,Pend);
				createElFromData(yearKstart,Kstart);
				createElFromData(yearKend,Kend);
				console.log('done appending');
			}

		xhr.send(JSON.stringify(arrayOfModel));
	}


export function getFinalOptions()
	{
		//this function takes the input options and sends them to server
		// upon returning it takes the data and creates tables

		var dataToGet = 
			{
			'polovni':{'make':makeP.value,'model':modelP.value,'yearStart':yearStartP.value,'yearEnd':yearEndP.value},
			'kupujem':{'make':makeK.value,'model':modelK.value,'yearStart':yearStartK.value,'yearEnd':yearEndK.value}
			};

		var xhr = new XMLHttpRequest();
		xhr.open("POST", "/getData", true);
		xhr.setRequestHeader('Content-Type', 'application/json');

		xhr.onload = function()
			{

				var data = JSON.parse(xhr.responseText);
				finalStoredData = data;

				var dataPolovni = sortPriceAsc(data[0]);
				var dataKupujem = sortPriceAsc(data[1]);
				var dataSorted = {"polovni":dataPolovni,"kupujem":dataKupujem};
				
				//save data for testing purposes
				//storage.setItem('test',JSON.stringify(dataSorted));

				//display data
				displayData(dataSorted);

			}

		xhr.send(JSON.stringify(dataToGet));






	}


function getOptions()
	{
		// *change*

		// ________NEW________

		// This function will be the handler that will take most of the load
		// So upon clicking on it, it evaluates the input and if everything is alright
		// it calls the required function (ex. getMake, getModel etc.)

		// If something is off, a seperate function will be run that will alert the user of 
		// what exactly is wrong

		// functions we need:::

		//-checkInput
		//if input is bad run the below function
		
		//---inputErrorHandler
		// inputErrorHandler will alert the user of what exactly is wrong,
		// and highlight the area that needs the users attention...
		//

		//--





		// ________NEW________

		
		/*
			We need to check for multiple things here before we send the request..
			So we will create multiple functions to handle that before sending the request..
			1. check the inputs, if all is there, if something is left out like car model etc, then we don't send data but alert the user
			and if he decides to continue with his selections and clicks on submit again, we can then continue


			2. based on the above selections and checks we send the data to the server
			 something like this:
			
			{
				{
					website: kupujem, carMake: ... , carModel, etc.		
				},
				{
					website: polovni, carMake: ... , carModel, etc.		
				}
			}

			this objects length will tell us if there is one or two websites
			which will impact the size of our list and organization (full width vs half)
			
			then the server reads the data and decides what to do next.

			once the data is returned we can store this data to the web storage where it can be accessed easly
		*/

		if(!requestSent)
			{
			if(inputsAreOkay() || alerted)
				{
					//everything is okay, send request
					var xhr = new XMLHttpRequest();
					xhr.open("POST", "/sentURL", true);
					xhr.setRequestHeader('Content-Type', 'application/json');
					// this is where the response returns
					xhr.onload = function()
						{
							var data=xhr.responseText;
							console.log(data);
						}

					xhr.send(JSON.stringify({
					    "hello1": "its 1!!!",
					    "hello2": "hello2"
					}));

				}
			else 
				{
					if(requiredInputsOkay)
						{
							alert("you are missing some stuff, if you are okay with that submit again");
							alerted = true; 
						}
					else
						{
							alert("you are missing important options, please select something");
							alerted = false;
						}
					//alert user and change alerted status
					
				}

			}
	}


function checkValue(value)
	{
		if(options.includes(value))
			{
				return true;
			}
		else {return false};
	}

function transformToArray(obj)
	{
		var arr = [];

		for(let i=0;i<obj.length;i++)
			{
				arr.push(obj[i].value);
			}

		return arr;
	}

function checkInput(value, array)
	{
		//checks if value matches with anything inside array.
		//returns true if it does
		var matchFound = false;

		array.map(x=>{

			if(!matchFound)
				{
					if(value===x)
					{
						matchFound = true;
					}
				}
			
		})

		return matchFound;

	}


function displayData(arg)
	{
		//takes the data that has been sorted and displays it in either one or two tables on the page.

		console.log(arg.length)
		length = Object.keys(arg).length;

		if (length === 1)
			{
				//example
				createTableBig(arg[0]);
			}
		else if (length === 2)
			{
				//example
				createTableSmall(arg);
			}


		function createTableSmall(data)
			{


				//___create empty tables and organize them, prepare for appending data
				var tableLeft = createEl('table');
				tableLeft.className = 'tableLeft'
				var tableRight = createEl('table');
				tableRight.className = 'tableRight';
				var tRowLeft = createEl('tr');
				var tRowRight = createEl('tr');
				var tNameLeft = createEl('th');
				var tNameRight = createEl('th');
				var tYearLeft = createEl('th');
				var tYearRight = createEl('th');
				var tPriceLeft = createEl('th');
				var tPriceRight = createEl('th');
				var tFuelLeft = createEl('th');
				var tFuelRight = createEl('th');
				var tCCLeft = createEl('th');
				var tCCRight = createEl('th');
				var tKMLeft = createEl('th');
				var tKMRight = createEl('th');

				//_________LEFT TABLE
				tableSection.append(tableLeft);
				tableLeft.append(tRowLeft);
				appendValue(tRowLeft,tNameLeft,'Name');
				appendValue(tRowLeft,tYearLeft,'Year');
				appendValue(tRowLeft,tPriceLeft,'Price');
				appendValue(tRowLeft,tFuelLeft,'Fuel');
				appendValue(tRowLeft,tCCLeft,'CC');
				appendValue(tRowLeft,tKMLeft,'KM');



				//_________RIGHT TABLE
				tableSection.append(tableRight);
				tableRight.append(tRowRight);
				appendValue(tRowRight,tNameRight,'Name');
				appendValue(tRowRight,tYearRight,'Year');
				appendValue(tRowRight,tPriceRight,'Price');
				appendValue(tRowRight,tFuelRight,'Fuel');
				appendValue(tRowRight,tCCRight,'CC');
				appendValue(tRowRight,tKMRight,'KM');

				var dataPolovni = data["polovni"];
				var dataKupujem = data["kupujem"];

				// for each object create element and append to tableLeft/right
				dataPolovni.forEach(x=>{
									//creating elements
						var elementRow = document.createElement('tr');
						var elementName = document.createElement('td')
						var elementYear = document.createElement('td');
						var elementPrice = document.createElement('td');
						var elementFuel = document.createElement('td');
						var elementCC = document.createElement('td');
						var elementKM = document.createElement('td');
						var linkA = document.createElement('a');

						linkA.href = x["href"];
						linkA.innerText = x["Car Name"];
						elementName.append(linkA);
						elementRow.append(elementName);

						//appendValue(elementRow,elementName,x["Car Name"]);
						appendValue(elementRow,elementYear,x["Car Year"]);
						appendValue(elementRow,elementPrice,x["Car Price"]);
						appendValue(elementRow,elementFuel,x["Car Fuel"]);
						appendValue(elementRow,elementCC,x["Car CC"]);
						appendValue(elementRow,elementKM,x["Car KM"]);

						tableLeft.append(elementRow);

				})

				dataKupujem.forEach(x=>{

					//creating elements
						var elementRow = document.createElement('tr');
						var elementName = document.createElement('td');
						var elementYear = document.createElement('td');
						var elementPrice = document.createElement('td');
						var elementFuel = document.createElement('td');
						var elementCC = document.createElement('td');
						var elementKM = document.createElement('td');
						var linkA = document.createElement('a');

						linkA.href = x["href"];
						linkA.innerText = x["Car Name"];
						elementName.append(linkA);
						elementRow.append(elementName);
						
						//appendValue(elementRow,elementName,x["Car Name"]);
						appendValue(elementRow,elementYear,x["Car Year"]);
						appendValue(elementRow,elementPrice,x["Car Price"]);
						appendValue(elementRow,elementFuel,x["Car Fuel"]);
						appendValue(elementRow,elementCC,x["Car CC"]);
						appendValue(elementRow,elementKM,x["Car KM"]);

						tableRight.append(elementRow);
				})

			}
		function createTableBig(data)
			{
				var table = document.createElement('table');
				var tRow = createEl('tr');
				var tName = createEl('th');
				var tYear = createEl('th');
				var tPrice = createEl('th');
				var tFuel = createEl('th');
				var tCC = createEl('th');
				var tKM = createEl('th');

				document.body.append(table);
				table.append(tRow);
				appendValue(tRow,tName,'Name');
				appendValue(tRow,tYear,'Year');
				appendValue(tRow,tPrice,'Price');
				appendValue(tRow,tFuel,'Fuel');
				appendValue(tRow,tCC,'CC');
				appendValue(tRow,tKM,'KM');

				data.forEach(x=>{

					var elementRow = document.createElement('tr');
					var elementName = document.createElement('td');
					var elementYear = document.createElement('td');
					var elementPrice = document.createElement('td');
					var elementFuel = document.createElement('td');
					var elementCC = document.createElement('td');
					var elementKM = document.createElement('td');


					appendValue(elementRow,elementName,x['name']);
					appendValue(elementRow,elementYear,x['year']);
					appendValue(elementRow,elementPrice,x['price']);
					appendValue(elementRow,elementFuel,x['fuel']);
					appendValue(elementRow,elementCC,x['cc']);
					appendValue(elementRow,elementKM,x['km']);

					table.append(elementRow);

				})

			}
		function appendValue(row,object,value)
					{
                		row.append(object);
                		object.innerHTML = value;
					}


	}

function createEl(x)
	{
		return document.createElement(x);
	}

function testDisplay()
	{
		var data = JSON.parse(storage.getItem('test'));


		displayData(data);
	}