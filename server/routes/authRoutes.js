const dotenv = require('dotenv').config();
const express = require('express');
const passport = require('passport');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const User = require('../models/User');

const router = express.Router();

const validationSchema = Joi.object().keys({
    email: Joi.string().label('Email').email().required(),
    password: Joi.string().label('Password').min(8).max(32).required(),
});

router.post('/register', function (req, res) {
    const { error } = validationSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(422).send({ message: error.message });

    const { email, password } = req.body;
    const username = email.split('@')[0] + Date.now();

    const email_temporary_token = jwt.sign({ email: email, type: 'email' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    const password_temporary_token = jwt.sign({ email: email, type: 'password' }, process.env.JWT_SECRET, { expiresIn: '1s' });

    User.register({ email, username, email_temporary_token, password_temporary_token }, password)
        .then(user => {
            // registration successful

            const link = `${process.env.APP_URL}/confirmemail/${email_temporary_token}`;

            const welcomeEmail = {
                to: user.email,
                from: {
                    name: process.env.SENDGRID_FROM_NAME,
                    email: process.env.SENDGRID_FROM_EMAIL,
                },
                subject: `Welcome to Jamaica 7''`,
                text: `Thank you for registering!\n\nPlease click or copy and paste the following link on your browser for confirming your email address:\n${link}`,
                html: `<p>Thank you for registering!</p><p>Please click on the following link for confirming your email address:<br /><a href="${link}">${link}</a></p>`,
            };

            sendgrid.send(welcomeEmail)
                .then(() => {
                    // email was successfully sent
                }, error => {
                    if (error) {
                        console.log('Some error occurred while sending the welcome email:');
                        console.error(error.response.body);
                    }
                });

            req.logIn(user, function (err) {
                if (user) {
                    const newUser = User.returnUserToClient(user);

                    return res.send({ user: newUser });
                } else {
                    return res.status(400).send({ message: 'Something went wrong' });
                }
            });
        })
        .catch(error => {
            // error occurred when registering
            res.status(422).send(error)
        });
});

router.post('/login', function (req, res) {
    const { error } = validationSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(422).send({ message: error.message });

    passport.authenticate('local', function (err, user, info) {
        if (user) {
            req.logIn(user, function (err) {
                if (user) {
                    const loggedUser = User.returnUserToClient(user);
                    
                    return res.send({ user: loggedUser });
                } else {
                    return res.status(400).send({ message: 'Something went wrong' });
                }
            });
        } else if (info) {
            return res.status(400).send({ message: info.message });
        } else {
            return res.status(400).send({ message: 'Something went wrong' });
        }
    })(req, res);
});

router.post('/logout', function (req, res) {
    req.logout();
    res.send();
});

router.post('/check', function (req, res) {
    if (req.isAuthenticated()) {
        res.send({ authenticated: true });
    } else {
        res.send({ authenticated: false });
    }
});

module.exports = router;