import {handleData} from './handleData.js'
import {extractDataFromPage} from './extractDataFromPage.js';
const URLkupujem = "https://www.kupujemprodajem.com/automobili/opel/grupa/2013/2073";
const URLpolovni = "https://www.polovniautomobili.com/auto-oglasi/pretraga?page=1&sort=basic&brand=opel";



var theList = [];
var numberOfPages =7;
var pageCounter = 0;
var pagesPerCycle = 5;
var carModel;
var carMake;
var carYear;
var amount = pagesPerCycle;
var displayCount = 0;


mainHandler();

async function mainHandler()
	{
		await loadHandlerKupujem();
		theList = [];
		pageCounter = 0;
		amount = pagesPerCycle;
		displayCount = 0;
		await loadHandlerPolovni();
		console.log("DONE!");
	}


async function loadHandlerKupujem()
	{

		console.log("KUPUJEM LOADING")
		while(pageCounter<numberOfPages)
			{
				var store = [];
				console.log("_________________Loading Pages_________________");
				checkPageProgress(); 

				for (let i=0;i<amount;i++)
					{
						var url = URLkupujem.concat("/"+(pageCounter+1));
						pageCounter++;

						store[i] = handleLoadingAndFailiure(url,"kupujem");
						store[i].then(x => 
						{
							displayCount++;
							console.log("_________________got page_________________",`${displayCount}/${numberOfPages}`);

							if(x != false)
								{
									theList.push(x);
								}
							else {console.log("failed to get this page")}
						})
						.catch((e)=>console.log(e+"Failed to get data from a page"));

					}

				await Promise.all(store);
			}
			await handleData(theList,numberOfPages);
	}
async function loadHandlerPolovni()
	{

		console.log("POLOVNI LOADING")
		while(pageCounter<numberOfPages)
			{
				var store = [];
				
				console.log("_________________Loading Pages_________________")
				checkPageProgress();

				for (let i=0;i<amount;i++)
					{

						var url = `https://www.polovniautomobili.com/auto-oglasi/pretraga?page=${pageCounter+1}&sort=basic&brand=opel`;
						
						pageCounter++;
						store[i] = handleLoadingAndFailiure(url,"polovni");

						store[i].then(x => 
						{
							displayCount++
							console.log("_________________got page_________________",`${displayCount}/${numberOfPages}`);
							
							theList.push(x);
						})
						.catch((e)=>console.log(e+"Failed to get data from a page"));
					}
				await Promise.all(store);
			}
		await handleData(theList,numberOfPages);
	}
async function handleLoadingAndFailiure(URL,choice)
	{
		var fail = true;
		var count = 0;
		var data;
		var attempts = 5;

			while(fail && count < attempts)
				{
					count ++;

					data = await extractDataFromPage(URL,choice);

						if (data === undefined || data === false)
							{
								fail = true; data = false;
								console.log("failed");
							}
						else{
								fail = false;
							}
				}
		return data;
	}
function checkPageProgress() 
	{
		if((numberOfPages-pageCounter) < pagesPerCycle)
		{
			amount = numberOfPages-pageCounter;
		}
	}
	
