'use strict';

const Acronym = require('../model/Acronym');

const countAcronym = async (db, acronym) => {
    console.log("Counting acronym: " + acronym);
    return await db.acronym.count({acronym: acronym});
}

const findByAcronym = async (db, acronym) => {
    console.log("Inbound search param: " + acronym);
    return await db.acronym.find({acronym: acronym});
}

const search = async (db, from, limit, acronym) => {
    console.log("Inbound search param: " + acronym + ", from: " + from + ", limit: " + limit);
    return await db.acronym.find({acronym: {$regex: new RegExp(acronym)}}).skip(from).limit(limit);
}

const addAcronym = async (db, acronym, meaning) => {
    console.log("Adding acronym: " + acronym);
    return await db.acronym.insert(new Acronym(acronym, meaning), function (err, newDocs) {
        if (newDocs) {
            console.log("New docs created: " + newDocs);
        }
    });
}

const updateAcronym = async(db, acronym, meaning) => {
    console.log("Updating acronym: " + acronym);
    return await db.acronym.update({ acronym: acronym }, { $set: { meaning: meaning } }, { multi: true }, function (err, numReplaced) {
        if (numReplaced) {
            console.log("Number of docs replaced: " + numReplaced);
        }
    });
}

const removeAcronym = async(db, acronym, multiple) => {
    console.log("Removing acronym: " + acronym);
    db.acronym.remove({ acronym: acronym }, { multi: multiple }, function (err, numRemoved) {
        if (numRemoved) {
            console.log("Number of docs removed: " + numRemoved);
        }
    });
}

module.exports = { countAcronym, findByAcronym, search, addAcronym, updateAcronym, removeAcronym }