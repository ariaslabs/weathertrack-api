require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser') 

app.use(cors());
app.use(bodyParser.json())

//Grabs ENV port or 5000
const port =  process.env.PORT || 5000;

const routes = require('./routes');

app.use('/api/v1', routes);

app.listen(port, () => console.log(`Listening on port http://localhost:${port}`))