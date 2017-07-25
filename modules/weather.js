var request = require('request');
require('dotenv').load();

var getWeather = function(lat, lng){
  return new Promise(function(resolve, reject){
    request({
      url: `https://api.darksky.net/forecast/`+ process.env.WEATHER_KEY +`/${lat},${lng}`,
      json: true
    }, function(error, response, body){
      if(!error){
        console.log('Getting weather info');
        resolve({
          temperature: body.currently.temperature,
          windSpeed: body.currently.windSpeed,
          summary: body.currently.summary
        });

      }else{
        reject({
          temperature: 0,
          windSpeed: 0,
          summary: 0
        });
      }
    });
  });

};

module.exports.getWeather = getWeather;
