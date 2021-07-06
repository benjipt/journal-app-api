const express = require('express');
const users = express.Router();
const mongoose = require('mongoose');

// import models
const User = require('../models/users');

// INDEX ROUTE
// curl 'http://localhost:3000/users'
users.get('/', (req, res) => {
    User.find({}, (err, foundJournals) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        res.status(200).json(foundUsers);
    })
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

// UPDATE ROUTE
/*
curl -X PUT \
    -H 'Origin: http://localhost:3000' \
    -H "Access-Control-Request-Headers: X-Requested-With" \
    -H "Content-Type: application/json" \
    -d '{"userName":"testUser", "userPassword":"p014ca0xxsdtvpf033cak23rkh"}' \
    'http://localhost:3000/users/60e4c61d2b0fa27594204815'
*/
users.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedUser) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        res.status(200).json(updatedUser);
    })
});

// DELETE ROUTE
/*
curl -X DELETE \
    'http://localhost:3000/journals/60e4c61d2b0fa27594204815'
*/
users.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        res.status(200).json({
            'deleted_user': deletedUser
        });
    })
});

module.exports = users;