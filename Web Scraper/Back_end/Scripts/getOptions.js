import puppeteer from 'puppeteer';
var contentLoaded = false;
var urlPolovni = 'https://www.polovniautomobili.com';
var urlKupujem = 'https://www.kupujemprodajem.com/automobili/kategorija/2013';

export async function getWebsiteMake(website)
	{

		if (website === "polovni")
			{
				contentLoaded = false;
				var make = await handlerFunction(getMakePolovni);
				return make; 
			}

		else if (website === "kupujem")
			{
				contentLoaded = false;
				var make = await handlerFunction(getMakeKupujem);
				return make;
			}
	}

export async function getWebsiteModel(website,make)
	{
		if (website === "polovni")
			{
				contentLoaded = false;
				var model = await handlerFunction(getModelPolovni,make);
				return model;
			}

		else if (website === "kupujem")
			{
				contentLoaded = false;
				var model = await handlerFunction(getModelKupujem,make);
				return model;
			}

	}

export async function getWebsiteYear(website,make,model)
	{

		if (website === "polovni")
			{	
				contentLoaded = false;
				var year = await handlerFunction(getYearPolovni,make,model);
				return year;
			}

		else if (website === "kupujem")
			{
				contentLoaded = false;
				var year = await handlerFunction(getYearKupujem,make,model);
				return year;
			}
	}



async function getMakePolovni()
	{
		var data;

		try {
		//start up the browser and set config
		const browser = await puppeteer.launch({headless:true});
		const page = await browser.newPage();
		await page.setRequestInterception(true);
		page.setDefaultNavigationTimeout(0);

		data = page.waitForSelector('#brand',{timeout:15000})
		.then(
				()=>{

						return (async function(){
							try{

							const text = await page.evaluate(()=>{
								return (async function(){
									
									var makeOptions = document.getElementsByClassName('sumo_brand')[0].querySelectorAll('.opt');
									var makeOptionsArray = [];

									for (let i=0;i<makeOptions.length;i++)
										{
											makeOptionsArray.push(makeOptions[i].innerText);
										}
									
								return makeOptionsArray;
								})(); 






								})
							await browser.close();
							contentLoaded = true;
							return text;

							}catch(e){console.log(e)};








						})();




				}
			
			).catch((e)=>{console.log(e,"expected error, ignore"); browser.close();return false})

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

		await page.goto(urlPolovni);

		}catch(e){};

		return data;
	}

async function getMakeKupujem()
	{
		var data;

		try {
		const browser = await puppeteer.launch({headless:true});
		const page = await browser.newPage();
		await page.setRequestInterception(true);
		page.setDefaultNavigationTimeout(0);

		data = page.waitForSelector('#groupSecondSelection',{timeout:15000})
		.then(
				()=>{

						return (async function(){
							try{

							const text = await page.evaluate(()=>{
								return (async function(){

								if(document.readyState === 'interactive' || document.readyState === 'complete')	
									{
										//you can continue
									}
								else 
									{
										var promiseDom = new Promise((resolve,reject)=>
												{
													document.addEventListener('DOMContentLoaded',resolve);
												});	
									await promiseDom;
									}


								var makeData = [];
								var clickableMakeDiv = document.getElementById('groupSecondSelection').childNodes[1];
								await clickableMakeDiv.click();
								var makeOptionsNodeList = clickableMakeDiv.childNodes[3].querySelectorAll('.uiMenuItem');

								makeOptionsNodeList.forEach(x=>{makeData.push(x.innerText)});

								return makeData;
								})(); 






								})
							await browser.close();
							contentLoaded = true;
							return text;
							}catch(e){console.log(e)};
							
						})();




				}
			
			).catch((e)=>{console.log(e,"expected error, ignore"); browser.close();return false})


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

		await page.goto(urlKupujem);

	}catch(e){};
	return data;
	}


async function getModelPolovni(make)
	{
		var data;
		try {
		//start up the browser and set config
		const browser = await puppeteer.launch({headless:true});
		const page = await browser.newPage();
		await page.setRequestInterception(true);
		page.setDefaultNavigationTimeout(0);

		data = page.waitForSelector('#brand',{timeout:15000}) 
		.then(
				()=>{

						return (async function(){
							try{
							const text = await page.evaluate((make)=>{
								console.log('EVALUATION MAKE PASSING 1',make);
								return (async function(){

								if (document.readyState === 'interactive' || document.readyState === 'complete')	
									{
										//you can continue
									}
								else 
									{
										var promiseDom = new Promise((resolve,reject)=>
												{
													document.addEventListener('DOMContentLoaded',resolve);
												});	
									await promiseDom;
									}

								var data = [];
								var makeNum;
								var makeOptions = document.getElementsByClassName('sumo_brand')[0].querySelectorAll('.opt');
								console.log(makeOptions,"make OPTIONS");
								var makeButton = document.getElementsByClassName('sumo_brand');

								var foundValue = false;
								for (let i=0;i<makeOptions.length;i++)
									{
										if(!foundValue && makeOptions[i].innerText === make)
											{
												makeNum = i;
												foundValue = true;
												console.log('found make', make, makeNum);
											}
									}
								
								await makeButton[0].childNodes[1].childNodes[0].click(); 
								await makeButton[0].childNodes[2].childNodes[0].childNodes[makeNum].click() 


								
								var modelOptions = document.getElementsByClassName('sumo_model');
								var mdAvailable = modelOptions[0].querySelector('#model');

								var delay = new Promise ((resolve,reject)=>
												{
													mdAvailable.addEventListener('DOMNodeInserted', resolve)
												});	
								await delay;

								function delaySecond(){
									return new Promise ((resolve,reject)=>
												{
													setTimeout(resolve,500);
												});	
								} 

								var available = false;
								function checkQuery()
									{
										var num = mdAvailable.querySelectorAll('option').length;
											if(num>0)
												{available = true;}
									}

								
								while(!available)
									{
										checkQuery();
										if (!available)
											{	
												console.log('waiting');
												await delaySecond();
											}
									}


								var modelOptionsList = modelOptions[0].childNodes[0].options;
								for (let i=0;i<modelOptionsList.length;i++)
									{
										data.push(modelOptionsList[i].value.replace('-',' '));
									}

								return data;

								//___INSIDE PAGE
								})(); 


								},make)
							await browser.close();
							contentLoaded = true;
							return text;

							}catch(e){console.log(e)};








						})();




				}
			
			).catch((e)=>{console.log(e,"expected error, ignore"); browser.close();return false})


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

		await page.goto(urlPolovni);

	}catch(e){};
	return data;
	}

async function getModelKupujem(make)	
	{
		var data;
		try {
		//start up the browser and set config
		const browser = await puppeteer.launch({headless:true});
		const page = await browser.newPage();
		await page.setRequestInterception(true);
		page.setDefaultNavigationTimeout(0);

		data = page.waitForSelector('#groupSecondSelection',{timeout:15000})
		.then(
				()=>{

						return (async function(){
							try{

							const text = await page.evaluate((make)=>{
								return (async function(){

									if(document.readyState === 'interactive' || document.readyState === 'complete')	
									{
										//you can continue
									}
								else 
									{
										var promiseDom = new Promise((resolve,reject)=>
												{
													document.addEventListener('DOMContentLoaded',resolve);
												});	
									await promiseDom;
									}


									function delaySecond(num){
									return new Promise ((resolve,reject)=>
												{
													setTimeout(resolve,num);
												});	
								}
							
								var data = [];
								var makeNum;
								var makeFound = false;
								var clickableMakeDiv = document.getElementById('groupSecondSelection').childNodes[1];
								var makeOptions = clickableMakeDiv.querySelectorAll('.uiMenuItem');
								await clickableMakeDiv.click();

								for (let i=0;i<makeOptions.length;i++)
									{	
										
										if(!makeFound && make.toLowerCase() === (makeOptions[i].innerText).toLowerCase())
											{
												makeNum = i;
												makeFound = true;
											}	
									}

							 	var modelOptionsBox = document.querySelector("#carModelSecondSelection");
							 	var clickableModelDiv = modelOptionsBox.querySelector('.choiceLabel');
							 	var dataAvailable = false;
							 	var counter = 1;

							 	// Due to website latency and internet speed, as well as some other factors
							 	// requests sent may take too long or may not get a response at all
							 	// So i introduced this block of code to bypass this issue..

							 	// Another way to solve this would be to catch and track the request
							 	// that way we can know exactly when it has responded, as well as what
							 	// to do next..
							 	// however that seems imposible to do withing the website

							 	while (!dataAvailable && counter <= 10)
							 		{
							 			var waitingTime = 300*counter;
							 			await makeOptions[makeNum].click();
							 			await delaySecond(waitingTime);
							 			await clickableModelDiv.click();
							 			await delaySecond(100);
							 				if(modelOptionsBox.querySelectorAll('.uiMenuItem')[0] === undefined)
							 					{
							 						//cancel 
							 						counter++;
							 						await clickableMakeDiv.querySelectorAll('.choiceOptionClose')[1].click();
							 					}
							 				else 
							 					{
							 						dataAvailable = true;
							 					}
							 		};




								await delaySecond(200);
								document.querySelector("#carModelSecondSelection > div > div.choiceLabelHolder").click();

								var modelOptions = document.getElementById('carModelSecondSelection').querySelectorAll('.uiMenuItem');

								for (let i=0;i<modelOptions.length;i++)
									{
										data.push(modelOptions[i].innerText);
									}

								return data;
								})(); 






								},make)
							await browser.close();
							contentLoaded = false;
							return text;

							}catch(e){console.log(e)};








						})();




				}
			
			).catch((e)=>{console.log(e,"expected error"); browser.close();return false})


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

		await page.goto(urlKupujem);

	}catch(e){};
	return data;
	}


async function getYearPolovni(make,model)
	{
		var data;

		try {
		//start up the browser and set config
		const browser = await puppeteer.launch({headless:true});
		const page = await browser.newPage();
		await page.setRequestInterception(true);
		page.setDefaultNavigationTimeout(0);

		data = page.waitForSelector('.sumo_year_to',{timeout:15000})
		.then(
				()=>{

						return (async function(){
							try{

							const text = await page.evaluate((make,model)=>{
								return (async function(){

								if(document.readyState === 'interactive' || document.readyState === 'complete')	
									{
										//you can continue
									}
								else 
									{
										var promiseDom = new Promise((resolve,reject)=>
												{
													document.addEventListener('DOMContentLoaded',resolve);
												});	
									await promiseDom;
									}

								var data;

								console.log(make,model)

								var yearOptionsStart = document.getElementsByClassName('sumo_year_from')[0].querySelectorAll('.opt');
								var yearStartArray = [];

								for (let i=0;i<yearOptionsStart.length;i++)
									{
										yearStartArray.push(yearOptionsStart[i].innerText.replace('.','').replace(' ','').replace('god',''));
									}


								var yearOptionsEnd = document.getElementsByClassName('sumo_year_to')[0].querySelectorAll('.opt');
								var yearEndArray = [];

								for (let i=0;i<yearOptionsEnd.length;i++)
									{
										yearEndArray.push(yearOptionsEnd[i].innerText.replace('.','').replace(' ','').replace('god',''));
									}



								


								data = {"yearStart":yearStartArray,"yearEnd":yearEndArray};

								return data;
								})(); 






								},make,model)
							await browser.close();
							contentLoaded = true;
							return text;

							}catch(e){console.log(e)};








						})();




				}
			
			).catch((e)=>{console.log(e,"expected error, ignore"); browser.close();return false})


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

		await page.goto(urlPolovni);

	}catch(e){};
	return data;
	}

async function getYearKupujem(make,model)
	{
		var data;

		try {
		//start up the browser and set config
		const browser = await puppeteer.launch({headless:true});
		const page = await browser.newPage();
		await page.setRequestInterception(true);
		page.setDefaultNavigationTimeout(0);

		data = page.waitForSelector('#vehicleMakeYearSecondMinSelection',{timeout:15000}) 
		.then(
				()=>{

						return (async function(){
							try{

							const text = await page.evaluate((make,model)=>{
								return (async function(){

								if(document.readyState === 'interactive' || document.readyState === 'complete')	
									{
										//you can continue
									}
								else 
									{
										var promiseDom = new Promise((resolve,reject)=>
												{
													document.addEventListener('DOMContentLoaded',resolve);
												});	
									await promiseDom;
									}


									





								var yearOptionsStart = document.getElementById('vehicleMakeYearSecondMinSelection').querySelectorAll('.uiMenuItem');
								var yearOptionsEnd = document.getElementById('vehicleMakeYearSecondMaxSelection').querySelectorAll('.uiMenuItem');
								var yearStartArray =[];
								var yearEndArray = [];

								for (let i=0;i<yearOptionsStart.length;i++)
									{
										yearStartArray.push(yearOptionsStart[i].innerText.replace('.',''))
									}

								for (let i=0;i<yearOptionsEnd.length;i++)
									{
										yearEndArray.push(yearOptionsEnd[i].innerText.replace('.',''))
									}
								
								var data = {'yearStart':yearStartArray,'yearEnd':yearEndArray};

								return data;
								})(); 






								},make,model)
							await browser.close();
							contentLoaded = true;
							return text;

							}catch(e){console.log(e)};








						})();




				}
			
			).catch((e)=>{console.log(e,"expected error, ignore"); browser.close();return false})


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

		await page.goto(urlKupujem);

	}catch(e){};
	return data;
	}


async function handlerFunction(dataToGet,arg1,arg2)
	{

		var gotData = false;
		var count = 0;
		var make;

		while (!gotData && count < 5)
			{

				make = await dataToGet(arg1,arg2);

				if (make === undefined || make === false)
					{
						count++;
						console.log("FAILED TO GET WEBSITE DATA DUE TO SOME ERROR")
						//try again
					}
				else 
					{
						try{
							if(make.length >= 1)
								{
									gotData = true;
								}

						}catch(e){gotData = false;}

						try
						{

							if(Object.keys(make).length >=1)
								{
									gotData = true;
								}
						}
						catch(e)
							{
								gotData = false;
							}



					}

			}

		if(gotData === false)
			{
				make = false;;
				console.log("HUGE ERROR, TRIED 5 TIMES AND FAILED...")
			}
		
		return make;
	}