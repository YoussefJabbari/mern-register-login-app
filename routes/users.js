const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authenticated = require('../middlewares/authenticated');

// Get users route
router.get('/user-list', authenticated, userController.getUserList);

module.exports = router;
