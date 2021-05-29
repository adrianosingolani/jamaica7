const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const express = require('express');
const https = require('https');
const { readFileSync } = require('fs');
const { resolve } = require('path');
// const cors = require('cors');
const mongoose = require('mongoose');
// const allRoutes = require('express-list-endpoints');

const app = express();

const routes = require('./routes');

app.use('/', routes);

const env = dotenv.config();
dotenvExpand(env);

// const isProduction = process.env.NODE_ENV === 'production';

// const whitelist = ['http://localhost:3000/', 'https://localhost:3000/'];
// const corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             callback(new String('Not allowed by CORS'));
//         }
//     }
// }
// app.use(cors(corsOptions));

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

const port = process.env.PORT || 3001;

const httpsOptions = {
    key: readFileSync(resolve(__dirname, './security/cert.key')),
    cert: readFileSync(resolve(__dirname, './security/cert.pem')),
};

const server = https.createServer(httpsOptions, app).listen(port, () => {
    console.log(`Server running at https://localhost:${port}`);
    // console.log('Routes:');
    // console.log(all_routes(app));
});