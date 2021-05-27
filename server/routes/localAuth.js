const express = require('express');
const session = require('express-session');
const passport = require('passport');
const Joi = require('joi');

const User = require('../models/User');

const router = express.Router();

router.use(
    session({
        secret: 'mern boilerplate session secret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    })
);

router.use(passport.initialize());
router.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const authenticate = User.authenticate();

router.post('/register', function (req, res) {
    const validationSchema = Joi.object().keys({
        email: Joi.string().label('Email').email().required(),
        password: Joi.string().label('Password').min(8).max(32).required(),
    });

    const { error } = validationSchema.validate(req.body, { abortEarly: false });

    if (error) return res.status(422).send(error.message);

    const { email, password } = req.body;

    const username = email.split('@')[0] + Date.now();

    User.register({ email, username }, password)
        .then(newUser => {
            // registration successful
            authenticate(email, password)
                .then(authentication => {
                    // successful if authentication.user is true 
                    // then send the user
                    // else send error message
                    
                    if (authentication.user) res.send(authentication.user);
                    else res.status(401).send(authentication.error.message);
                })
                .catch(error => {
                    // error occurred when authenticating
                    res.status(422).send(error.message)
                })
        })
        .catch(error => {
            // error occurred when registering
            res.status(422).send(error.message)
        });
});

module.exports = router;