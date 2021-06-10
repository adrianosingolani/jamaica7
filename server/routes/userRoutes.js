const express = require('express');
const jwt = require('jsonwebtoken');

const requireAuth = require('../middlewares/requireAuth');

const User = require('../models/User');

const router = express.Router();

router.use(requireAuth);

router.post('/load', function (req, res) {
        const loggedUser = {
            username: req.user.username,
            email: req.user.email,
            email_confirmed: req.user.email_confirmed,
        }

        res.send({ user: loggedUser });
});

router.post('/loadwithtoken', function (req, res) {
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

router.post('/randomusername', function (req, res) {
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

module.exports = router;