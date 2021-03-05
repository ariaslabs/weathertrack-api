const express = require('express');
const router = express.Router();
const City = require('../models/City');
const cors = require('cors');
const processSearchPagination = require('../middleware/processSearchPagination');

router.use(cors());

router.get('/', processSearchPagination(City), async(req, res) => {
    res.json(res.payload);
});


module.exports = router