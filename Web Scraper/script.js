const fs = require('fs');
const file = fs.createWriteStream('/Users/Theseus/Desktop/test.txt');


const fetch = require('node-fetch');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const URLkupujem = "https://www.kupujemprodajem.com/automobili/opel/grupa/2013/2073";
const URLpolovni = "https://www.polovniautomobili.com/";


var theList = [];
var pageNum = 5;
// Need to set it up so that if there are 80 pages,
// i can load 5 or 10 at a time, instead of all 80..


for (i=0;i<pageNum;i++)
	{
		var url = URLkupujem.concat("/"+(i+1));

		var data = loadHandler(url);
		
		data.then(x => 
		{
			if(x != false)
			{
				theList.push(x);

				if(theList.length === pageNum)
				{
					content = [];

					//for each page content -> 5 pages
					for(n=0;n<theList.length;n++)	
						{
							//make the data writable
							var cont = [];

							theList[n].forEach(x=>{
								var x = [JSON.stringify(x.name).replaceAll(' ',' '),JSON.stringify(x.price).replaceAll(' ',' ')];
								cont.push(x);
							});
							//join the data up
							cont = cont.join('\n');
							content.push(cont);
					
							
						};
						content = content.join('\n');

					fs.writeFile('/Users/Theseus/Desktop/test.txt', content, (err) => {
						 	//throws an error, you could also catch it here
						    if (err) throw err;

						    // success case, the file was saved
						    console.log('Lyric saved!');
						});;
				}
			}
		})
		.catch((e)=>console.log(e+"Failed to get data from a page"));
	}	
// ____		

// load page should return the data we need, or it should fail..
// if it fails that means it has tried x times to get the data, but failed..
async function loadPage (URL) 
	{
	

		var contentLoaded = false;
		var data;

			try
				{
					//start up the browser and set config
					const browser = await puppeteer.launch({headless:false});
					const page = await browser.newPage();
					await page.setRequestInterception(true);
					page.setDefaultNavigationTimeout(0);

					//when .adName content shows up, extract the data
					data = page.waitForSelector('.adName',{timeout: 5000})
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