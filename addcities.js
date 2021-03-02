require('dotenv').config()
const mongoose = require('mongoose');


//City data from https://simplemaps.com/data/us-cities
const dbPwd = process.env.MONGO_PWD
console.log(dbPwd);

mongoose.connect(`mongodb+srv://admin:${dbPwd}@ariaslabs-west.bawjw.mongodb.net/weathertrack`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
var City = require('./models/City')

 async function process(){
    const citiesData = require('./usCities.json')
    console.log("Cities in file: " + citiesData.length);

    for(var city of citiesData) {
        console.log(city.city);
        var payload = {
            city: city.city.toLowerCase(),
            state: city.state_name.toLowerCase(),
            state_id: city.state_id.toLowerCase(),
            county: city.county_name.toLowerCase(),
            zip_codes: city.zips.toString().split(" "),
            lat: city.lat,
            lng: city.lng,
        }
    
        var newCity = new City(payload);
        await newCity.save();
    }

}
// var checkCities = async () => {
//     console.log('Checking City list')
//     try{
//         var results = await City.find({}).then(docs => docs)
//         console.log('Cities: ' + results.length);
//         if(results.length === 0) {
//             console.log("Adding Cites");
//             process();
//         }  
//     } catch(err) {
//         console.log(err);
//     }
    
//     console.log('BYE!')
// }

// module.exports = checkCities;
    //process();
//

