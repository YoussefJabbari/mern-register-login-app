const express = require('express');
const router = express.Router();

// Routes
const home = require('./auth');
const users = require('./users');

router.use('/', home);
router.use('/users', users);

module.exports = router;
