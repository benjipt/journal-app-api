const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const methodOverride = require('method-override');
const session = require('express-session');
const bcrypt = require('bcryptjs');

require('dotenv').config();

// App configuration
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Express Middleware
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(express.json());

// Makes the database
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});

// const whitelist = [];
// const corsOptions = {
//     origin: function (origin, callback) {
//         console.log(origin);
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     }
// }

// app.use(cors(corsOptions));

// External Middleware
app.use(methodOverride('_method'));

// Custom Middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} :: ${req.method} ${req.originalUrl}`);
    next();
});

// Controllers
const journalsController = require('./controllers/journals.js');
app.use('/journals', journalsController);

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});