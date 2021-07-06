const express = require('express');
const journals = express.Router();
const mongoose = require('mongoose');

// import models
const Journal = require('../models/journals');

// INDEX ROUTE
journals.get('/', (req, res) => {
    res.send('connected');
})

// journals.get('/', (req, res) => {
//     Journal.find({}, (err, foundJournals) => {
//         if (err) {
//             res.status(400).json({ error: err.message });
//         }
//         res.status(200).json(foundJournals);
//     })
// });

module.exports = journals;