export function sortPriceAsc(data)
	{
		console.log('sorting data');
		//sorts data by it's price in ascending order, from lowest to highest

		var array = [];
		var arrayOther = [];

		data.forEach(page=>{page.forEach(element=>{array.push(element)})});
		//transfer the elements where carPrice is text
		array.forEach(car =>{

			

			if(
				car["Car Price"] === "Podogovoru" || 
				car["Car Price"] === "Kontakt" ||
				car["Car Price"] === "Dogovor" || 
				car["Car Price"] === "Pozvati" ||
				car["Car Price"] === "Kupujem" ||
				car["Car Price"] ==="Naupit")
				{

					
					
					var index = array.indexOf(car);
					arrayOther.push(car);
				}


		})

		arrayOther.forEach(car =>{
			var index = array.indexOf(car);
			array.splice(index,1);
		})
		
		var sorted = array.sort((a,b)=>{return parseFloat(a["Car Price"]) - parseFloat(b["Car Price"])})
		arrayOther.forEach(x=>{sorted.push(x)});
		return sorted;

	}

export function sortPriceDesc(data)
	{

		data.forEach(page=>{page.sort((a,b)=>{return parseFloat(b.price) - parseFloat(a.price)})});


	}

export function sortNameAsc(data)
	{

	}

export function sortNameDesc(data)
	{


	}

export function sortYearAsc(data)
	{

	}

export function sortYearDesc(data)
	{

	}