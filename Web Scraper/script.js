const fetch = require('node-fetch');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const URLkupujem = "https://www.kupujemprodajem.com/automobili/kategorija/2013";
const URLpolovni = "https://www.polovniautomobili.com/";
const URLg = "https://www.google.com/";
var tries = 0;
var maxTries = 10;
var success = false;
var browserClosed = false;
var contentLoaded = false;
var ran = false;

loadPage(URLkupujem);



async function loadPage (URL) 
	{
		//while the page throws error or is not loaded properly, try again..
		try{
		while(!success)
			{
				const browser = await puppeteer.launch({headless:false});
				const page = await browser.newPage();
				await page.setRequestInterception(true);

					// when categoryTitle shows up, do this
					page.waitForSelector('.categoryTitle').then(() => 
						{
							success = true;
							contentLoaded = true;

									//here we do what we have to with the code
									(async function()
										{
											const text = await page.evaluate(() => {
										   	var a = document.getElementsByClassName("categoryTitle");
										   	var array = [];
										   	for (i = 0;i<a.length;i++)
										   		{
										   			array.push(a[i].childNodes[3].innerText);
										   		}

										   	return array; 
										})

										console.log(text);
										await browser.close();
										}

									)();	

							


						});

					
					
					//intercept page requests.
						page.on('request', request => {

								if (!contentLoaded){
								  if ( 
								  	request.resourceType() === 'image' || 
								  	request.resourceType() ==='imageset' ||
								  	request.resourceType() ==='media'||
								  	request.resourceType() === 'font'||
								  	request.resourceType() === 'object'||
								  	request.resourceType() === 'object_subrequest'||	
								  	request.resourceType() === 'sub_frame'||
								  	request.resourceType() === 'xmlhttprequest'
								  	)
										{
										 	request.respond({
									        status: 200,
									        body: "foo"
									     	})
										    
										 	console.log("aborted request");
										}
								  else
									  {
									  	console.log("allowed request");
									    request.continue();
									  }	
									}
								
						})

					await page.goto(URLkupujem);
			}
		}
		catch(e){console.log(e + " Expected navigation error")}

	};




const getRawData = (URL) => 
	{
		return fetch(URL)
		.then((response)=>response.text())
		.then((data) => {return data});
	};


	//car selling websites in Serbia
	//Will also make web scraper and comparison for 
	//amazon/ebay or some other sites, will see..