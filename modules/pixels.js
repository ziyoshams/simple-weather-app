var request = require('request');
require('dotenv').load();

var getBackground = function(summary){
  summary = encodeURIComponent(summary);
  return new Promise(function(resolve, reject){
    request({
      url: `http://api.pexels.com/v1/search?query=${summary}+query&per_page=15&page=1`,
      json: true,
      headers: {
        'Authorization': process.env.PIXEL_KEY
      }

    }, function(error, response, body) {
      if(body.total_results != 0){

        var photoResults = body.photos.length;
        var index;

        if(photoResults > 2){
          index = Math.floor(Math.random() * photoResults);  
        }
        else{
          index = 0;
        }

        resolve({
          url: body.photos[index].src.large
        });

      }
      else{
        resolve({
          url: "images/bg.jpg"
        });
      }
    });
  });

};

module.exports.getBackground = getBackground;
