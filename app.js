var axios   = require('axios');
var express = require('express');
var hbs     = require('hbs');
var request = require('request');
var geocode = require('./modules/geocode.js');
var weather = require('./modules/weather.js');
var getPhoto = require('./modules/pixels.js');
//var flickr = require('./modules/flickr.js');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })



var port = process.env.PORT || 3000;
var app = express();
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname+ "/views/partials");
app.set('view engine', 'hbs');


var address = '';
var lat, lng, temper, city, summary, windSpeed;



app.get('/', function(req, res){
  console.log('--> main.hbs');
    res.render('main.hbs');
});

function showPage(addr, result){
  app.get('/results', function(requ, resp){
    resp.render('index.hbs', {
      lat: lat,
      lng: lng,
      city: city,
      temperature: temper,
      wind: windSpeed,
      summary: summary,
      url: result.url
    });
  });
}

function getData(address, res){
  if(address != ''){
    geocode.geocodeAddress(address)
      .then(function(result){
        lat = result.latitude;
        lng = result.longitude;
        city = result.city;
        return weather.getWeather(result.latitude, result.longitude);
      })
      .then(function(result){
        temper = result.temperature;
        windSpeed = result.windSpeed;
        summary = result.summary;
        return getPhoto.getBackground(summary);
    })
    .then(function(result){
      res.redirect('/results');

      showPage(address, result);
    })
    .catch(function(){
      res.redirect('/');
    });
  }

}

app.post('/search', urlencodedParser, (req, res) =>{
  address = req.body.address;
  if (address != '') {
    getData(address, res);
  }
  else{
    res.redirect('/');
  }
});

app.listen(port, function(){
  console.log(`Server is running on port ${port}`);
});
