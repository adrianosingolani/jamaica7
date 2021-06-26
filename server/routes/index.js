const express = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const recordRoutes = require('./recordRoutes');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/record', recordRoutes);

module.exports = router;