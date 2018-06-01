const express = require("express");
const geocode = require("./modules/geocode.js");
const weather = require("./modules/weather.js");
const getPhoto = require("./modules/pixels.js");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "public/index.html");
});

app.get("/api/weather/:lat/:lon", (req, res, next) => {
  let { lat, lon } = req.params;
  weather(lat, lon)
    .then(response => response.data)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(port, function() {
  console.log(`Running on port ${port}`);
});
