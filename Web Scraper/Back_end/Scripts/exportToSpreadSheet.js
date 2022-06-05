import { createRequire } from "module";
const require = createRequire(import.meta.url);

import { GoogleSpreadsheet } from 'google-spreadsheet';
const creds = require('./client_secret.json');




var sheetNum = 0;


export async function exportDataToSpreadsheet(data)
	{
		console.log("_________________exporting data_________________");

		//change this
		//paste your spreadsheet adress here
		const doc = new GoogleSpreadsheet('1lMEQtBDCCcHtDzLtZzgl9pOY_M77mw7hA5CCiVGR3G0');

		await doc.useServiceAccountAuth({
			client_email: creds.client_email,
			private_key: creds.private_key,
		});

		const info = await doc.loadInfo();
		console.log("____________________got info____________________");

		const sheet = doc.sheetsByIndex[sheetNum];

		const rows = await sheet.getRows({
			offset:1
		})
		console.log("_________________exporting in progress__________")

		await sheet.addRows(data);
		console.log("______________________DONE!_____________________")
		sheetNum++;
	}

