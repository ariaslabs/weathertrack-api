require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');


//City data from https://simplemaps.com/data/us-cities
mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_PWD}@ariaslabs-west.bawjw.mongodb.net/weathertrack?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors());

//Grabs ENV port or 5000
const port =  process.env.PORT || 5000;

const routes = require('./routes');

app.use('/api/v1', routes);

app.listen(port, () => console.log(`Listening on port localhost:${port}`))