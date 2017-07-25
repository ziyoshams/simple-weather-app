var request = require('request');

var geocode = (address) =>{

  return new Promise((resolve, reject) => {
    request({
      url:`http://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
      json: true
    }, (error, response, body)=>{
      if(error){
        reject("Unable to connect to Google Servers");
      }else if(body.status === "ZERO_RESULTS"){
        reject("Entered address is not found.");
      }else if(body.status === "OK"){
        resolve({
          address:body.results[0].formatted_address,
          lat:body.results[0].geometry.location.lat,
          lng:body.results[0].geometry.location.lng
        });
      }

    });
  });
};

geocode("11230").then((address) =>{
  console.log("Results: \n")
  console.log(JSON.stringify(address, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});
