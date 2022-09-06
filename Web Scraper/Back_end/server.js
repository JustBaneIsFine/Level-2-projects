import express from 'express';
const app = express();
const port = 3000;
import path from 'path';
const pth = {root: "./"};
import {getPageNum} from './Scripts/getPageNum.js';
import {mainHandler} from './Scripts/script.js'
import {getWebsiteMake,getWebsiteModel,getWebsiteYear} from './Scripts/getOptions.js';
import { createRequire } from 'module';
import {sortPriceAsc} from '../Front_end/sorting.js';
const require = createRequire(import.meta.url);

var bodyParser = require('body-parser');

var websiteChoice1;
var websiteChoice2;
var makeChoice1;
var makeChoice2;
var modelChoice1;
var modelChoice2;


var jsonParser = bodyParser.json();

app.get('/', (req,res) =>{	
	 res.sendFile('./Front_end/index.html' , pth);
})


app.post('/getMake',jsonParser , async (req,res)=>{

	var arrayOfWebsites = req.body; 

	 var websiteData = {};

	 if(Object.keys(arrayOfWebsites).length === 2)
	 	{
	 		websiteChoice1 = arrayOfWebsites[1];
	 		websiteChoice2 = arrayOfWebsites[2];

	 		var website1 = await getWebsiteMake(websiteChoice1);
	 		var website2 = await getWebsiteMake(websiteChoice2);
	 		websiteData[websiteChoice1] = website1;
	 		websiteData[websiteChoice2] = website2;
	 		res.status(200).send(websiteData);
	 	}
	 else 
	 	{
	 		websiteChoice1 = arrayOfWebsites[1];
	 		var website = await getWebsiteMake(websiteChoice1);
	 		websiteData[websiteChoice1] = website;
	 		res.status(200).send(websiteData);
	 	}
	
})

app.post('/getModel',jsonParser, async (req,res)=>{

	 var arrayOfMake = req.body; 

	 console.log(req.body,'array of make data');
	 if(Object.keys(arrayOfMake).length === 2)
	 	{
	 		makeChoice1 = arrayOfMake[0];
			makeChoice2 = arrayOfMake[1];
	 		var website1 = await getWebsiteModel('polovni',makeChoice1);
	 		var website2 = await getWebsiteModel('kupujem',makeChoice2);
	 		var websiteData = {'polovni':website1,'kupujem':website2};
	 		res.status(200).send(JSON.stringify(websiteData));
	 	}
	 else 
	 	{
	 		makeChoice1 = arrayOfMake[0];
	 		var website = await getWebsiteModel(websiteChoice1,makeChoice1);
	 		res.status(200).send(website);
	 	}


})

app.post('/getYear',jsonParser, async (req,res)=>{

 	 var arrayOfModel = req.body;
	 if(Object.keys(arrayOfModel).length === 2)
	 	{
	 		modelChoice1 = arrayOfModel[0];
	 		modelChoice2 = arrayOfModel[1];
	 		var website1 = await getWebsiteYear(websiteChoice1,makeChoice1,modelChoice1);
	 		var website2 = await getWebsiteYear(websiteChoice2,makeChoice2,modelChoice2);
	 		var websiteData = {"polovni":website1,"kupujem":website2};
	 		res.status(200).send(JSON.stringify(websiteData));


	 	}
	 else 
	 	{
	 		modelChoice1 = arrayOfModel[0];
	 		var website = await getWebsiteYear(websiteChoice1,makeChoice1,modelChoice1);
	 		res.status(200).send(website);
	 	}

})


app.post('/getData',jsonParser, async (req,res)=>{

	var dataToGet = req.body;	

	if(Object.keys(dataToGet).length === 2 )
		{	

			var polovniNum = await getPageNum(dataToGet['polovni'],'polovni');
			var kupujemNum = await getPageNum(dataToGet['kupujem'],'kupujem');

			var polovniData = await mainHandler('polovni',dataToGet['polovni'],polovniNum);
			var kupujemData = await mainHandler('kupujem',dataToGet['kupujem'],kupujemNum);

			var data = [polovniData,kupujemData];

			res.status(200).send(JSON.stringify(data));


		}
	else 
		{
			var websiteNum = await getPageNum(dataToGet[Object.keys(dataToGet)[0]]);

			var webData = await mainHandler(websiteNum);

			var data =[webData];

			res.status(200).send(JSON.stringify(sortedData));
		}

})

app.use(express.static('./Front_end'));




app.listen(port, ()=> {
	console.log(`Listening on port ${port}`)
})





// app.post("/sentURL", async (req, res) => {
//     var x = req.body;

    
//     	req.connection.on('close',function(){    
//        console.log("connection closed")
//     });

//    	try 
//    	{
//    		await mainHandler();
//    		res.status(200).send("IT WORKS");
   		
//    	} catch(e) {
//    		// if you get error, send error	
//    		res.status(400).send(e);
//    	}

// });