'use strict';

const fs = require('fs');
const fileUtils = require('../util/fileUtils');
const Acronym = require('../model/Acronym');

const loadData = async (inboundFile) => {
	console.log("Verifying " + inboundFile + " exists ...");
	if (fileUtils.checkFile(inboundFile)) {
		let rawData = fs.readFileSync('data/gistfile1.json');
		let rawJson = JSON.parse(rawData);
		let acronymList = [];

		for (let i = 0; i < rawJson.length; i++) {
			acronymList.push(new Acronym(Object.keys(rawJson[i])[0], Object.values(rawJson[i])[0]));
		}

		return acronymList;
	}
}

const populateAcronyms = async (inboundDb, inboundFile) => {
	console.log("Attempting to bootstrap initial data ...");
	//console.log(inboundFile);

	let acronyms = await loadData(inboundFile); // why will it not read the param

	if (acronyms) {
		//console.log(acronyms);

		inboundDb.acronym.insert([
			acronyms
			], function (err, newDocs) {
		  // Two documents were inserted in the database
		  // newDocs is an array with these documents, augmented with their _id
		});
	}
}

module.exports = { populateAcronyms }