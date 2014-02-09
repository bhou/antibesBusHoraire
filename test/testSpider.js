var Crawler = require('crawler').Crawler;
var spider = require('../lib/spider');
var RawData = require('../lib/RawData');

module.exports = {
	testGetDirection : function(test) {
		var c = new Crawler({
		  'maxConnection' : 10,
		  'callback' : function (error, result, $) {
		  	var direction = spider.getDirection(error, result, $);
		  	test.equal(direction, 'GARE ROUTIERE VALBONNE SOPHIA ANTIPOLIS');
		  	test.done();
		  }
		});
		
		c.queue('http://www.ceparou06.fr/horaires_ligne/index.asp?rub_code=6&lign_id=538&sens=1&date=9%2F02%2F2014&heure=0&minute=0');
	},
	
	testLineNo : function(test) {
		var c = new Crawler({
		  'maxConnection' : 10,
		  'callback' : function (error, result, $) {
		  	var lineNo = spider.getLine(error, result, $);
		  	test.equal(lineNo, '01');
		  	test.done();
		  }
		});
		
		c.queue('http://www.ceparou06.fr/horaires_ligne/index.asp?rub_code=6&lign_id=538&sens=1&date=9%2F02%2F2014&heure=0&minute=0');
	},
	
	testSchedule : function(test) {
		var c = new Crawler({
		  'maxConnection' : 10,
		  'callback' : function (error, result, $) {
		  	var schedule = spider.processSchedule(error, result, $, null);
		  	test.equal(schedule['AMPHORES'][0], '07:30');
		  	test.equal(schedule['BRUCS'][2], '|');
		  	test.done();
		  }
		});
		
		c.queue('http://www.ceparou06.fr/horaires_ligne/index.asp?rub_code=6&lign_id=538&sens=1&date=9%2F02%2F2014&heure=0&minute=0');
	}
}
