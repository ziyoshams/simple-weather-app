var axios = require('axios');
require('dotenv').load();

var getWeather = function(lat, lng){
  return axios.get(`https://api.darksky.net/forecast/`+ process.env.WEATHER_KEY +`/${lat},${lng}?exclude=flags,hourly,minutely`);
}

module.exports = getWeather;
