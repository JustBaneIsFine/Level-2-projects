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

				}
			
	}
