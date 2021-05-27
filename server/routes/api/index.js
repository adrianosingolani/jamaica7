const express = require('express');
const router = express.Router();
const usersRoutes = require('./users');

router.post('/users', usersRoutes);

module.exports = router;