const express = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const localAuthRoutes = require('./localAuth');
// const apiRoutes = require('./api');

router.use('/auth', localAuthRoutes);

// router.post('/auth', localAuthRoutes);
// router.post('/api', apiRoutes);
// fallback 404
// router.post('/api', (req, res) => res.status(404).json('No route for this path'));

module.exports = router;