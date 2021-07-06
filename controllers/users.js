const express = require('express');
const users = express.Router();
const mongoose = require('mongoose');

// import models
const User = require('../models/users');

users.get('/', (req, res) => {
    res.send('connected to users');
});

// CREATE ROUTE
/*
curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"userName":"testUser", "userPassword":"n4tpyh2c47y6vjjabcpz8ptgza"}' \
    'http://localhost:3000/users'
*/
users.post('/', (req, res) => {
    User.create(req.body, (err, createdUser) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        res.status(200).json(createdUser);
    })
});

module.exports = users;