const jwt = require('jsonwebtoken');

const keys = require('../config/keys');

const authenticated = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, keys.secret, (err, user) => {
            if (err) {
                return res.status(403).json({ success: false, msg: 'FORBIDDEN' });
            }

            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({ success: false, msg: 'UNAUTHORIZED' });
    }
};

module.exports = authenticated;