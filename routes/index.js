const express = require('express');
const router = express.Router();

const search = require('./search');
const city = require('./city')

router.use('/search', search);
router.use('/city', city);

module.exports = router