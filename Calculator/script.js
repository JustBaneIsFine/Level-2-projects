const getIt = (x) => {return document.getElementById(x)};
// getting all elements
	const box = getIt("calculatorBox");
	const num1 = getIt("num1");
	const num2 = getIt("num2");
	const num3 = getIt("num3");
	const num4 = getIt("num4");
	const num5 = getIt("num5");
	const num6 = getIt("num6");
	const num7 = getIt("num7");
	const num8 = getIt("num8");
	const num9 = getIt("num9");
	const num0 = getIt("num0");

	const add = getIt("add");
	const sub = getIt("sub");
	const multi = getIt("multi");
	const equal = getIt("equal");
	const dot = getIt("dot");

	const result = getIt("result");
	const clearCurrent = getIt("clearCurrent");
	const clearAll = getIt("clearAll");


// could have used "eval()" to calculate what ever we input inside 
// the result input..
// However, the documentation says it is dangerous..
// And also it is easy to do it that way..
// I don't like easy..
// i like a challenge and a learning oppurtunity
// So..
var count ="";
var a = "";
var isFirst = true;
var symbol = "";

const main = (e) => {
	const x = e.target.value;
	
	var b;
	
	var old;
	const signs = /["+","\-","=","*","/","x"]/g;


	const display = (number, sign) => 
	{result.value = number + sign;} 

	const checkIfSign = (s) => //checks for a sign and returns it
		{
			if (s.match(signs) != null)
				{
					return s.match(signs)[0];
				} 
				else {return null};
		}

	if (isFirst && checkIfSign(x) === null)
		{

			count = count.concat(x);
			display(count,"");
		} else if (checkIfSign(x) != null){

			isFirst = false;
			symbol = x;

			display(count,symbol);
		}



	if (isFirst === false && checkIfSign(x) === null)
		{
			a = a.concat(x);
			console.log(a,"and",symbol);

			display(count,symbol+a);

		} else if (isFirst === false && checkIfSign(x) != null) {
			// result = count + - *  a;

			switch (x)
				{
					case "+":
					console.log("it's a PLUS"); 
				}

		}

		//if first entry and not a sign, then we display it..



		// num1 true false
		// num2 true false
		//if num1 true, concat until sign, then num2 true
		// if num2 true concat until sign..
		// if sign, num


	//Functions i will probably need to make: <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

		//if second number, and there is no sign, concat with first..
			// will concat until sign shows up..

		//If sign and a number is present, display both
		//If both present, and entry is sign, change sign

		//if both present and entry is number, add number..
		//if second number present, concat new entry(if number)

		// if new sign pressed again, calculate result, and 
		// then show result + new sign..

		// if 

	// from what i see, we will first need to check 
	// if entry is sign or number, as well as what we have
	// in store (number 1 or number 2)
	// to be continued tommorow
};




addEventListener("click",main);
