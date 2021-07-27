const express = require('express');
const journals = express.Router();
const mongoose = require('mongoose');

// import models
const Journal = require('../models/journals');

// INDEX ROUTE
// curl 'http://localhost:3000/journals'
journals.get('/:userID', (req, res) => {
    Journal.find(
        { userID: req.params.userID },
        (err, foundJournals) => {
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
    Journal.create(req.body, (err, createdJournal) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        res.status(200).json(createdJournal);
    })
});

// UPDATE ROUTE
/*
curl -X PUT \
    -H 'Origin: http://localhost:3000' \
    -H "Access-Control-Request-Headers: X-Requested-With" \
    -H "Content-Type: application/json" \
    -d '{"title":"Yet another day", "body":"in paradise", "userID":"123"}' \
    'http://localhost:3000/journals/60e4b6d9ef0f2d6773a706e5'
*/
journals.put('/:id', (req, res) => {
    Journal.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedJournal) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        res.status(200).json(updatedJournal);
    })
});

// DELETE ROUTE
/*
curl -X DELETE \
    'http://localhost:3000/journals/60e4b6d9ef0f2d6773a706e5'
*/
journals.delete('/:id', (req, res) => {
    Journal.findByIdAndRemove(req.params.id, (err, deletedJournal) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        res.status(200).json({
            'deleted_journal': deletedJournal
        });
    })
});

module.exports = journals;