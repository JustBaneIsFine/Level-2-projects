import express from 'express';
const app = express();
const port = 3000;
import path from 'path';
const pth = {root: "./"};




app.get('/', (req,res) =>{	
	 res.sendFile('./Front_end/index.html' , pth);
	 console.log("send homepage");
})
// page is shown even without this..
app.use(express.static('./Front_end'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/homepage', (req,res) =>{
	 res.sendFile('index.html' , pth);
	 console.log("send homepage2");
})

app.listen(port, ()=> {
	console.log(`Example app listening on port ${port}`)
})


//TEST
// <form action="/register" method="post">
//   <input type="text" id="name" name="name">
//   <input type="email" id="email" name="email">
//   <input type="submit" value="Submit">
// </form>

// app.post('/sentURL',(req,res)=>{
// 	console.log(req.body);
// 	var x = req.body;

// 	res.status(200).send({x})
// })





app.post("/sentURL", (req, res) => {
    var x = req.body;
   	try 
   	{
   		//run this function
   		//if you get data
   		//send data back
   		res.status(200).send(x);
   	} catch(e) {
   		// if you get error, send error	
   		res.status(400).send(e);
   	}
});




//TEST


/*
What we need here:

-	/ - root returns homePage
-	/




*/

