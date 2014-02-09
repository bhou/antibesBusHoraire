var Crawler = require('crawler').Crawler;

function run(urls){
  var c = new Crawler({
    'maxConnection' : 10,
    'callback' : spiderCallback
  });
  
  c.queue(urls);
}

function spiderCallback(error, result, $) {
}

module.exports.run = run;


