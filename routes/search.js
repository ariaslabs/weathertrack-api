const express = require('express');
const router = express.Router();
const City = require('../models/City')
const cors = require('cors');

router.use(cors());

router.get('/', async(req, res) => {

    if(req.query.search === '' || req.query.search === undefined) {
        res.send(400);
        return
    }

    let searchPayload = req.query.search.trim().toLowerCase() //
    let payload = []

    try {
        var docs = await City.find({}).exec();
         for(let doc of docs) {
            switch(true){
                case doc.city.substr(0, searchPayload.length).toLowerCase() === searchPayload:
                    payload.push(doc);
                    continue
                case doc.state.substr(0, searchPayload.length).toLowerCase() === searchPayload:
                    payload.push(doc);
                    continue
                case doc.state_id.substr(0, searchPayload.length).toLowerCase() === searchPayload:
                    payload.push(doc);
                    continue
                case doc.county.substr(0, searchPayload.length).toLowerCase().trim() === searchPayload:
                    payload.push(doc);
                    continue
                case doc.zip_codes.find(item => item == searchPayload) === searchPayload:
                    payload.push(doc);
                    continue
                default: 
                    continue
            }
        }
    } catch(err) {
        res.sendStatus(404);
        return
    }
    res.json(payload);
});


module.exports = router