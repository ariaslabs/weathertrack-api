const express = require('express');
const router = express.Router();
const City = require('../models/City')

router.get('/', async(req, res) => {

    if(req.query._id === undefined) {
        res.send(400)
        return
    }

    let roomID = req.query._id.trim().toLowerCase();

    try {
        var result = await City.findById(roomID).exec();
    } catch(err) {
        res.sendStatus(404);
        return
    }
    res.json(result);
});

router.get('/location', async (req, res) => {
    if(req.query.lat === undefined || req.query.lng === undefined || req.query.lat === '' || req.query.lng === '') {
        res.send(400);
    }

    let lat = req.query.lat.split('.')[0];
    let lng = req.query.lng.split('.')[0];
    let payload;

    try {
        var docs = await City.find({}).exec();
         for(let doc of docs) {
            if(doc.lat.split('.')[0] === lat && doc.lng.split('.')[0] === lng) {
                payload = doc;
                break;
            }
        }
    } catch(err) {
        res.sendStatus(404);
        return
    }
    
    res.json(payload);
})

module.exports = router