const fs = require('fs');
const file = fs.createWriteStream('/Users/Theseus/Desktop/test.txt');

const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./client_secret.json');


//const fetch = require('node-fetch');
// const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const URLkupujem = "https://www.kupujemprodajem.com/automobili/opel/grupa/2013/2073";
const URLpolovni = "https://www.polovniautomobili.com/auto-oglasi/pretraga?page=1&sort=basic&brand=opel";

// let isExportingDone = new Promise(function(resolve, reject) {
	
// 	if(exportDone)
// 		{
// 			resolve();
// 		}
// 	else {reject()}

// });

var exportDone = false;
var data;
var theList = [];
var pageNum =27;
var pageCounter = 0;
var pagesPerCycle = 5;
var carModel;
var carMake;
var carYear;
var sheetNum = 0;
var amount = pagesPerCycle;
var displayCount = 0;




// this function loads all pages, 5 at a time
// then when all have been loaded, converts and uses that data 
loadWebsites();

async function loadWebsites()
	{
		sheetNum = 0;
		await mainHandlerKupujem();
		data = undefined;
		theList = [];
		sheetNum = 1;
		pageCounter = 0;
		amount = pagesPerCycle;
		displayCount = 0;
		await mainHandlerPolovni();
		console.log("DONE!");
	}

async function mainHandlerKupujem()
	{

		console.log("KUPUJEM LOADING")
		while(pageCounter<pageNum)
			{

				var store = [];
				console.log("_________________Loading Pages_________________");
				
				checkPageProgress(); 

				for (i=0;i<amount;i++)
					{
						var url = URLkupujem.concat("/"+(pageCounter+1));
						pageCounter++;

						//new
						store[i] = loadHandler(url,"kupujem");

						//data = loadHandler(url,"kupujem");

						store[i].then(x => 
						{
							displayCount++;
							console.log("_________________got page_________________", `${displayCount}/${pageNum}`);

							if(x != false)
								{
									theList.push(x);
								}
							else {console.log("failed to get this page")}
						})
						.catch((e)=>console.log(e+"Failed to get data from a page"));

					}

				await Promise.all(store)
				
				
			}

			//once it finished up there
			// it goes here. but here it may not yet be done with exporting.
			//so we must not allow this function to resolve until exporting is done..

			//So i have multiple promises here that need to be fulfiled until it ends..
			// what if i wrap it all in another async and await

			await handleData();

	}

async function mainHandlerPolovni()
	{

		console.log("POLOVNI LOADING")
		while(pageCounter<pageNum)
			{
				var store = [];
				
				console.log("_________________Loading Pages_________________")
				checkPageProgress();

				for (i=0;i<amount;i++)
					{

						var url = `https://www.polovniautomobili.com/auto-oglasi/pretraga?page=${pageCounter+1}&sort=basic&brand=opel`;
						
						pageCounter++;
						//data = loadHandler(url,"polovni");
						store[i] = loadHandler(url,"polovni");

						store[i].then(x => 
						{
							console.log("_________________got page_________________");
							
							theList.push(x);
						})
						.catch((e)=>console.log(e+"Failed to get data from a page"));
					}
				await Promise.all(store);
			}
		await handleData();
	}


async function loadPage (URL,choice) 
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

					if (choice === "kupujem")
						{
							data = page.waitForSelector('.adName',{timeout: 15000})
							.then(()=>
							{
								return (async function()		
								{
								try
									{
										const text = await page.evaluate(()=>
										{
											return (async function() 
											{
										
												var array = [];

												var promiseDom = new Promise((resolve,reject)=>
													{
														document.addEventListener('DOMContentLoaded',resolve);
													});


												await promiseDom;
												
												var listOfNames = document.getElementsByClassName("adName");

												for (i=0;i<listOfNames.length;i++)
													{
															var parent = listOfNames[i].parentElement.parentElement.parentElement.parentElement;
															var name = parent.querySelector(".adName").innerText;


															var price = parent.querySelector(".adPrice").innerText;

															if (
																!price.includes("Dogovor") &&
																!price.includes("Kontakt") &&
																!price.includes("Pozvati") &&
																!price.includes("Kupujem")
																)
															{
																price = price
																.replaceAll(".","")
																.replaceAll("€","")
																.replaceAll(" ","")
																.replaceAll(",","");

																if(!price.includes("din"))
																	{
																		price = price.slice(0,-2);
																	}
															}

															var href =  parent.querySelector(".adName").href;

															
															var description = parent.querySelector(".adDescription").innerText;
															description = description.split(',');

															var year = description[0];
															var fuel =  description[3].split('.')[0];
															var cc =  description[2].replaceAll("cm3","");
															var km =  description[1].replaceAll("km","").replaceAll(".",",");

															name = `\"${name}\"`;
															href = `\"${href}\"`;

															var adObj = {
																"Car Name":`=HYPERLINK(${href},${name})`,
																"Car Price": price,
																"Car Year":year,
																"Car Fuel":fuel,
																"Car KM":km,
																"Car CC":cc,
																}

															array.push(adObj);
													} //for closing

													return array;
												})();

													
													
											});
										await browser.close();
										contentLoaded = true;
										return text;
												
									}
									catch(e){console.log(e,"error that we get")};

								})();
							})
							.catch((e)=>{console.log(e+ "expected error"); browser.close();return false;})
						} 
					else if (choice === "polovni")

							{
								data = page.waitForSelector('.info',{timeout: 15000})
									.then(()=>
										{
											return (async function()
												
												{
													try
														{
															const text = await page.evaluate(()=>{
																//or i could do, for each of these, get name,price and href.

																//changeThis
																//adName for kupujemprodajem
																//textContentHolder for polovni automobili

																return (async function() {
																	var array = []



																	var promiseDom = new Promise((resolve,reject)=>
																	{
																		document.addEventListener('DOMContentLoaded',resolve);
																	});


																	await promiseDom;
																	//____new

																	var listOfNames = document.getElementsByClassName("textContentHolder");

																	for (i=0;i<listOfNames.length;i++)
																	{
																		var parent = listOfNames[i].parentElement;

																		var name = parent.querySelector(".ga-title").innerText;
																		var priceDiscount = parent.querySelector(".price").querySelector(".priceDiscount");
																		var price = parent.querySelector(".price").innerText;

																		if(priceDiscount != null)
																			{
																				price = priceDiscount.innerText;
																			}

																		if(price.includes("+"))
																			{	
																				var b;
																				b = price.split("+");
																				price = b[0];
																			}
																		else if(price.includes("\n"))
																			{
																				var b;
																				b = price.split("\n");
																				price = b[0];
																			};

																		if (
																			!price.includes("Dogovor") &&
																			!price.includes("Kontakt") &&
																			!price.includes("Pozvati")
																			)
																		{
																			price = price
																			.replaceAll(".","")
																			.replaceAll("€","")
																			.replaceAll(" ","")
																			.replaceAll(",","")
																			.replaceAll(" ","")
																			.replaceAll("\n","")

																			if(!price.includes("din"))
																				{
																					//price = price.slice(0,-2);
																				}
																		}
																		

																		var href = parent.querySelector(".ga-title").href;
																		
																		//access info trough children  description.children[0] etc..
																		var description = parent.querySelector(".info");

																		var year = description.children[0].innerText.split('\n')[0].split('.')[0];
																		var fuel = description.children[0].innerText.split('\n')[1].split("|")[0];
																		var cc =  description.children[0].innerText.split('\n')[1].split("|")[1].replaceAll("cm3","");
																		var km =  description.children[1].innerText.split("\n")[0].replaceAll(".",",").replaceAll("km","");

																		name = `\"${name}\"`;
																		href = `\"${href}\"`;

																		var adObj = {
																			"Car Name":`=HYPERLINK(${href},${name})`,
																			"Car Price": price,
																			"Car Year":year,
																			"Car Fuel":fuel,
																			"Car KM":km,
																			"Car CC":cc,
																			}

																		array.push(adObj);
																	}

																 // text is now array..
																
																	//____

																	return array;
																})();




															});
														await browser.close();
														contentLoaded = true;
														return text;
														}
													catch(e){console.log(e,"error that we get")}
												}
											)();
										})
									.catch((e)=>{console.log(e+ "expected error"); browser.close();return false;})
							}

					

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

async function loadHandler(URL,choice)
	{
		var fail = true;
		var count = 0;
		let data;

			while(fail && count < 5)
				{
					count ++;

					data = await loadPage(URL,choice);

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
		//changeThis to 1 or 0 for sheet number
		const sheet = doc.sheetsByIndex[sheetNum];
		const rows = await sheet.getRows({
			offset:1
		})
		console.log("_________________ploting rows_________________")
		console.log("_________________adding rows_________________")

		await sheet.addRows(data);
		console.log("__________________DONE!__________________")

		//exportIsDone = true;
		return true;
	}

function writeToFile(content)
	{
		fs.writeFile('/Users/Theseus/Desktop/test.txt', content, (err) => {
			 	
			    if (err) throw err;
			    console.log('Content saved!');
			});;
	}

function checkPageProgress()
			{
				if((pageNum-pageCounter) < pagesPerCycle) //7-5 < 5
					{
						amount = pageNum-pageCounter;

					}
			}

async function handleData(x)
	{
		console.log("__________________Handling data__________________");
		//the below code should be the same for both websites
		var content = [];

				if(theList.length === pageNum)
				{
					for(n=0;n<theList.length;n++)	
						{
							theList[n].forEach(obj=>{

								var carName = obj["Car Name"].replaceAll(' ',' ');
								var carPrice = obj["Car Price"];
								var carYear =  obj["Car Year"];
								var carFuel = obj["Car Fuel"];
								var carCC = obj["Car CC"];
								var carKM = obj["Car KM"];

								// if(
								// 	!carPrice.includes('Pozvati') &&
								// 	!carPrice.includes('Dogovor') &&
								// 	!carPrice.includes('Kupujem') &&
								// 	!carPrice.includes('Kontakt'))
								// 	{
								// 		//carPrice = carPrice.slice(0,-5);
								// 	}


								var c = [carName,carPrice,carYear,carFuel,carCC,carKM];
								content.push(c);

							});
					 
							
						};

					//content is now usable as array of objects [{name-name,price-price},{etc}]
						await exportDataToExcel(content);

												

					//writeToFile(content)
				}
			
	}