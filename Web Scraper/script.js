<<<<<<< HEAD
=======
const fs = require('fs');
const file = fs.createWriteStream('/Users/Theseus/Desktop/test.txt');

const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./client_secret.json');


const fetch = require('node-fetch');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const URLkupujem = "https://www.kupujemprodajem.com/automobili/opel/grupa/2013/2073";
const URLpolovni = "https://www.polovniautomobili.com/auto-oglasi/pretraga?page=1&sort=basic&brand=opel";

var data;
var theList = [];
var pageNum = 25;
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
				//change this
				//used for polovni...
				//var url = `https://www.polovniautomobili.com/auto-oglasi/pretraga?page=${pageCounter+1}&sort=basic&brand=opel`;
				//below url is for testing
				//var url = `https://www.polovniautomobili.com/auto-oglasi/snizena-cena?page=${pageCounter+1}&sort=last_changed_desc&`;
				//used for kupujemprodajem
				var url = URLkupujem.concat("/"+(pageCounter+1));
				pageCounter++;
				data = loadHandler(url);
				data.then(x => 
				{

					console.log("_________________got page_________________")
					//console.log(x[0]);
					if(x != false)
					{

						theList.push(x);

						if(theList.length === pageNum)
						{
							content = [];

							
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

					//changeThis
					//when .adName content shows up, extract the data -> used for kupujemprodjame website
					//when .info content shows up, extract the data -> used for polovniautomobili website

					data = page.waitForSelector('.adName',{timeout: 15000})
						.then(()=>
							{
								//when .adName shows up, do this:
								return (async function()
									
									{

										try
											{
												const text = await page.evaluate(()=>{
													//or i could do, for each of these, get name,price and href.

													//changeThis
													//adName for kupujemprodajem
													//textContentHolder for polovni automobili

													var listOfNames = document.getElementsByClassName("adName");
													var array = [];

													for (i=0;i<listOfNames.length-1;i++)
														{
															//changeThis
															//used for kupujem 
															//_______

																var parent = listOfNames[i].parentElement.parentElement.parentElement.parentElement;
																var name = parent.childNodes[3].childNodes[1].childNodes[1].innerText;
																var price = parent.childNodes[7].childNodes[1].innerText.replaceAll("din","").replaceAll(".",",").replaceAll("€","");
																var href =  parent.childNodes[3].childNodes[1].childNodes[1].childNodes[1].href;

																
																var description = parent.childNodes[3].childNodes[1].childNodes[3].innerText;
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

															//_______

															//used for polovni
															//_______

																// var parent = listOfNames[i].parentElement;

																// var name = parent.querySelector(".ga-title").innerText;
																// var priceDiscount = parent.querySelector(".price").querySelector(".priceDiscount");
																// var price = parent.querySelector(".price").innerText;

																// if(priceDiscount != null)
																// 	{
																// 		price = priceDiscount.innerText;
																// 	}

																// if(price.includes("+"))
																// 	{	
																// 		var b;
																// 		b = price.split("+");
																// 		price = b[0];
																// 	}
																// else if(price.includes("\n"))
																// 	{
																// 		var b;
																// 		b = price.split("\n");
																// 		price = b[1];
																// 	};

																// price = price.replaceAll(" ","").replaceAll(".",",").replaceAll("€","");


																// var href = parent.querySelector(".ga-title").href;
																
																// //access info trough children  description.children[0] etc..
																// var description = parent.querySelector(".info");

																// var year = description.children[0].innerText.split('\n')[0].split('.')[0];
																// var fuel = description.children[0].innerText.split('\n')[1].split("|")[0];
																// var cc =  description.children[0].innerText.split('\n')[1].split("|")[1].replaceAll("cm3","");
																// var km =  description.children[1].innerText.split("\n")[0].replaceAll(".",",").replaceAll("km","");

																// name = `\"${name}\"`;
																// href = `\"${href}\"`;

																// var adObj = {
																// 	"Car Name":`=HYPERLINK(${href},${name})`,
																// 	"Car Price": price,
																// 	"Car Year":year,
																// 	"Car Fuel":fuel,
																// 	"Car KM":km,
																// 	"Car CC":cc,
																// 	}

																// array.push(adObj);

															//_______

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

										catch(e){console.log(e,"error that we get")}
										return text;
									}

								)();
							})
						.catch((e)=>{console.log(e+ "expected error"); browser.close();return false;})


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
>>>>>>> webScraper
