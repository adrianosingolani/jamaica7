const express = require('express');
const jwt = require('jsonwebtoken');
const sendgrid = require('@sendgrid/mail');

const requireAuth = require('../middlewares/requireAuth');

const User = require('../models/User');

const router = express.Router();

router.post('/load', requireAuth, function (req, res) {
    const loggedUser = {
        username: req.user.username,
        email: req.user.email,
        email_confirmed: req.user.email_confirmed,
    }

    res.send({ user: loggedUser });
});

router.post('/loadwithtoken', requireAuth, function (req, res) {
    let email_temporary_token = 'valid';
    let password_temporary_token = 'valid';

    jwt.verify(req.user.email_temporary_token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) email_temporary_token = 'expired';
    });

    jwt.verify(req.user.password_temporary_token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) password_temporary_token = 'expired';
    });

    const loggedUser = {
        username: req.user.username,
        email: req.user.email,
        email_confirmed: req.user.email_confirmed,
        email_temporary_token: email_temporary_token,
        password_temporary_token: password_temporary_token,
    }

    res.send({ user: loggedUser });
});

router.post('/randomusername', requireAuth, function (req, res) {
    User.randomUsername(req.user)
        .then((user) => {

            const updatedUser = {
                username: user.username,
                email: user.email,
                email_confirmed: user.email_confirmed,
            }

            res.send({ user: updatedUser });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post('/confirmemail', function (req, res) {
    const { token } = req.body;

    let message;

    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            if (err.name === 'TokenExpiredError') message = 'token expired';
            else message = err.message;

            jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true }, function (err, decoded) {
                if (decoded?.type === 'email') {
                    return res.status(400).send({ message: message, email: decoded.email });
                } else {
                    message = 'invalid token';
                    return res.status(400).send({ message: message });
                }
            });
        } else {
            if (decoded.type !== 'email') return res.status(400).send({ message: 'invalid token' });

            const email_temporary_token = jwt.sign({ email: decoded.email, type: 'email' }, process.env.JWT_SECRET, { expiresIn: '1s' });

            User.findOneAndUpdate(
                {
                    email: decoded.email,
                    email_temporary_token: token,
                },
                {
                    email_confirmed: true,
                    email_temporary_token: email_temporary_token,
                })
                .then((user) => {
                    if (user) {
                        return res.send({ message: 'email confirmed' });
                    } else {
                        // jwt is valid but user not found
                        return res.status(400).send({ message: 'user not found' });
                    }
                })
                .catch((err) => {
                    return res.status(400).send({ message: 'some error occurred while confirming your email address' });
                });
        }
    });
});

router.post('/sendconfirmationemail', function (req, res) {
    const { email, email_temporary_token } = req?.user ? req.user : req.body; 

    const new_email_temporary_token = jwt.sign({ email: email, type: 'email' }, process.env.JWT_SECRET, { expiresIn: '7d' });

    User.findOneAndUpdate(
        {
            email: email,
            email_temporary_token: email_temporary_token,
        },
        {
            email_temporary_token: new_email_temporary_token,
            email_confirmed: false,
        })
        .then((user) => {
            const link = `${process.env.APP_URL}/confirmemail/${new_email_temporary_token}`;

            const confirmationEmail = {
                to: email,
                from: {
                    name: process.env.SENDGRID_FROM_NAME,
                    email: process.env.SENDGRID_FROM_EMAIL,
                },
                subject: 'Email address confirmation',
                text: `Please click or copy and paste the following link on your browser for confirming your email address:\n${link}`,
                html: `Please click on the following link for confirming your email address:<br /><a href="${link}">${link}</a>`,
            };
        
            sendgrid.send(confirmationEmail)
                .then(() => { 
                    res.send({ message: 'email sent' });
                }, error => {
                    if (error) {
                        console.error(error.response.body)
                        return res.status(400).send({ message: 'some error occurred while sending the confirmation email' });
                    }
                });
            
        })
        .catch((err) => {
            return res.status(400).send({ message: 'user not found' });
        });
});

module.exports = router;