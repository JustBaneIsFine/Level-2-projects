const fs = require('fs');
const file = fs.createWriteStream('/Users/Theseus/Desktop/test.txt');

const fetch = require('node-fetch');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const URLkupujem = "https://www.kupujemprodajem.com/automobili/opel/grupa/2013/2073";
const URLpolovni = "https://www.polovniautomobili.com/";

var data;
var theList = [];
var pageNum = 29;
var pageCounter = 0;

(async()=>{
	 while(pageCounter<pageNum)
	{
		var amount = 5;
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
					if(x != false)
					{
						theList.push(x);

						if(theList.length === pageNum)
						{
							content = [];

							
							for(n=0;n<theList.length;n++)	
								{
									
									var cont = [];

									theList[n].forEach(x=>{
										var x = [JSON.stringify(x.name).replaceAll(' ',' '),JSON.stringify(x.price).replaceAll(' ',' ')];
										cont.push(x);
									});

									cont = cont.join('\n');
									content.push(cont);
							
									
								};
								content = content.join('\n');

							fs.writeFile('/Users/Theseus/Desktop/test.txt', content, (err) => {
								 	
								    if (err) throw err;
								    console.log('Content saved!');
								});;
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
													var name = document.getElementsByClassName("adName");
													var price = document.getElementsByClassName("adPrice");
													var array = [];

													for (i=0;i<name.length;i++)
														{
															array.push({"name":name[i].innerText, "price":price[i].innerText});
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
			catch(e){console.log(e+" Expected navigation error")}

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