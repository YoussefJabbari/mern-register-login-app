const User = require('../models/user');

// Get user list
exports.getUserList = (req, res) => {
    User.find({}, function(err, users) {
        if (!users) {
            return res.status(400).json({ success: false, msg: 'UNKNOWN_ERROR' });
        } else {
            return res.status(200).json({ success: true, userList: users });
        }
    });
};
