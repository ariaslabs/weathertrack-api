const express = require('express');
const format = require('pg-format');
const router = express.Router();
require('dotenv').config()

const db = require('../db');

router.post('/room', async (req, res) => {

    let status;
    /**
     * Checks if data has elements.
     */
    switch(true) {
        case !req.data.key:
            res.sendStatus(400);
            return
        case !req.data.city:
            res.sendStatus(400);
            return
        case !req.data.state:
            res.sendStatus(400);
            return
        case !req.data.state_id:
            res.sendStatus(400);
            return
        case !req.data.county:
            res.sendStatus(400);
            return
        case !req.data.state_id:
            res.sendStatus(400);
            return
        case !req.data.lat:
            res.sendStatus(400);
            return
        case !req.data.lng:
            res.sendStatus(400);
            return
    }

    
    if(!req.data.key) {
        res.send('Please enter a key')
        return
    }

    if(req.data.key !== process.env.SECRET_KEY) {
        res.send('Incorrect key')
        return
    }

    console.log("Cities in file: " + citiesData.length);
    const payload = [
        city.city.toLowerCase(),
        city.state_name.toLowerCase(),
        city.state_id.toLowerCase(),
        city.county.toLowerCase(), 
        city.zip_codes,
        city.lat,
        city.lng
    ]   

    try {
        const queryCode = 'INSERT INTO cities(city, state, state_id, county, zip_codes, lat, lng) VALUES(s, s, s, s, s, s, s)'
        await db.query(queryCode, payload);
        status = 200
    } catch(err) {
        await pool.query('ROLLBACK')
        status = 500
    } finally {
        await pool.end()
        res.sendStatus(status);
    }
});

module.exports = router