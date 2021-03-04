const express = require('express');
const router = express.Router();

// const search = require('./search');
// const city = require('./city')
const insert = require('./insert')

// router.use('/search', search);
// router.use('/city', city);
router.use('/insert', insert);

module.exports = router