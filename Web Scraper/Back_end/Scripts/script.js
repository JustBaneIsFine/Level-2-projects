import {handleData} from './handleData.js'
import {extractDataFromPage} from './extractDataFromPage.js';
const URLkupujem = "https://www.kupujemprodajem.com/automobili/opel/grupa/2013/2073";
const URLpolovni = "https://www.polovniautomobili.com/auto-oglasi/pretraga?page=1&sort=basic&brand=opel";


var theList = [];
var numberOfPages;
var pageCounter = 0;
var pagesPerCycle = 5;
var carModel;
var carMake;
var carYear;
var amount = pagesPerCycle;
var displayCount = 0;
var polovniList;
var kupujemList;



export async function mainHandler(siteName,dataToGet, urlAndNum)
	{
		var url = urlAndNum['url'];

		if(urlAndNum['url'] === undefined || urlAndNum['pageNum'] === undefined)
			{
				return false;
			}

		var numOfPages = urlAndNum['pageNum'];

		if (siteName === 'polovni')
			{
				await loadHandlerPolovni(url,numOfPages)
				polovniList = theList;
				theList = [];
				pageCounter = 0;
				amount = pagesPerCycle;
				displayCount = 0;
				return polovniList;


			}
		else if (siteName === 'kupujem')
			{
				await loadHandlerKupujem(url,numOfPages)
				kupujemList = theList;
				theList = [];
				pageCounter = 0;
				amount = pagesPerCycle;
				displayCount = 0;
				return kupujemList;
				

			}

	}

async function loadHandlerKupujem(urla,numOfPages)
	{
		numberOfPages = numOfPages;


		console.log("KUPUJEM LOADING")
 
		while(pageCounter<numOfPages) //0 < 1 true
			{		
				var store = [];
				console.log("_________________Loading Pages_________________");
				checkPageProgress();
				var url;

				for (let i=0;i<amount;i++)
					{

						if (urla.includes('[page]'))
							{
								url = urla.replace('[page]=2',`[page]=${pageCounter+1}`);
							}
						else if (urla.includes('%5Bpage%5D'))
							{
								url = urla.replace('%5Bpage%5D=2',`%5Bpage%5D=${pageCounter+1}`); 
							}
						else
							{
								url = urla;
							}
						console.log('url url url', url);
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
	}

async function loadHandlerPolovni(urla,numOfPages)
	{
		numberOfPages = numOfPages;
		console.log("POLOVNI LOADING")
		while(pageCounter<numOfPages)
			{
				var store = [];
				
				console.log("_________________Loading Pages_________________")
				checkPageProgress();

				for (let i=0;i<amount;i++)
					{

						var url = urla.replace('page=2',`page=${pageCounter+1}`);
						console.log('url url url', url);
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
				console.log("waiting for store promise");
				await Promise.all(store);
				console.log("finnished waiting for store promise")
			}
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
					console.log('waiting for extraction')
					data = await extractDataFromPage(URL,choice);
					console.log('extraction is done')
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