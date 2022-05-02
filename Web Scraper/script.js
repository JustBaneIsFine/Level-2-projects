const fetch = require('node-fetch');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const URLkupujem = "https://www.kupujemprodajem.com/automobili/opel/grupa/2013/2073";
const URLpolovni = "https://www.polovniautomobili.com/";
const URLg = "https://www.google.com/";
var tries = 0;
var maxTries = 10;

var browserClosed = false;

var ran = false;
var theList = [];

var URLkupujemList = [];
var numOfPages = 29;





//loadPage(URLkupujem);

//The async function runs page by page whereas the ordinary function below runs multiple pages at once..

		// (async function(){

		// 	for (i=0;i<3;i++)
		// 		{
		// 			success = false;
		// 			contentLoaded = false;
		// 			var url = URLkupujem.concat("/"+(i+1));
		// 			var a = await loadPage(url);
		// 			theList.push(a);
		// 			console.log(theList[0][0]);
		// 		}	

		// })();

for (i=0;i<5;i++)
				{
					success = false;
					contentLoaded = false;
					var url = URLkupujem.concat("/"+(i+1));
					try {
						var a = loadPage(url);
					} catch(e) {
						console.log(e);
					}


					
					a.then(x => {
						if(x != undefined){
						theList.push(x);
							if(theList.length === 5){
								for(n=0;n<theList.length;n++)	
									{
										console.log(theList[n]);
									}
							};
						}})
					.catch((e)=>console.log(e+"ERORE ER ERER E"));

				}	
		

// setTimeout(()=> {
// 	for(n=0;n<theList.length;n++)	
// 									{
// 										console.log(theList[n]);
// 									}	
// },20000);




// load page should return the data we need, or it should fail..
// if it fails that means it has tried x times to get the data, but failed..
async function loadPage (URL) 
	{
		//we need to track how many times it has tried to get that data..
		count = 0;
		success = false;
		data = [];

		//then we say
		//repeat this code until we get the data we need
		// or we failed 5 times...
		while (!success && count<5)
			{
				count++;

				try
					{
						//start up the browser and set config
						const browser = await puppeteer.launch({headless:false});
						const page = await browser.newPage();
						await page.setRequestInterception(true);
						page.setDefaultNavigationTimeout(0);

						//when categoryTitle shows up, do this
						// IMPORTANT!
						// This is an eventListener, so javascript will run it when it comes to it..
						// in the meantime it will run the rest of the code until completion..
						// this is where you left of <<<<<<<<<<<<<<<<<<<<<__________________________
							page.waitForSelector('.adName')
							.then(()=>
								{

								})
							.catch((e)=>{console.log(e+"Timeout error caught");success = false;})
						// this is where you left of <<<<<<<<<<<<<<<<<<<<<__________________________
						//the current issue is how to await inside the while loop..
						//since page.waitforselector runs at some time in the future, we need 
						// to await it's result, but if we await it's result, we can't load the page..

						// what i want to do is if the page loads that and we get the data, we change
						// success to true, and then we return the data and that's the end..
						// and if we fail to get the data, then success remains at false, so this block of
						// code runs again 4 more times or until we get data..
						

					}

				catch(e){console.log(e+" Expected navigation error")}
			}
// old code bellow ______________________________________________


		while(!success){
			var list = [];
			//while the page throws error or is not loaded properly, try again..

			try{
				// instead of while 
			
					const browser = await puppeteer.launch({headless:false});
					const page = await browser.newPage();
					await page.setRequestInterception(true);
					page.setDefaultNavigationTimeout(0);

						// when categoryTitle shows up, do this
									page.waitForSelector('.adName').then(() => 
								{
									store = (async function()
												{
													try 
													{
														const text = await page.evaluate(() => {
													   	var name = document.getElementsByClassName("adName");
													   	var price = document.getElementsByClassName("adPrice");
													   	var array = [];
													   	for (i = 0;i<name.length;i++)
													   		{
													   			array.push({"name": name[i].innerText, "price": price[i].innerText});
													   		}
												   		return array;
		 
														})
														
														success = true;
														await browser.close();
														return text;

													} 
													catch(e) 
													{
														console.log(e + "EROR NEW");
													}
													

												}

											)();

									//success = true;
									contentLoaded = true;

											//here we do what we have to with the code
											//this is the function we reuse
										

											store.then(console.log(store));
							}).catch((e)=> {console.log(e+"THE NEW ERROR HANDLER TIMEOUT");browser.close();success = false;
									contentLoaded = false;});
					
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
											    
											 	//console.log("aborted request");
											}
									  else
										  {
										  	//console.log("allowed request");
										    request.continue();
										  }	
										}
									
							})

						await page.goto(URL);
				}

			
			catch(e){console.log(e + " Expected navigation error")}

			
			if(success){return list};
		}
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