import fs from 'fs';
var path = '/Users/Theseus/Desktop/exportedData.txt'//your path

export function writeToFile(content)
	{
		//transform the content here into string type or what you need

		fs.writeFile(path, content, (err) => {
			 	
			    if (err) throw err;
			    console.log('Content saved!');
			});;
	}

