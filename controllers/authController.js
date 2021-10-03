const nodemailer  = require('nodemailer');

const User = require('../models/user');

// Register request
exports.registerRequest = (req, res) => {
    User.getUserByEmail(req.body.email, (err, user) => {
        if (user) {
            return res.status(400).json({ success: false, msg: 'ACCOUNT_ALREADY_REGISTERED' });
        } else {
            let newUser = new User({
                email: req.body.email,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName
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
            res.send(err)
        } else {
            res.send(result)
        }
    });
};

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
