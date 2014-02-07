var http = require('http');
var schedule = require('node-schedule');
var spider = require('./lib/spider.js');

function serverCallback(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}

// start http server
var server = http.createServer(serverCallback);
server.listen(8080, '0.0.0.0');

// schedule spider job
var rule = new schedule.RecurrenceRule();
rule.hour = 10;
rule.minute = 0;
var job = schedule.scheduleJob(rule, function() {
  spider.run();
});