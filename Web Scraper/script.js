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
//____ WORKING CODE
	// for (i=0;i<5;i++)
	// 				{
	// 					var url = URLkupujem.concat("/"+(i+1));

	// 					var a = loadHandler(url);


						
	// 					a.then(x => {
	// 						if(a != false){
	// 						theList.push(x);
	// 							if(theList.length === 5){
	// 								for(n=0;n<theList.length;n++)	
	// 									{
	// 										console.log(theList[n]);
	// 									}
	// 							};
	// 						}})
	// 					.catch((e)=>console.log(e+"Failed to get data from a page"));

	// 				}	
//____		




x = loadHandler(URLkupujem);
x.then((x)=>{console.log(x)});

// load page should return the data we need, or it should fail..
// if it fails that means it has tried x times to get the data, but failed..
async function loadPage (URL) 
	{
		var contentLoaded = false;

			try
				{
					//start up the browser and set config
					const browser = await puppeteer.launch({headless:false});
					const page = await browser.newPage();
					await page.setRequestInterception(true);
					page.setDefaultNavigationTimeout(0);

					//when .adName content shows up, extract the data
					page.waitForSelector('.adName')
						.then(()=>
							{

								contentLoaded = true;
								//when .adName shows up, do this:
								(async function()
									
									{

										try
											{
												const text = await page.evaluate(()=>{
													var name = document.getElementsByClassName("adName");
													var price = document.getElementsByClassName("adPrice");
													var array = [];

													for (i=0;i<name.length;i++)
														{
															array.push({"name":name[i].innerText, "price":price[i].innerText});
														}
														
													return array; // text is now array..

												})

											console.log(text, "<<<<<< THIS IS TEXT")
											data = text;
											console.log(data, "<<< THIS IS DATA");
											await browser.close();
											}

										catch(e){}
									}

								)();

								return text;
							})
						.catch((e)=>{console.log(e+"Timeout error caught");})


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
			catch(e){console.log(e+" Expected navigation error")}


			
		if(contentLoaded){return data}else{return false};

	}

async function loadHandler(URL)
	{
		var fail = true;
		var count = 0;
		let data;

			while(fail && count < 5)
				{
					count ++;

					await loadPage(URL);
					console.log(data + "<<< DATA");

						if (data != undefined || data != false)
							{
								fail = false;
							}
						else{fail = true; data = false}

					
					//console.log(a);
						//if promise fulfiled and it's not undefined or 0 length
						
						// if(a != undefined || a.length != 0)
						// 	{fail === false; data = x}
						// else {fail = true; data = false;}
				}
		return data;
	}


const getRawData = (URL) => 
	{
		return fetch(URL)
		.then((response)=>response.text())
		.then((data) => {return data});
	};


	//car selling websites in Serbia
	//Will also make web scraper and comparison for 
	//amazon/ebay or some other sites, will see..