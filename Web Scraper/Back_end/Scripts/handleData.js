import {writeToFile} from './writeToFile.js'
import {exportDataToSpreadsheet} from './exportToSpreadSheet.js';
var content;

export async function handleData(rawData,numberOfPages)
	{
		console.log("__________________Handling data__________________");

		var content = [];

				if(rawData.length === numberOfPages)
				{
					for(let n=0;n<rawData.length;n++)	
						{
							rawData[n].forEach(obj=>{

								var carName = obj["Car Name"].replaceAll(' ',' ');
								var carPrice = obj["Car Price"];
								var carYear =  obj["Car Year"];
								var carFuel = obj["Car Fuel"];
								var carCC = obj["Car CC"];
								var carKM = obj["Car KM"];



								var c = [carName,carPrice,carYear,carFuel,carCC,carKM];
								content.push(c);

							});
					 
							
						};


					//here i have the data.. now, i should export it 
					// and then on user click i can run the appropriate function
					// export to spreadsheet
					// display data
					// write to file..

					//that choice should not be awaited, 
					//instead appropriate functions will be run on button click
					
					await exportDataToSpreadsheet(content);
					//writeToFile(content)
				}
			
	}

// now you can do what you want with the content
// preferably, now you would wait for the user to click on something
// then on click you do what needs to be done with data...
// export to spreadsheet
// write to file
// display -> send to front end