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

    if(!req.data.key){
        res.sendStatus(400);
        return
    }
    if(!req.data.city){
        res.sendStatus(400);
        return
    }
    if(!req.data.state){
        res.sendStatus(400);
        return
    }
    if(!req.data.state_id){
        res.sendStatus(400);
        return
    }
    if(!req.data.county){
        res.sendStatus(400);
        return
    }
    if(!req.data.zip_codes){
        res.sendStatus(400);
        return
    }
    if(!req.data.lat){
        res.sendStatus(400);
        return
    }
    if(!req.data.lng){
        res.sendStatus(400);
        return
    }

    if(req.data.key !== process.env.SECRET_KEY) {
        res.send('Incorrect key')
        return
    }

    const payload = [
        req.data.city.toLowerCase(),
        req.data.state_name.toLowerCase(),
        req.data.state_id.toLowerCase(),
        req.data.county.toLowerCase(), 
        req.data.zip_codes,
        req.data.lat,
        req.data.lng
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