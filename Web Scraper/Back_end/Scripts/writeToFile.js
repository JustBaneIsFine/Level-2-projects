import fs from 'fs';
var path = '/Users/Theseus/Desktop/exportedData.txt'

export function writeToFile(content)
	{

		fs.writeFile(path, content, (err) => {
			 	
			    if (err) throw err;
			    console.log('Content saved!');
			});;
	}

