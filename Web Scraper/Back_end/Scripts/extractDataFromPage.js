import puppeteer from 'puppeteer';

export async function extractDataFromPage (URL,choice) 
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
									
											
											var promiseDom = new Promise((resolve,reject)=>
												{
													document.addEventListener('DOMContentLoaded',resolve);
												});
											await promiseDom;
											//_______change this to change what you want to extract
											// here we are actually inside the browser, all the code writen here,
											// is executed in the browser...

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
												//_______change the above to change what you want to extract
												} 

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
														

															return (async function() {
																



																var promiseDom = new Promise((resolve,reject)=>
																{
																	document.addEventListener('DOMContentLoaded',resolve);
																});


																await promiseDom;
																//_______change this to change what you want to extract
																	var array = []
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
																		}
																		

																		var href = parent.querySelector(".ga-title").href;
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
																//_______change the above to change what you want to extract
																}
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

				await page.goto(URL);
			}
		catch(e){}

		return data;

	}