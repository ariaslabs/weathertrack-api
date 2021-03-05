const express = require('express');
const format = require('pg-format');
const router = express.Router();
require('dotenv').config()

const db = require('../db');

router.post('/room', async (req, res) => {
    console.log(req.data);
    console.log(req.body);
    let status;
    /**
     * Checks if data has elements.
     */

    if(!req.body.key){
        res.sendStatus(400);
        return
    }
    if(!req.body.city){
        res.sendStatus(400);
        return
    }
    if(!req.body.state){
        res.sendStatus(400);
        return
    }
    if(!req.body.state_id){
        res.sendStatus(400);
        return
    }
    if(!req.body.county){
        res.sendStatus(400);
        return
    }
    if(!req.body.zip_codes){
        res.sendStatus(400);
        return
    }
    if(!req.body.lat){
        res.sendStatus(400);
        return
    }
    if(!req.body.lng){
        res.sendStatus(400);
        return
    }

    if(req.body.key !== process.env.SECRET_KEY) {
        res.send('Incorrect key')
        return
    }

    console.log("made it pass this")

    const payload = [
        req.body.city,
        req.body.state_name,
        req.body.state_id,
        req.body.county, 
        req.body.zip_codes,
        req.body.lat,
        req.body.lng
    ]   
    try {
        const queryCode = 'INSERT INTO cities(city, state, state_id, county, zip_codes, lat, lng) VALUES(s, s, s, s, s, s, s)'
        await db.query(queryCode, payload);
        status = 200
    } catch(err) {
        console.log(err)
        status = 500
    } finally {
        res.sendStatus(status);
    }
});

module.exports = router