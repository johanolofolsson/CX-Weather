// Dependencies
const express = require('express');
const router = express.Router();

const request = require('request');



router.get('/:city/:country', (req, res) => {
  const city = req.params.city;
  const country = req.params.country;


  // Rapid API Settings
  var APIoptions = {
    method: 'GET',
    url: 'https://community-open-weather-map.p.rapidapi.com/forecast',
    qs: { q: city + ',' + country, units: 'metric'},
    headers: {
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
      'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
      useQueryString: true
    }
  };

  request(APIoptions, function (error, response, body) {
    if (error) throw new Error(error);

    const forecast = JSON.parse(body);
    // console.log(forecast);

    res.status(200).json({
      // id: forecast.city.id,
      // city: forecast.city.name,
      // country: forecast.city.country,
      tomorrowDate: forecast.list[1].date,
      tomorrowTemp: forecast.list[1].main.temp,
      forecast
    });

  });

});



module.exports = router;