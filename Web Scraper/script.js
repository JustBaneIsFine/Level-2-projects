const fetch = require('node-fetch');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const URLkupujem = "https://www.kupujemprodajem.com/automobili/opel/grupa/2013/2073";
const URLpolovni = "https://www.polovniautomobili.com/";
const URLg = "https://www.google.com/";
var tries = 0;
var maxTries = 10;
var success = false;
var browserClosed = false;
var contentLoaded = false;
var ran = false;
var theList = [];

var URLkupujemList = [];
var numOfPages = 29;





//loadPage(URLkupujem);

//The async function runs page by page where as the ordinary function below runs multiple pages at once..

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

for (i=0;i<6;i++)
				{
					success = false;
					contentLoaded = false;
					var url = URLkupujem.concat("/"+(i+1));
					var a = loadPage(url);
					a.then(x => {
						theList.push(x);
							if(theList.length >= i){
								for(n=0;n<theList.length;n++)	
									{
										console.log(theList[n]);
									}
							};
						});
				}	
		

// setTimeout(()=> {
// 	for(n=0;n<theList.length;n++)	
// 									{
// 										console.log(theList[n]);
// 									}	
// },20000);





async function loadPage (URL) 
	{
		var list = [];
		//while the page throws error or is not loaded properly, try again..
		try{

		while(!success)
			{
				const browser = await puppeteer.launch({headless:true});
				const page = await browser.newPage();
				await page.setRequestInterception(true);

					// when categoryTitle shows up, do this
					page.waitForSelector('.adName').then(() => 
						{
							success = true;
							contentLoaded = true;

									//here we do what we have to with the code
									(async function()
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
											list.push(text);
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
		}
		catch(e){console.log(e + " Expected navigation error")}

		return list;
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