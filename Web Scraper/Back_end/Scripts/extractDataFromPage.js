import puppeteer from 'puppeteer';

export async function extractDataFromPage (URL,choice) 
	{
		console.log('URL sent for extraction',URL)
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
									console.log('entered evaluate')
									const text = await page.evaluate(()=>
									{
										return (async function() 
										{
									
											console.log("waiting for DOM")
											var promiseDom = new Promise((resolve,reject)=>
												{
													document.addEventListener('DOMContentLoaded',resolve);
												});
											function delaySecond(num){
												return new Promise ((resolve,reject)=>
														{
															setTimeout(resolve,num);
														});	
												}

											await Promise.race([
												promiseDom,
												delaySecond(10000)
												]);


											


											console.log('finnished waiting for DOM');

												var array = [];
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

															// the 3 lines below that are commented out are used when extracting to spreadsheet
															//name = `\"${name}\"`;
															//href = `\"${href}\"`;

															var adObj = {
																//"Car Name":`=HYPERLINK(${href},${name})`,  --for href
																"Car Name": name,
																"Car Price": price,
																"Car Year":year,
																"Car Fuel":fuel,
																"Car KM":km,
																"Car CC":cc,
																"href":href,
																}

															array.push(adObj);
												} 

												return array;
											})();

												
												
										});
									console.log('exited evaluate')
									await browser.close();
									contentLoaded = true;
									return text;
											
								}
								catch(e){console.log(e)};

							})();
						})
						.catch((e)=>{console.log(e+ "expected error, ignore"); browser.close();return false;})
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
														

															return (async function() {
																



																var promiseDom = new Promise((resolve,reject)=>
																{
																	document.addEventListener('DOMContentLoaded',resolve);
																});
																
																function delaySecond(num){
																	return new Promise ((resolve,reject)=>
																			{
																				setTimeout(resolve,num);
																			});	
																	}
																	console.log('waiting for DOM')
																await Promise.race([
																	promiseDom,
																	delaySecond(10000)
																	]);
																		console.log('waiting for DOM ____ENDED____');

																	var array = []
																	var listOfNames = document.getElementsByClassName("textContentHolder");

																	console.log("entered the FOR function")
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
																		}
																		

																		var href = parent.querySelector(".ga-title").href;
																		var description = parent.querySelector(".info");

																		var year = description.children[0].innerText.split('\n')[0].split('.')[0];
																		var fuel = description.children[0].innerText.split('\n')[1].split("|")[0];
																		var cc =  description.children[0].innerText.split('\n')[1].split("|")[1].replaceAll("cm3","");
																		var km =  description.children[1].innerText.split("\n")[0].replaceAll(".",",").replaceAll("km","");

																		// the 3 lines below that are commented out are used when extracting to spreadsheet
																		//name = `\"${name}\"`;     for hyperlink
																		//href = `\"${href}\"`;		for hyperlink

																		var adObj = {
																			//"Car Name":`=HYPERLINK(${href},${name})`, //hyperlink used for spreadsheet
																			"Car Name": name,
																			"Car Price": price,
																			"Car Year":year,
																			"Car Fuel":fuel,
																			"Car KM":km,
																			"Car CC":cc,
																			"href":href,
																			}

																		array.push(adObj);

																}
																return array;
															})();




														});
													await browser.close();
													contentLoaded = true;
													return text;
													}
												catch(e){console.log(e)}
											}
										)();
									})
								.catch((e)=>{console.log(e+ "expected error, ignore"); browser.close();return false;})
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

				await page.goto(URL,{timeout: 15000});
			}
		catch(e){console.log(e,'outside error')}

		return data;

	}