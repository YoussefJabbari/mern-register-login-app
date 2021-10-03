const nodemailer  = require('nodemailer');
const jwt  = require('jsonwebtoken');
const bcrypt  = require('bcryptjs');

const User = require('../models/user');
const keys = require('../config/keys');

// Register request
exports.register = (req, res) => {
    const { firstName, lastName, email, password, passwordConfirmation } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password || !passwordConfirmation) {
        return res.status(400).json({ success: false, msg: 'REQUIRED_FIELDS' });
    }

    if (!email.includes('@')) {
        return res.status(400).json({ success: false, msg: 'NOT_VALID_EMAIL' });
    }

    if (password !== passwordConfirmation) {
        return res.status(400).json({ success: false, msg: 'PASSWORD_CONFIRMATION_FAILED' });
    }

    User.getUserByEmail(req.body.email, (err, user) => {
        if (user) {
            // Check user's existence
            return res.status(400).json({ success: false, msg: 'ACCOUNT_ALREADY_REGISTERED' });
        } else {
            // Create new user
            let newUser = new User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            });

            User.addUser(newUser, (err, user) => {
                if (err) {
                    return res.status(400).json({ success: false, msg: 'REGISTER_FAILED'});
                } else {
                    try {
                        sendRegisterRequestMail(user.email, user._id);
                    } catch (e) {
                        console.log('Error: ', e);
                    }
                    return res.status(200).json({ success: true, msg: 'REGISTER_SUCCESS' });
                }
            });
        }
    });
};

// Confirm registration
exports.confirmRegistration = (req, res) => {
    User.findByIdAndUpdate(req.body.id, {enabled: true}, function(err, result) {
        if (err) {
            // User not found
            res.send(err)
        } else {
            // Activating user
            res.send(result)
        }
    });
};

// Login request
exports.login = (req, res) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        return res.status(400).json({ success: false, msg: 'REQUIRED_FIELDS' });
    }

    User.getUserByEmail(req.body.email, (err, user) => {
        if (!user) {
            // Check user's existence
            return res.status(400).json({ success: false, msg: 'NOT_FOUND_ACCOUNT' });
        } else {
            // Check account if enabled
            if (!user.enabled) {
                return res.status(400).json({ success: false, msg: 'ACCOUNT_NOT_CONFIRMED' });
            } else {
                // Check password
                bcrypt.compare(password, user.password).then(isMatch => {
                    if (isMatch) {
                        // Create jwt Payload
                        const jwtPayload = {
                            id: user.id,
                            name: user.firstName + ' ' + user.lastName
                        };

                        // Sign token
                        jwt.sign(
                            jwtPayload,
                            keys.secret,
                            {
                                expiresIn: 31556926
                            },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                            }
                        );
                    } else {
                        // Wrong password
                        return res.status(400).json({ success: false, msg: 'WRONG_PASSWORD' });
                    }
                });
            }
        }
    });
};

// Sending email to the user for confirmation
const sendRegisterRequestMail = (email, id) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'register.login.test@gmail.com',
            pass: 'mernStack'
        }
    });

    let mailOptions = {
        from: 'register.login.test@gmail.com',
        to: email,
        subject: 'Register confirmation',
        text: 'Here is the link to activate your account: http://localhost:3000/registration-confirmed/' + id
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error while sending email: ', error.message);
        }
        console.log('Email sent!');
    });
}
