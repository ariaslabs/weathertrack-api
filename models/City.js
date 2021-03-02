const mongoose = require('mongoose');

var citySchema = new mongoose.Schema({
    city: String,
    state: String,
    state_id: String,
    county: String,
    zip_codes: Array,
    lat: Number,
    lng: Number,
})

var City = mongoose.model('City', citySchema);

 module.exports = City