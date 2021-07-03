const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const bcrypt = require('bcryptjs');

require('dotenv').config();

// App configuration
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODBNAME = process.env.MONGODBNAME;

// Express Middleware
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

// External Middleware
app.use(methodOverride('_method'));

// Makes the database
mongoose.connect(`mongodb://localhost:27017/${MONGODBNAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});

// Custom Middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} :: ${req.method} ${req.originalUrl}`);
    next();
});

// Controllers
// const journalsController = require('./controllers/journals.js');
// app.use('/journals', journalsController);

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});