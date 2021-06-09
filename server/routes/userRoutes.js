const express = require('express');
const jwt = require('jsonwebtoken');

const requireAuth = require('../middlewares/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.post('/load', function (req, res) {
    let email_temporary_token = 'valid';
    let password_temporary_token = 'valid';

    jwt.verify(req.user.email_temporary_token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) email_temporary_token = 'expired';
    });

    jwt.verify(req.user.password_temporary_token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) password_temporary_token = 'expired';
    });

    const loggedUser = {
        username: req.user.username,
        email: req.user.email,
        email_temporary_token: email_temporary_token,
        password_temporary_token: password_temporary_token,
    }
    // console.log(loggedUser);
    res.send({ user: loggedUser });
});

module.exports = router;