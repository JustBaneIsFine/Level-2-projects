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
		
		while(!success)
			{
				const browser = await puppeteer.launch({headless:false});
				const page = await browser.newPage();
				await page.setRequestInterception(true);
				



				page.waitForSelector('.categoryTitle').then(() => {contentLoaded = true;console.log("ITS HERE <<<<<<<<<<<<<<<<<<<<<<<<<<<")})
				//when selector shows up, then do what needs to be done.
				// //page.waitForSelector('.adListContainer').then(async function()
				// 	{
				// 		contentLoaded = true;
				 		
				// 			// do what has to be done with the data..
				// 			//then exit..
				// 			 try {

				// 			// 	// _____________CODE SNIPET________________

				// 			// 	 //  	const array = await page.evaluate(() => {
				// 			// 	 //  		console.log("WORKING <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
				// 			// 		//  	return document.getElementsByClassName("categoryTitle"); //this get's all elements with this class name and returns a html collection
				// 			// 		// })

								
				// 			// 		const array = await page.$$("categoryTitle");
				// 			// 		//console.log(array[0].childNodes[3].innerText);

									

				// 			// 	   var b = [];
				// 			// 	   for (i = 0;i < array.length;i++){b.push(array[i].childNodes[3].innerText)};
				// 			// 		console.log(b + "yes yes");   

				// 			// 	// _____________CODE SNIPET________________
				// 				//await browser.close();
								
				// 				} catch(e) {
				// 					console.log(e);
				// 				}
							
				// 	}).catch((e)=>console.log(e));

				// handle requests, do not load any "heavy" or "slow" stuff like images etc.
				if(!contentLoaded){
					try {
							success = true;

								page.on('request', request => {

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


								  	// request.abort();
								  	// request._interceptionHandled = false;
								  	// request.respond({status: 200,body:"foo"});
								    
								    console.log("aborted something");
								  }
								  else
								  {
								  	console.log("it continued");
								    request.continue();
								  }

								  // THIS WORKS IN CONSOLE IN BROWSER:
								  // array = document.getElementsByClassName("categoryTitle") ->>> returns an HTML collection

								  // array[0].childNodes[3].innerText -->> gets the text inside..






						// try this  outside the page.waitForSelector to get the element, because you probably can't 
						// use the page.$$  inside the page.waitForSelector
						if (contentLoaded && !ran){
							ran = true;
							console.log("content is loaded ran");

								(async function()
								{
									
									///_____________
									const text = await page.evaluate(() => {
								   	console.log(document.getElementsByClassName("categoryTitle")); //this get's all elements with this class name and returns a html collection
									})
									
									//_____________________CODE TO EDIT AND TRY OUT_____________________
									// https://github.com/puppeteer/puppeteer/issues/4852
									//_____________________CODE TO EDIT AND TRY OUT_____________________




									// const text = await page.evaluate(()=>{
									// 	var elements = Array.from(document.querySelectorAll(".categoryTitle"));
									// 	var links = elements.map(element => {
								 //            return element.childNodes[3].innerText;
								 //         console.log(links)
								 //        })
								 //        return links;
										//var x = document.querySelectorAll(".categoryTitle").forEach(x => array.push(x.childNodes[3].innerText));
										//return array;
										//for (i = 0;i < x.length;i++){array.push(x[i].childNodes[3].innerText)};
											
									


									// const text = await page.evaluate(() => {

									// return array = page.$$("categoryTitle"); //this get's all elements with this class name and returns a html collection
									// 	console.log(array[0].childNodes[3].innerText);
									// 	})

									 //   var b = [];
									 //   for (i = 0;i < array.length;i++){b.push(array[i].childNodes[3].innerText)};
										// console.log(b);   	


									  console.log("THIS IS THE CONTENT");
									///______________


									// var array = [];
									// const abc = await page.evaluate(() => Array.from(document.getElementsByClassName('categoryTitle'), e => e.childNodes[3].innerText));
									// //const array = await page.$$eval('.categoryTitle', element => element);
									// console.log(abc.length);
								})();
							}


								});

								await page.goto(URLkupujem);
								console.log("success");



						} 
					catch(e) 
						{
							console.log(e + "ENDING ERROR <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
							await browser.close();
						}
				}
			}
	}








	 

		



// })();


const getRawData = (URL) => 
	{
		return fetch(URL)
		.then((response)=>response.text())
		.then((data) => {return data});
	};


	//car selling websites in Serbia
	//Will also make web scraper and comparison for 
	//amazon/ebay or some other sites, will see..