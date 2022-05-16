const fs = require('fs');
const file = fs.createWriteStream('/Users/Theseus/Desktop/test.txt');

const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./client_secret.json');


const fetch = require('node-fetch');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const URLkupujem = "https://www.kupujemprodajem.com/automobili/opel/grupa/2013/2073";
const URLpolovni = "https://www.polovniautomobili.com/";

var data;
var theList = [];
var pageNum = 28;
var pageCounter = 0;

// this function loads all pages, 5 at a time
// then when all have been loaded, converts and uses that data 
(async()=>{
	 while(pageCounter<pageNum)
	{
		var amount = 5;
		console.log("_________________Loading Pages_________________")
		if(pageNum-pageCounter < 5)
			{
				amount = pageNum-pageCounter;
			}
		for (i=0;i<amount;i++)
			{
				
				var url = URLkupujem.concat("/"+(pageCounter+1));
				pageCounter++;
				data = loadHandler(url);
				data.then(x => 
				{
					console.log("_________________got page_________________")
					if(x != false)
					{
						theList.push(x);

						if(theList.length === pageNum)
						{
							content = [];

							
							for(n=0;n<theList.length;n++)	
								{
									theList[n].forEach(x=>{
										var carName = x["Car Name"].replaceAll(' ',' ');

										var carPrice = (x["Car Price"].replaceAll(' ',' ')).replaceAll('.','');

										if(
											!carPrice.includes('Pozvati') &&
											!carPrice.includes('Dogovor') &&
											!carPrice.includes('Kupujem') &&
											!carPrice.includes('Kontakt'))
											{
												carPrice = carPrice.slice(0,-5);
											}
										var c = [carName,carPrice];
										content.push(c);

									});
							 
									
								};

							//content is now usable as array of objects [{name-name,price-price},{etc}]
								exportDataToExcel(content);
								//content.forEach(x=>console.log(`${x.name}\n`));							

							//writeToFile(content)
						}
					}
				})
				.catch((e)=>console.log(e+"Failed to get data from a page"));
			}	
		await Promise.all([data,data,data,data,data]);

	}
})();
	

async function loadPage (URL) 
	{
	

		var contentLoaded = false;
		var data;

			try
				{
					//start up the browser and set config
					const browser = await puppeteer.launch({headless:true});
					const page = await browser.newPage();
					await page.setRequestInterception(true);
					page.setDefaultNavigationTimeout(0);

					//when .adName content shows up, extract the data
					data = page.waitForSelector('.adName',{timeout: 10000})
						.then(()=>
							{
								//when .adName shows up, do this:
								return (async function()
									
									{

										try
											{
												const text = await page.evaluate(()=>{
													//or i could do, for each of these, get name,price and href.
													var listOfNames = document.getElementsByClassName("adName");
													var array = [];

													for (i=0;i<listOfNames.length;i++)
														{
															var parentElement = listOfNames[i].parentElement.parentElement.parentElement.parentElement;
															var name = parentElement.childNodes[3].childNodes[1].childNodes[1].innerText;
															var price = parentElement.childNodes[7].childNodes[1].innerText;
															var href =  parentElement.childNodes[3].childNodes[1].childNodes[1].childNodes[1].href;
															name = `\"${name}\"`;
															href = `\"${href}\"`;
															var adObj = {"Car Name":`=HYPERLINK(${href},${name})`,"Car Price": price};
															array.push(adObj);
														}

													return array; // text is now array..

												})

											//console.log(text, "<<<<<< THIS IS TEXT")
											//data = text;
											//console.log(data, "<<< THIS IS DATA");
											await browser.close();
											contentLoaded = true;
											return text;
											}

										catch(e){}
										return text;
									}

								)();
							})
						.catch((e)=>{console.log(e+"Timeout error caught"); browser.close();return false;})


					//intercept page requests
					page.on('request',request => {

						if(!contentLoaded)
							{
								if(request.resourceType() === 'image' || 
									  	request.resourceType() ==='imageset' ||
									  	request.resourceType() ==='media'||
									  	request.resourceType() === 'font'||
									  	request.resourceType() === 'object'||
									  	request.resourceType() === 'object_subrequest'||	
									  	request.resourceType() === 'sub_frame'||
									  	request.resourceType() === 'xmlhttprequest'
									)
										{
											//cancel request
											request.respond({
												status:200,
												body:"foo"
											})	
										}
								else
									{
										request.continue();
									}

							}
					})

					//go to this page
					await page.goto(URL);


				}
			catch(e){}

		return data; //returns promise

	}

async function loadHandler(URL)
	{
		var fail = true;
		var count = 0;
		let data;

			while(fail && count < 5)
				{
					count ++;

					data = await loadPage(URL);

						if (data === undefined || data === false)
							{
								fail = true; data = false;
							}
						else{
								fail = false;
							}
				}
		return data;
	}

function getRawData (URL) 
	{
		return fetch(URL)
		.then((response)=>response.text())
		.then((data) => {return data});
	};


	//car selling websites in Serbia
	//Will also make web scraper and comparison for 
	//amazon/ebay or some other sites, will see..

async function exportDataToExcel(data)
	{
		console.log("_________________exporting data_________________");
		//here i will get data as an array containing objects all the data like this:
		// data = [{"name":"carname","price":5521$},{etc..}]

		// then i take that and use the spreadsheet functions to insert it into the spreadsheet

		const doc = new GoogleSpreadsheet('1lMEQtBDCCcHtDzLtZzgl9pOY_M77mw7hA5CCiVGR3G0');
		await doc.useServiceAccountAuth({
			client_email: creds.client_email,
			private_key: creds.private_key,
		});

		const info = await doc.loadInfo();
		console.log("_________________got info_________________");
		const sheet = doc.sheetsByIndex[0];
		const rows = await sheet.getRows({
			offset:1
		})
		console.log("_________________ploting rows_________________")
		console.log("_________________adding rows_________________")
		await sheet.addRows(content);
		console.log("__________________DONE!__________________")

	}

function writeToFile(content)
	{
		fs.writeFile('/Users/Theseus/Desktop/test.txt', content, (err) => {
			 	
			    if (err) throw err;
			    console.log('Content saved!');
			});;
	}