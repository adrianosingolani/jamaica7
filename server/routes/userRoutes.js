const express = require('express');
const jwt = require('jsonwebtoken');
const sendgrid = require('@sendgrid/mail');
const Joi = require('joi');

const requireAuth = require('../middlewares/requireAuth');

const User = require('../models/User');

const router = express.Router();

router.post('/load', requireAuth, function (req, res) {
    const loggedUser = User.returnUserToClient(req.user);

    res.send({ user: loggedUser });
});

router.patch('/update', requireAuth, function (req, res) {
    const validationSchema = Joi.object().keys({
        email: Joi.string().label('Email').email().required(),
        username: Joi.string().label('Username').min(3).required(),
    });

    const { error } = validationSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(422).send({ message: error.message });


    User.findByIdAndUpdate(req.user._id, { username: req.body.username }, { new: true }) 
    .then((user) => {
        const updatedUser = User.returnUserToClient(user);

        res.send({ user: updatedUser });
    })
    .catch((err => {
        if (err.name === 'MongoError' && err.code === 11000) return res.status(422).send({ message: 'Username is already in use' });
        else return res.status(422).send({ message: err.message });
    }));
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
            if (decoded.type !== 'email') return res.status(400).send({ message: 'Invalid token' });

            const expired_email_temporary_token = jwt.sign({ email: decoded.email, type: 'email' }, process.env.JWT_SECRET, { expiresIn: '1s' });

            User.findOneAndUpdate(
                {
                    email: decoded.email,
                    email_temporary_token: token,
                },
                {
                    email_confirmed: true,
                    email_temporary_token: expired_email_temporary_token,
                })
                .then((user) => {
                    if (user) {
                        return res.send({ message: 'Email confirmed' });
                    } else {
                        // jwt is valid but user not found
                        return res.status(400).send({ message: 'User not found' });
                    }
                })
                .catch((err) => {
                    return res.status(400).send({ message: 'Some error occurred while confirming your email address' });
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
                    return res.send({ message: 'A link for confirming your email address was sent to you' });
                }, error => {
                    if (error) {
                        console.log('some error occurred while sending the confirmation email:');
                        console.error(error.response.body);
                        return res.status(400).send({ message: 'Some error occurred while sending the confirmation email' });
                    }
                });

        })
        .catch((err) => {
            return res.status(400).send({ message: 'User not found' });
        });
});

router.post('/sendpasswordemail', function (req, res) {
    const { email } = req?.user ? req.user : req.body;

    const new_password_temporary_token = jwt.sign({ email: email, type: 'password' }, process.env.JWT_SECRET, { expiresIn: '1d' });

    User.findOneAndUpdate(
        {
            email: email,
        },
        {
            password_temporary_token: new_password_temporary_token,
        })
        .then((user) => {
            const link = `${process.env.APP_URL}/changepassword/${new_password_temporary_token}`;

            const passwordEmail = {
                to: email,
                from: {
                    name: process.env.SENDGRID_FROM_NAME,
                    email: process.env.SENDGRID_FROM_EMAIL,
                },
                subject: 'Password change link',
                text: `Please click or copy and paste the following link on your browser for changing your password:\n${link}`,
                html: `Please click on the following link for changing your password:<br /><a href="${link}">${link}</a>`,
            };

            sendgrid.send(passwordEmail)
                .then(() => {
                    return res.send({ message: 'A link for changing your password was sent to your email' });
                }, error => {
                    if (error) {
                        console.log('Some error occurred while sending the password change email:');
                        console.error(error.response.body);
                        return res.status(400).send({ message: 'Some error occurred while sending the password change email' });
                    }
                });

        })
        .catch((err) => {
            return res.status(400).send({ message: 'User not found' });
        });
});

router.post('/changepassword', function (req, res) {
    const { password, token } = req.body;

    let message;

    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            if (err.name === 'TokenExpiredError') message = 'token expired';
            else message = err.message;

            return res.status(400).send({ message: message });
        } else {
            if (decoded.type !== 'password') return res.status(400).send({ message: 'Invalid token' });

            const expired_password_temporary_token = jwt.sign({ email: decoded.email, type: 'password' }, process.env.JWT_SECRET, { expiresIn: '1s' });

            User.findOneAndUpdate(
                {
                    email: decoded.email,
                    password_temporary_token: token,
                },
                {
                    password_temporary_token: expired_password_temporary_token,
                }
            )
                .then(async (user) => {
                    if (user) {
                        await user.setPassword(password);
                        await user.save();
                        return await res.send({ message: 'Password changed' });
                    } else {
                        // jwt is valid but user not found
                        return res.status(400).send({ message: 'User not found' });
                    }
                })
                .catch((err) => {
                    return res.status(400).send({ message: 'Some error occurred while changing your password' });
                });
        }
    });
});

module.exports = router;