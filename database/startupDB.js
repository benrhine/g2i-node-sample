'use strict';

const Datastore = require('nedb-promises');
const fileUtils = require('../util/fileUtils');

const initializeDb = async (inboundDb, inboundFile) => {

	if (!await fileUtils.checkFile(inboundFile)) {
		console.log("Creating new database: " + inboundFile);

		inboundDb.acronym = new Datastore({ filename: inboundFile, autoload: true });
	} else {
		console.log("Existing database: " + inboundFile + " found ...");

		inboundDb.acronym = new Datastore({ filename: inboundFile, autoload: true });
	}
}

module.exports = { initializeDb }
