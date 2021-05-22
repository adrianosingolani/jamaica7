const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const allRoutes = require('express-list-endpoints');

const env = dotenv.config();
dotenvExpand(env);

const app = express();

// const isProduction = process.env.NODE_ENV === 'production';

const whitelist = ['http://localhost:3000/', 'https://localhost:3000/'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new String('Not allowed by CORS'));
        }
    }
}
// app.use(cors(corsOptions));

// app.get('/api/users', cors(), (req, res) => {
app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, email: 'johndoe@gmail.com', username: 'johndoe' },
        { id: 1, email: 'adrianosingolani@gmail.com', username: 'adrianosingolani' },
    ];

    res.json(users);
});

const mongooseConfig = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(process.env.MONGOATLAS_URI, mongooseConfig)
.then(connection_obj => {
    // things you want to do with successful connection
    console.log('MongoDB connected');
    // console.log(connection_obj);
}).catch(err => {
    // handle the error or log "err" object to debug
    console.log('MongoDB connection error:');
    console.log(err.message);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    // console.log('Routes:');
    // console.log(allRoutes(app));
})