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
	 		websiteChoice1 = arrayOfWebsites[1]; //polovni
	 		websiteChoice2 = arrayOfWebsites[2]; //polovni

	 		var website1 = await getWebsiteMake(websiteChoice1);
	 		var website2 = await getWebsiteMake(websiteChoice2);
	 		websiteData['web1'] = website1;
	 		websiteData['web2'] = website2;
	 		res.status(200).send(websiteData);
	 	}
	 else 
	 	{
	 		websiteChoice1 = arrayOfWebsites[1];
	 		var website = await getWebsiteMake(websiteChoice1);
	 		websiteData['web1'] = website;
	 		res.status(200).send(websiteData);
	 	}
	
})

app.post('/getModel',jsonParser, async (req,res)=>{

	 var arrayOfMake = req.body; 
	 var websiteData = {};
	 console.log(req.body,'array of make data');

	 if(arrayOfMake.length === 2)
	 	{
	 		makeChoice1 = arrayOfMake[0];
			makeChoice2 = arrayOfMake[1];
	 		var website1Data = await getWebsiteModel(websiteChoice1,makeChoice1);
	 		var website2Data = await getWebsiteModel(websiteChoice2,makeChoice2);
	 		websiteData['web1'] = website1Data;
	 		websiteData['web2'] = website2Data;
	 		res.status(200).send(JSON.stringify(websiteData));
	 	}
	 else 
	 	{
	 		makeChoice1 = arrayOfMake[0];
	 		websiteData['web1'] = await getWebsiteModel(websiteChoice1,makeChoice1);
	 		res.status(200).send(JSON.stringify(websiteData));
	 	}


})

app.post('/getYear',jsonParser, async (req,res)=>{

	var websiteData = {};


 	 var arrayOfModel = req.body;
	 if(arrayOfModel.length === 2)
	 	{


	 		modelChoice1 = arrayOfModel[0];
	 		modelChoice2 = arrayOfModel[1];
	 		var website1 = await getWebsiteYear(websiteChoice1,makeChoice1,modelChoice1);
	 		var website2 = await getWebsiteYear(websiteChoice2,makeChoice2,modelChoice2);
	 		websiteData['web1'] = website1;
	 		websiteData['web2'] = website2;
	 		res.status(200).send(JSON.stringify(websiteData));
	 	}
	 else 
	 	{
	 		modelChoice1 = arrayOfModel[0];
	 		var website = await getWebsiteYear(websiteChoice1,makeChoice1,modelChoice1);
	 		websiteData['web1'] = website;
	 		res.status(200).send(websiteData);
	 	}

})


app.post('/getData',jsonParser, async (req,res)=>{

	var dataToGet = req.body;	
	var length = Object.keys(dataToGet).length;

	if(length === 2 )
		{	
			var w1Num = await getPageNum(dataToGet['web1'],websiteChoice1);
			var w2Num = await getPageNum(dataToGet['web2'],websiteChoice2);

			var w1Data = await mainHandler(websiteChoice1,dataToGet['web1'],w1Num);
			var w2Data = await mainHandler(websiteChoice2,dataToGet['web2'],w2Num);

			var data = [w1Data,w2Data];
			res.status(200).send(JSON.stringify(data));


		}
	else 
		{
			var w1Num = await getPageNum(dataToGet['web1'],websiteChoice1);
			console.log(w1Num);
			var w1Data = await mainHandler(websiteChoice1,dataToGet['web1'],w1Num);

			var data = [w1Data];


			res.status(200).send(JSON.stringify(data));
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