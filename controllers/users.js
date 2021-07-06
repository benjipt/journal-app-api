const express = require('express');
const users = express.Router();
const mongoose = require('mongoose');

// import models
const User = require('../models/users');

users.get('/', (req, res) => {
    res.send('connected to users');
});

module.exports = users;