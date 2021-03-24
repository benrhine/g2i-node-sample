'use strict';

const fs = require('fs');

const doesFileExist = (filePath) => {
	return new Promise((resolve, reject) => {
   fs.access(filePath, fs.F_OK, (err) => {
     if (err) {
         console.error("Database file is NOT present ...");

         // Uncomment below to break execution on startup - in this case I want it to create a new db file
         //return reject(err);
    }
     //file exists
     resolve();
   })
 });
}

const checkFile = async (filename) => {
  return doesFileExist('./' + filename);
}

module.exports = { checkFile }