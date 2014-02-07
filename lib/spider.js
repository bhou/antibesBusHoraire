var Crawler = require('crawler').Crawler;

module.exports.run = function(urls){
  var c = new Crawler({
    'maxConnection' : 10,
    'callback' : module.exports.spiderCallback
  });
  
  c.queue(urls);
}

module.exports.spiderCallback = function(error, result, $) {
}

