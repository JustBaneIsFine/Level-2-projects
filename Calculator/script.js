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

const signs = /["+","\-","=","*","/","x"]/g;

// could have used "eval()" to calculate what ever we input inside 
// the result input..
// However, the documentation says it is dangerous..
// And also it is easy to do it that way..
// I don't like easy..
// i want a challenge and a learning oppurtunity
// So..

var count =""; //first number
var a = "";    //second number
var isFirst = true;
var symbol = "";
result.value = "";
const main = (e) => {

	const x = e.target.value;
	


	const display = (num1, sign, num2) => 
		{
			if(sign === undefined)
				{
					result.value = num1;
				} 
			else if (num2 === undefined && sign != "=")
				{ 
						result.value = num1 + sign;
					
				}
			else if (sign !="=")
				{
					result.value = num1 + sign + num2;
				}	
		} 

	const checkIfSign = (s) => //checks for a sign and returns it
		{
			if (s.match(signs) != undefined)
				{
					return s.match(signs)[0];
				} 
				else {return null};
		}

	// if first block
	if (isFirst)
		{
			if (checkIfSign(x) === null) //if entry is not a sign
				{
					display("");
					count = count.concat(x);
					display(count);
				} 
			else if (checkIfSign(x) != null) //if entry is a sign
				{
					isFirst = false;
					symbol = x;
					display(count,symbol);
				} 

		} 
	else if (!isFirst)
	//if not first block
		{
			if (symbol != "" && checkIfSign(x) != null && a === "") 
			//if not first, and there is a symbol already, and entry is a sign, and there is no other number
			//then change the symbol
				{
					symbol = x;
					display(count,symbol);
				}

			if (symbol != "" && checkIfSign(x) === null){
				a = a.concat(x);
				display(count,symbol,a);
			} 

			if (symbol != "" && a != "" && checkIfSign(x) != null)
				{
					console.log(count + symbol + a);
					var temp1 = parseFloat(count);
					var temp2 = parseFloat(a);

					if (x === "=")
					{
						if (symbol === "+")
							{
								count = (temp1+temp2).toString();
								display(count); /////
								symbol = ""; //// these 4 lines can be turned into a function .. <<<<<
								a = "";		/////
								isFirst = true;	/////
							} 
						else if(symbol === "-")
							{
								count = (temp1-temp2).toString();
								display(count);
								symbol = "";
								a = "";
								isFirst = true;
							}
						else if(symbol === "x")
							{
								count = (temp1*temp2).toString();
								display(count);
								symbol = "";
								a = "";
								isFirst = true;
							}
						else if(symbol === "/")
							{
								count = (temp1/temp2).toString();
								display(count);
								symbol = "";
								a = "";
								isFirst = true;
							}
					} else if (x != "=")
						{
							if (symbol === "+")
								{
									count = (temp1+temp2).toString();
									display(count,x);
									symbol = x;
									a = "";

								} 
							else if(symbol === "-")
								{
									count = (temp1-temp2).toString();
									display(count,x);
									symbol = x;
									a = "";
								}
							else if(symbol === "x")
								{
									count = (temp1*temp2).toString();
									display(count,x);
									symbol = x;
									a = "";
								}
							else if(symbol === "/")
								{
									count = (temp1/temp2).toString();
									display(count,x);
									symbol = x;
									a = "";
								}

						}
					

				}


		}

// need to create a delete function...
if (x === "C"){
		result.value ="";
		a = "";
		symbol = "";
		display(count);
	} else if (x === "CE"){
		result.value ="";
		a = "";
		symbol = "";
		count = "";
	}


};




addEventListener("click",main);
