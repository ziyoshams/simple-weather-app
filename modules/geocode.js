var axios = require('axios');

var geocodeAddress = function(address){
  var encodedAddress = encodeURIComponent(address);
  return axios.get(`http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`);  
}

module.exports = geocodeAddress;
