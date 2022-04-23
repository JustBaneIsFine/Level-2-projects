const fetch = require('node-fetch');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const URLkupujem = "https://www.kupujemprodajem.com/";
const URLpolovni = "https://www.polovniautomobili.com/";
const URLg = "https://www.google.com/";


(async () => {
	  const browser = await puppeteer.launch({headless:false});
	  const page = await browser.newPage();
	  await page.goto(URLkupujem);


	  page.setDefaultNavigationTimeout(10000);
	  page.setDefaultTimeout(2000);

	async() => {
		const text = await page.evaluate(() => {
	   var array = await page.$$("categoryTitle"); //this get's all elements with this class name and returns a html collection
		console.log(array[0].childNodes[3].innerText);
		}

	 //   var b = [];
	 //   for (i = 0;i < array.length;i++){b.push(array[i].childNodes[3].innerText)};
		// console.log(b);   	

	};

	  console.log(text);
	  await page.screenshot({ path: 'example.png' });
	  await browser.close();
})();


const getRawData = (URL) => 
	{
		return fetch(URL)
		.then((response)=>response.text())
		.then((data) => {return data});
	};


	//car selling websites in Serbia
	//Will also make web scraper and comparison for 
	//amazon/ebay or some other sites, will see..
