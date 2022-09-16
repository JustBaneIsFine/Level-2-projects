export function sortPriceAsc(data)
	{

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
		console.log('sorting data');
		//sorts data by it's price in descending order, from highest to lowest

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
		
		var sorted = array.sort((a,b)=>{return parseFloat(b["Car Price"]) - parseFloat(a["Car Price"])})
		arrayOther.forEach(x=>{sorted.push(x)});
		return sorted;

	}


export function sortYearAsc(data)
	{
		var array = [];
		data.forEach(page=>{page.forEach(element=>{array.push(element)})});

		var sorted = array.sort((a,b)=>{return parseFloat(a["Car Year"]) - parseFloat(b["Car Year"])});
		return sorted;

	}

export function sortYearDesc(data)
	{
		var array = [];
		data.forEach(page=>{page.forEach(element=>{array.push(element)})});

		var sorted = array.sort((a,b)=>{return parseFloat(b["Car Year"]) - parseFloat(a["Car Year"])});
		return sorted;
	}

export function sortKmAsc(data)
	{
		var array = [];
		data.forEach(page=>{page.forEach(element=>{array.push(element)})});

		var sorted = array.sort((a,b)=>{return parseFloat(a["Car KM"]) - parseFloat(b["Car KM"])});
		return sorted;
	}

export function sortKmDesc(data)
	{
		var array = [];
		data.forEach(page=>{page.forEach(element=>{array.push(element)})});

		var sorted = array.sort((a,b)=>{return parseFloat(b["Car KM"]) - parseFloat(a["Car KM"])});
		return sorted;
	}

export function sortCcAsc(data)
	{
		var array = [];
		data.forEach(page=>{page.forEach(element=>{array.push(element)})});

		var sorted = array.sort((a,b)=>{return parseFloat(a["Car CC"]) - parseFloat(b["Car CC"])});
		return sorted;
	}

export function sortCcDesc(data)
	{
		var array = [];
		data.forEach(page=>{page.forEach(element=>{array.push(element)})});

		var sorted = array.sort((a,b)=>{return parseFloat(b["Car CC"]) - parseFloat(a["Car CC"])});
		return sorted;
	}