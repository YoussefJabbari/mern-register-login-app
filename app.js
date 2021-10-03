const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const config = require('./config/database');

// DB Connection
mongoose.connect(config.database);

// On connected
mongoose.connection.on('connected', () => {
    console.log('Connected to DB ' + config.database);
});

// On error
mongoose.connection.on('error', (err) => {
    console.log('DB connection error ' + err);
});

const app = express();

// Port number
const port = 5000;

// Cors middleware
app.use(cors());

// Setting the static folder
//app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.json());

// Index route
const router = require('./routes/router');
app.use('/api', router);

// Starting the server
app.listen(port, () => {
    console.log('Server is starting...')
});
