'use strict';

// Description of the application to build as per https://gist.github.com/TejasQ/686e08eeab91f78ea2d946d7766a508c

// GET /acronym?from=50&limit=10&search=:search
// ▶ returns a list of acronyms, paginated using query parameters
// ▶ response headers indicate if there are more results
// ▶ returns all acronyms that fuzzy match against :search
// GET /acronym/:acronym
// ▶ returns the acronym and definition matching :acronym
// GET /random/:count?
// ▶ returns :count random acronyms
// ▶ the acronyms returned should not be adjacent rows from the data
// POST /acronym
// ▶ receives an acronym and definition strings
// ▶ adds the acronym definition to the db
// PUT /acronym/:acronym
// ▶ receives an acronym and definition strings
// ▶ uses an authorization header to ensure acronyms are protected
// ▶ updates the acronym definition to the db for :acronym
// DELETE /acronym/:acronym
// ▶ deletes :acronym
// ▶ uses an authorization header to ensure acronyms are protected

const compression = require("compression");
const express = require("express");
const bodyParser = require('body-parser')
const startupDB = require('./database/startupDB');
const bootstrap = require('./database/bootstrap');
const acronymService = require("./service/AcronymService");

let db = {};

startupDB.initializeDb(db, 'acronym.db').then(() => {
    bootstrap.populateAcronyms(db, 'data/gistfile1.txt')
        .then(() => { console.log("Database initialization complete..."); });
});

let app = express();
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(compression());

app.get('/acronym/:acronym', function (req, res) {
    console.log("Get ...")
    acronymService.findByAcronym(db, req.params.acronym)
      .then(data => {
          if (data && data[0]) {
              res.send('Acronym meaning retrieved <b>' + data[0].meaning + '</b>')
          } else {
              res.send('<b> No Data Found </b>')
          }
      })
      .catch((error) => {
          console.log("Error", error);
      })
})

app.get('/acronym', function (req, res) {
    console.log("Search ...");
    acronymService.search(db, req.query.from, req.query.limit, req.query.search)
        .then(data => {
            if (data) {
                console.log(data)
                res.status(200).json({
                    data
                })
            } else {
                res.send('<b> No Data Found </b>')
            }
        })
        .catch((error) => {
            console.log("Error", error);
        })
})

app.get('/random/:count', function (req, res) {
    acronymService.countAcronym(db, req.params.count)
        .then(data => {
            if (data) {
                res.send('Acronym count <b>' + data + '</b>')
            } else {
                res.send('<b> No Data Found </b>')
            }
        })
        .catch((error) => {
            console.log("Error", error);
        })
})

app.post('/acronym', function (req, res) {
    console.log("Posting ... Data: " + req.body);
    acronymService.addAcronym(db, req.body.acronym, req.body.meaning)
        .then(data => res.sendStatus(201))
        .catch((error) => {
            console.log("Error", error);
        })
})

app.put('/acronym/:acronym', function (req, res) {
    console.log("Putting ... Data: " + req.body);
    acronymService.updateAcronym(db, req.params.acronym, req.body.meaning)
        .then(data => res.sendStatus(200))
        .catch((error) => {
            console.log("Error", error);
        })
})

app.delete('/acronym/:acronym', function (req, res) {
    acronymService.removeAcronym(db, req.params.acronym, true)
        .then(data => res.sendStatus(200))
        .catch((error) => {
            console.log("Error", error);
        })
})

app.listen(3000, function () {
	console.log("Started application on port %d", 3000)
});

module.exports = { app }