const express = require('express');
const journals = express.Router();
const mongoose = require('mongoose');

// import models
const Journal = require('../models/journals');

// INDEX ROUTE
// curl 'http://localhost:3000/journals'
journals.get('/', (req, res) => {
    Journal.find({}, (err, foundJournals) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        res.status(200).json(foundJournals);
    })
});

// CREATE ROUTE
/*
curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"title":"Another day...", "body":"in paradise", "userID":"123"}' \
    'http://localhost:3000/journals'
*/
journals.post('/', (req, res) => {
    console.log(`req.body: ${req.body}`);
    Journal.create(req.body, (err, createdJournal) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        res.status(200).json(createdJournal);
    })
});

module.exports = journals;