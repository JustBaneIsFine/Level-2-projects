var alerted = false;
var requestSent = false;


function sendRequest()
	{
		
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
					xhr.onload = function()
						{
							var data =xhr.responseText;
							console.log(JSON.parse(data).hello1);
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


function saveDataToStorage(data)
	{

	}

function inputsAreOkay()
	{
		//checks all inputs


	}

function requiredInputsOkay()
	{
		//Checks only the required inputs that we need to have
	}
