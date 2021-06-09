const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const https = require('https');
const { readFileSync } = require('fs');
const { resolve } = require('path');
const mongoose = require('mongoose');
// const allRoutes = require('express-list-endpoints');

const app = express();

// ENVIRONMENT VARIABLES
const env = dotenv.config();
dotenvExpand(env);

// DATABASE
const User = require('./models/User');
const mongooseConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};
mongoose.connect(process.env.MONGOATLAS_URI, mongooseConfig)
    .then(connection_obj => {
        // successful connection
        console.log('MongoDB connected');
        // console.log(connection_obj);
    }).catch(err => {
        // handle the error or log "err" object to debug
        console.log('MongoDB connection error:');
        console.log(err.message);
    });

// SESSION
const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
});
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ROUTES
const routes = require('./routes');
app.use('/', sessionMiddleware, routes);

// SERVER
const port = process.env.PORT || 3001;
const httpsOptions = {
    key: readFileSync(resolve(__dirname, './certificates/cert.key')),
    cert: readFileSync(resolve(__dirname, './certificates/cert.pem')),
};
const server = https.createServer(httpsOptions, app).listen(port, () => {
    console.log(`Server running at https://localhost:${port}`);
    // console.log('Routes:');
    // console.log(all_routes(app));
});