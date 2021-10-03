const express = require('express');
const router = express.Router();

// Get users route
router.get('/users', (req, res, next) => {
    res.send('User list')
});

module.exports = router;
