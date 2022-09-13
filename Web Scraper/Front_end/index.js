import {sortPriceAsc,sortPriceDesc,sortNameAsc,sortNameDesc,sortYearAsc,sortYearDesc} from './sorting.js';
var storage = window.localStorage;


window.onload = ()=>
	{
		var inputs = document.getElementsByTagName('input');
		for (var i=0;i<inputs.length;i++)
			{
				inputs[i].value = '';
			}
		choiceSelect1.value = "";
		choiceSelect2.value = "";

	selectionHandler(choiceSelect2,'disable');
	}

var alerted = false;
var requestSent = false;

// var buttonTest = document.getElementById('testDisplay');
// buttonTest.addEventListener('click',testDisplay);


var website1;
var website2;
var websiteChoiceCount = 1;
var websiteCounter = 1;
var w1Make = getElement('#make1');
var w1Model = getElement('#model1');
var w1YearStart = getElement('#yearStart1');
var w1YearEnd = getElement('#yearEnd1');

var w1MakeList;
var w1ModelList;
var w1YearStartList;
var w1YearEndList;

var w2Make;
var w2Model;
var w2YearStart;
var w2YearEnd;

var w2MakeList;
var w2ModelList;
var w2YearStartList;
var w2YearEndList;

var tableSection = document.getElementById('tableSection');

var loadingTest = document.querySelector('.loadingTest');
var choiceSection = document.querySelector('.choiceSection'); 
var inputSection = document.querySelector('.inputSection');
var choiceSelect1 = document.querySelector('#select1');
var choiceSelect2 = document.querySelector('#select2');
var confirmButton = document.querySelector('#confirmButton');

confirmButton.addEventListener('click', handleConfirmation);

var choiceSelectSubmit = document.querySelector('#choiceSubmit');
choiceSelectSubmit.addEventListener('click',handleWebsiteChoice)

var choice1Disabled = false;
var choice2Disabled = true;
var choice1Selected = false;
var choice2Selected = false;
var makeConfirmed = false;
var modelConfirmed = false;
var yearStartConfirmed = false;
var yearEndConfirmed = false;
choiceSelect1.addEventListener('change',()=>{
	selectionHandler(choiceSelect1,'disable'); 
	selectionHandler(choiceSelect2,'enable');
	choice1Disabled = true;
	choice2Disabled = false;
	choice1Selected = true;
})

choiceSelect2.addEventListener('change',()=>{
	selectionHandler(choiceSelect2,'disable');
	choice2Disabled = true;
	choice2Selected = true;
})


var makeOptions;
var modelOptions;
var yearOptions;

var makeHandled = false;
var modelHandled = false;
var yearHandled = false;

var finalStoredData;



export function getMake()
	{
		console.log('getting make');
		loadStart();


		// *change*
		// later we will be able to choose which websites we want
		// for now we have a fixed choice
		var arrayOfWebsites;
		if (websiteChoiceCount===2)
			{
				arrayOfWebsites = {1:website1 ,2:website2};
			}
		else
			{
				if (website1 != "")
					{
						arrayOfWebsites = {1:website1};
					}
				else 
					{
						arrayOfWebsites = {1:website2};
					}
			}

		var xhr = new XMLHttpRequest();
		xhr.open("POST", "/getMake", true);
		xhr.setRequestHeader('Content-Type', 'application/json');

		xhr.onload = function()
			{
				loadEnd();
				var makeOptions = JSON.parse(xhr.responseText);
				console.log('got data', makeOptions);
				var w1OptionsArray = makeOptions['web1'];

				w1OptionsArray.forEach(val => {
					var el = document.createElement("option");
					el.value = val;

					w1MakeList.append(el);
				});

				if(websiteChoiceCount===2)
					{
						var w2OptionsArray = makeOptions['web2'];
						w2OptionsArray.forEach(val => {
							var el = document.createElement("option");
							el.value = val;

							w2MakeList.append(el);
						});
					}

			}
		xhr.send(JSON.stringify(arrayOfWebsites)); 
		
	}

export function getModel()
	{
		loadStart();
		console.log('getting model');
		var arrayOfMake = [];


		if (websiteChoiceCount===2)
			{
				arrayOfMake = [w1Make.value,w2Make.value];
			}
		else
			{
				if (website1 != "")
					{
						arrayOfMake = [w1Make.value]
					}
				else 
					{
						arrayOfMake = [w2Make.value]
					}
			}


		var xhr = new XMLHttpRequest();
		xhr.open("POST", "/getModel", true);
		xhr.setRequestHeader('Content-Type', 'application/json');


		xhr.onload = function()
			{
				loadEnd();
				var modelOptions = JSON.parse(xhr.responseText);

				var w1OptionsArray = modelOptions['web1'];
				console.log(modelOptions);
				console.log(website1)
					w1OptionsArray.forEach(val => {
						var el = document.createElement("option");
						el.value = val;

						w1ModelList.append(el);
					})

				if(websiteChoiceCount===2)
					{
						var w2OptionsArray = modelOptions['web2'];
						w2OptionsArray.forEach(val => {
							var el = document.createElement("option");
							el.value = val;

							w2ModelList.append(el);
						})

					}

			}

		xhr.send(JSON.stringify(arrayOfMake));
	}

export function getYear()
	{
		loadStart();
		console.log('getting years')
		var arrayOfModel = [w1Model.value]
		if (websiteChoiceCount === 2)
			{
				arrayOfModel.push(w2Model.value)
			}

		var xhr = new XMLHttpRequest();
		xhr.open("POST", "/getYear", true);
		xhr.setRequestHeader('Content-Type', 'application/json');

		xhr.onload = function()
			{
				loadEnd();
				var yearOptions = JSON.parse(xhr.responseText);
				var w1start = yearOptions['web1']['yearStart'];
				var w1end = yearOptions['web1']['yearEnd'];
				
				createElFromData(w1YearStartList,w1start);
				createElFromData(w1YearEndList,w1end);

				if(websiteChoiceCount === 2)
					{
						var w2start = yearOptions['web2']['yearStart'];
						var w2end = yearOptions['web2']['yearEnd'];

						createElFromData(w2YearStartList,w2start);
						createElFromData(w2YearEndList,w2end);
					}



				console.log('done appending');
			}

		xhr.send(JSON.stringify(arrayOfModel));
	}


export function getFinalOptions()
	{
		loadStart();
		//this function takes the input options and sends them to server
		// upon returning it takes the data and creates tables
		var dataToGet = {};
		dataToGet['web1'] = {'make':w1Make.value,'model':w1Model.value,'yearStart':w1YearStart.value,'yearEnd':w1YearEnd.value};
		if (websiteChoiceCount ===2)
			{
				dataToGet['web2'] = {'make':w2Make.value,'model':w2Model.value,'yearStart':w2YearStart.value,'yearEnd':w2YearEnd.value};
			}

		var xhr = new XMLHttpRequest();
		xhr.open("POST", "/getData", true);
		xhr.setRequestHeader('Content-Type', 'application/json');

		xhr.onload = function()
			{
				var dataSorted = {};
				loadEnd();
				var data = JSON.parse(xhr.responseText);
				console.log(data,'DATA LOADED')
				finalStoredData = data;

				var w1Data = sortPriceAsc(data[0]);
				dataSorted['web1'] = w1Data;

				if (websiteChoiceCount === 2)
					{
						var w2Data = sortPriceAsc(data[1]);
						dataSorted['web2'] = w2Data;
					}
				
				//save data for testing purposes
				//storage.setItem('test',JSON.stringify(dataSorted));

				//display data
				inputSection.remove();
				displayData(dataSorted);


			}

		xhr.send(JSON.stringify(dataToGet));






	}


function getOptions()
	{

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
				createTableBig(arg['web1']);
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

				var w1Data = data['web1'];
				var w2Data = data['web2'];

				// for each object create element and append to tableLeft/right
				w1Data.forEach(x=>{
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

				w2Data.forEach(x=>{

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

function getElement(el)
	{
		return document.querySelector(el);	
	}

function testDisplay()
	{
		var data = JSON.parse(storage.getItem('test'));


		displayData(data);
	}

function loadStart()
	{
		loadingTest.innerHTML = '';
		loadingTest.classList.add("loader");
	}

function loadEnd()
	{
		loadingTest.classList.remove("loader");
		loadingTest.innerHTML = 'loaded';
		
	}

function handleWebsiteChoice()
	{
		website1 = choiceSelect1.value;
		website2 = choiceSelect2.value;
		
		if (website1 === "" && website2 === "")
			{
				//alert no choices
				return;
			}

		if (website1 != "" && website2 != "")
			{
				handleInputCreation([website1,website2]);
				websiteChoiceCount = 2;
			}
		else if(website1 != "")
			{
				handleInputCreation([website1]);
				websiteChoiceCount = 1
			}
		else if(website2 != "")
			{
				handleInputCreation([website2]);
				websiteChoiceCount = 1
			}
		choiceSection.remove();
		confirmButton.style.display = "inline-block";

	//create variables

			w1Make = getElement('#make1');
			w1Model = getElement('#model1');
			w1YearStart = getElement('#yearStart1');
			w1YearEnd = getElement('#yearEnd1');

			w1MakeList = getElement('#makeOptions1');
			w1ModelList = getElement('#modelOptions1');
			w1YearStartList = getElement('#yearStartOptions1');
			w1YearEndList = getElement('#yearEndOptions1');

			if(websiteChoiceCount === 2)
				{
					w2Make = getElement('#make2');
					w2Model = getElement('#model2');
					w2YearStart = getElement('#yearStart2');
					w2YearEnd = getElement('#yearEnd2');

					w2MakeList = getElement('#makeOptions2');
					w2ModelList = getElement('#modelOptions2');
					w2YearStartList = getElement('#yearStartOptions2');
					w2YearEndList = getElement('#yearEndOptions2');
				}

		getMake();


	}

function handleInputCreation(array)
	{

		var element1;
		var element2;
		if(array.length>1)
			{
				element1 = createInputField(array[0]);
				websiteCounter++;
				element2 = createInputField(array[1]);
			}
		else
			{
				element1 = createInputField(array[0]);
			}


		inputSection.append(element1);
		if (element2 != undefined)
			{
				inputSection.append(element2);
			}


	}

function createInputField(website)
	{
		
		var websiteName;
		var div = document.createElement('div');
		var label = document.createElement('label');
		var makeEl = createInputBox("make");
		var modelEl = createInputBox("model");
		var yearStartEl = createInputBox("yearStart");
		var yearEndEl = createInputBox("yearEnd");

		if(website === "polovni")
			{
				websiteName = "Polovni Automobili";
			}
		else if(website === "kupujem")
			{
				websiteName = "Kupujem Prodajem";
			}

		label.id = `${website}Label`;
		label.innerText = websiteName;

		div.append(label);
		div.append(makeEl);
		div.append(modelEl);
		div.append(yearStartEl);
		div.append(yearEndEl);

		return div;


		function createInputBox(name)
			{	
				var elName = `${name}${websiteCounter}`;
				var element = document.createElement('div');
				var input = document.createElement('input');
				var dataList = document.createElement('datalist');

				input.id = elName;
				input.setAttribute('list', `${name}Options${websiteCounter}`);
				input.placeholder = `Car ${name}`;

				dataList.id = `${name}Options${websiteCounter}`;

				input.append(dataList);
				return input;
			}

	}

function createElFromData(appendToMe,data)
	{
		//data is an array as well
		data.forEach(x=>{
			var el = document.createElement('option');
			el.value = x;

			appendToMe.append(el);
		})

	}

function selectionHandler(element, action)
	{
		if(action === 'disable')
			{
				element.setAttribute('disabled','true');
			}
		else if(action === 'enable')
			{
				element.removeAttribute('disabled');
			}
	}

function handleConfirmation()
	{
		
		if(websiteChoiceCount === 1)
			{
				w2Make = 'x';
				w2Model = 'x';
				w2YearStart = 'x';
				w2YearEnd = 'x';
			}

		if(!makeConfirmed)
			{
				if(w1Make.value != '' && w2Make.value != "")
					{
						makeConfirmed = true;
						w1Make.setAttribute('disabled','true');
						try{w2Make.setAttribute('disabled','true');}catch{};
						confirmButton.innerText = 'Confirm model'
						getModel();
						return;
					}
				else 
					{
						//alert
						console.log("ALERT");
						return;
					}
			}
		
		if(!modelConfirmed)
			{
				if(w1Model.value != '' && w2Model.value != "")
					{
						modelConfirmed = true;
						w1Model.setAttribute('disabled','true');
						try{w2Model.setAttribute('disabled','true');}catch{};
						confirmButton.innerText = 'Confirm yearStart'
						getYear();
						return;
					}
				else 
					{
						//alert
						console.log("ALERT");
						return;
					}
			}

		if(!yearStartConfirmed)
			{
				if(w1YearStart.value != '' && w2YearStart.value != "")
					{
						yearStartConfirmed = true;
						w1YearStart.setAttribute('disabled','true');
						try{w2YearStart.setAttribute('disabled','true');}catch{};
						confirmButton.innerText = 'Confirm and get data'
						return;
					}
				else
					{
						//alert
						console.log("ALERT");
						return;
					}
			}

		if(!yearEndConfirmed)
			{
				if(w1YearEnd.value != '' && w2YearEnd.value != "")
					{
						yearEndConfirmed = true;
						w1YearEnd.setAttribute('disabled','true');
						try{w2YearEnd.setAttribute('disabled','true');}catch{};
					}
				else
					{	
						//alert
						console.log("ALERT");
						return;
					}
			}

		getFinalOptions();

	}