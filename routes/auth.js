const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const authController = require('../controllers/authController');

// Register
router.post('/register', authController.registerRequest);

// Register
router.post('/confirm-registration', authController.confirmRegistration);

// Login
router.post('/login', (req, res, next) => {
    res.send('Login');
});

module.exports = router;
