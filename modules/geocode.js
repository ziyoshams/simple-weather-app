var request = require('request');

var geocodeAddress = function(address){
  var encodedAddress = encodeURIComponent(address);

  return new Promise(function(resolve, reject){
    request({
      url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json: true
     }, function(error, response, body){
      if(error){
        reject(function(){
          console.log("Some Error occured");
          process.exit();
        });
      } else if(body.status === "ZERO_RESULTS"){
        reject(function(){
          console.log("Zero results\n");
          process.exit();
        });
      }else if(body.status === "OK"){
        console.log('Gettig location details.');
        resolve({
          city:     body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude:body.results[0].geometry.location.lng
        });
      }
    });
  });
}

module.exports.geocodeAddress = geocodeAddress;
