var axios = require('axios');
require('dotenv').load();

var getBackground = function(summary){
  summary = encodeURIComponent(summary);
  return axios.get({
    url: `http://api.pexels.com/v1/search?query=${summary}+query&per_page=15&page=1`, 
    headers: {
      'Authorization': process.env.PIXEL_KEY
    }
  });
}

module.exports = getBackground;
