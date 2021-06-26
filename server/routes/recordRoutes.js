const express = require('express');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const sendgrid = require('@sendgrid/mail');
const Joi = require('joi');
const Discogs = require('disconnect').Client;

const requireAuth = require('../middlewares/requireAuth');

const User = require('../models/User');

const router = express.Router();

const authConfig = {
    consumerKey: process.env.DISCOGS_API_KEY,
    consumerSecret: process.env.DISCOGS_API_SECRET,
}

const db = new Discogs(authConfig).database();

router.post('/', function (req, res) {
    db.getRelease(req.body.id, (err, data) => {
        if (err) return console.error(err);

        res.send(data);
    })
});

router.post('/list', function (req, res) {
    const query = '';
    const options = {
        type: 'release',
        genre: 'reggae',
        country: 'Jamaica',
        format: `7''`,
        year: 1969,
        page: 1,
        per_page: 100,
    }

    db.search(query, options, (err, data) => {
        if (err) return console.error(err);

        const records = data.results.map((item) => {
            return {
                release_id: item.id,
                master_id: item.master_id,
                year: item.year,
                label: item.label,
                style: item.style,
                title: item.title,
                thumb: item.thumb,
                cover_image: item.cover_image,
            }
        });

        return res.send({ pagination: data.pagination, records: records });
    })
});

module.exports = router;