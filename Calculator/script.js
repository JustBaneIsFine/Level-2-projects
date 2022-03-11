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
	if (e.target.id === "calculatorBox"){return;}
	
	const x = e.target.value;

	const setandDis0 = () => 
					{
						display(count); 
						symbol = "";
						a = "";		
						isFirst = true;					
					}
	const setandDis1 = () => 
		{
			display(count,x);
			symbol = x;
			a = "";
		}

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
			else if (checkIfSign(x) != null && x != "=") //if entry is a sign
				{
					isFirst = false;
					symbol = x;
					display(count,symbol);
				} 

		} 
	else if (!isFirst)
	//if not first block
		{
			if (symbol != "" && checkIfSign(x) != null && a === "" && x != "=") 
			//if not first, and there is a symbol already, and entry is a sign, and there is no other number
			//then change the symbol
				{
					symbol = x;
					display(count,symbol);
				}

			if (symbol != "" && checkIfSign(x) === null){
				if (a === "" && x === "."){}
				else 
				{
					a = a.concat(x);
					display(count,symbol,a);
				}
				
			} 


			if (symbol != "" && a != "" && checkIfSign(x) != null) // if symbol and a and is a sign
				{
					console.log(count + symbol + a);
					var temp1 = parseFloat(count);
					var temp2 = parseFloat(a);
					


					if(x === "=")
					{
						switch (symbol) 
							{
						      case '+':
						        count = (temp1+temp2).toString();
						        setandDis0();
						        break;

						      case '-':
						        count = (temp1-temp2).toString();
						      	setandDis0();
						        break;

						      case 'x':
						        count = (temp1*temp2).toString();
						      	setandDis0();
						        break;

						      case '/':
						      	count = (temp1/temp2).toString();
						      	setandDis0();
						      	break;
						    }
					} else if (x != "=")
						{
							switch (symbol)
								{
								  case '+':
							        count = (temp1+temp2).toString();
							        setandDis1();
							        break;

							      case '-':
							        count = (temp1-temp2).toString();
							      	setandDis1();
							        break;

							      case 'x':
							        count = (temp1*temp2).toString();
							      	setandDis1();
							        break;

							      case '/':
							      	count = (temp1/temp2).toString();
							      	setandDis1();
							      	break;
								}
						}

						}
					

				}


		

// need to create a delete function...
if (x === "CE"){
		isFirst = true;
		result.value ="";
		a = "";
		symbol = "";
		count = "";
		display(count);
	}

};




box.addEventListener("click",main);
