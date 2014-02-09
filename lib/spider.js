var Crawler = require('crawler').Crawler;

var RawData = require('../lib/RawData');

function run(urls){
  var c = new Crawler({
    'maxConnection' : 10,
    'callback' : spiderCallback
  });
  
  c.queue(urls);
}

function spiderCallback(error, result, $) {
	var line = getLine(error, result, $);
	var direction = getLine(error, result, $);
	
	rawData = new RawData(date, line, direction);
	processSchedule(error, result, $, rawData);
	
	console.log('[' + date + '] storing the schedule to db ...')
	rawData.store2db();
}

function getDirection(error, result, $) {
	return $("input[checked='checked']").next().text();
}

function getLine(error, result, $) {
	var line = $(".line");
	return $("img", line).attr('alt');
}

function processSchedule(error, result, $, rawData) {
	var result = {};
	var stops = [];
	
	var tr = $(".row0, .row1");
	tr.each(function(index, value){
		var stop = $("td[headers='arret'] > a", value).text();
		var horaires = $("td.horaire", value);
		if (result[stop] == null) {
			stops.push(stop);
			result[stop] = [];
			horaires.each(function(i){
				result[stop].push($(this).text());
			});
		}
	});
	
	if (rawData != null) {
		for (var i = 0; i < stops.length; i++) {
			console.log(stops[i]);
			console.log(result[stops[i]]);
			rawData.addSchedule(stops[i], result[stops[i]]);
		}
	}
	
	return result;
}

module.exports.run = run;
module.exports.getDirection = getDirection;
module.exports.getLine = getLine;
module.exports.processSchedule = processSchedule;


