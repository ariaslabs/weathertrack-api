const express = require('express');
const format = require('pg-format');
const router = express.Router();
require('dotenv').config()

const db = require('../db');

router.post('/rooms', async (req, res) => {
    if(!req.data.key) {
        res.send('Please enter a key')
        return
    }

    if(req.data.key !== process.env.SECRET_KEY) {
        res.send('Incorrect key')
        return
    }

    let citiesData = require('../usCities.json');

    console.log("Cities in file: " + citiesData.length);
    let payload = []
    let msg = ''

    try {
        for(var city of citiesData) {
            payload.push([
                city.city.toLowerCase(),
                city.state_name.toLowerCase(),
                city.state_id.toLowerCase(),
                city.county_name.toLowerCase(),
                city.zips.toString().split(" "),
                city.lat,
                city.lng
            ])   
        }
        const queryCode = 'INSERT INTO cities(city, state, state_id, county, zip_codes, lat, lng) VALUES($1,$2,$3,$4,$5,$6) RETURNING city_id'
        const formatted = format(queryCode, payload)
        await db.query(formatted);
        msg = 'success'
    } catch(err) {
        await pool.query('ROLLBACK')
        msg = 'Proccess broke'
    } finally {
        await pool.end()
        res.send(msg);
    }

});

module.exports = router