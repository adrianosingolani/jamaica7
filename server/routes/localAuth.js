const express = require('express');
const session = require('express-session');
const passport = require('passport');
const Joi = require('joi');

const User = require('../models/User');

const router = express.Router();

router.use(session({
    secret: 'mern boilerplate session secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}));

router.use(passport.initialize());
router.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const validationSchema = Joi.object().keys({
    email: Joi.string().label('Email').email().required(),
    password: Joi.string().label('Password').min(8).max(32).required(),
});

router.post('/register', function (req, res) {
    const { error } = validationSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(422).send(error.message);

    const { email, password } = req.body;
    const username = email.split('@')[0] + Date.now();

    User.register({ email, username }, password)
        .then(newUser => {
            // registration successful
            res.send();
        })
        .catch(error => {
            // error occurred when registering
            res.status(422).send(error)
        });
});

router.post('/login', function (req, res, next) {
    const { error } = validationSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(422).send(error.message);

    passport.authenticate('local', function (err, user, info) {
        if (user) {
            req.logIn(user, function (err) {
                if (user) return res.send();
                else return res.status(400).send({ message: 'Something went wrong' });
            })
        } else if (info) {
            return res.status(400).send({ message: info.message });
        } else {
            return res.status(400).send({ message: 'Something went wrong' });
        }
    })(req, res, next);
});

router.post('/logout', function (req, res) {
    // console.log('logout');
    req.logout();
    res.send();
});

router.post('/user', function (req, res) {
    // console.log('isAuthenticated?');
    // if (req.isAuthenticated()) console.log('yes');
    // else console.log('no');
});

module.exports = router;