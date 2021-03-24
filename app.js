'use strict';

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

// Public route
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
      });
})

// Public route
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
        });
})

// Public route
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
        });
})

// Public route
app.post('/acronym', function (req, res) {
    console.log("Posting ... Data: " + req.body);
    acronymService.addAcronym(db, req.body.acronym, req.body.meaning)
        .then(data => res.sendStatus(201))
        .catch((error) => {
            console.log("Error", error);
        });
})

// Protected route
app.put('/acronym/:acronym', function (req, res) {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' });
    } else {
        console.log("Putting ... Data: " + req.body);
        acronymService.updateAcronym(db, req.params.acronym, req.body.meaning)
            .then(data => res.sendStatus(200))
            .catch((error) => {
                console.log("Error", error);
            });
    }
})

// Protected route
app.delete('/acronym/:acronym', function (req, res) {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' });
    } else {
        acronymService.removeAcronym(db, req.params.acronym, true)
            .then(data => res.sendStatus(200))
            .catch((error) => {
                console.log("Error", error);
            });
    }
})

app.listen(3000, function () {
	console.log("Started application on port %d", 3000);
});

module.exports = { app }