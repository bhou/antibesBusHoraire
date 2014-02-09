var redis = require('redis');

function RawData(date, line, direction) {
	// --- private properties ---
	var busN = 0;		// number of bus
	
	// --- public properties ---
	this.date = date;
	this.line = line;
	this.direction = direction;
	
	this.stops = [];
	this.schedules = {};	
	this.buses = [];

	// --- private methods ---
	var process = function(self) {
		self.buses = [];
		var bus = [];
		
		for (var i = 0; i < busN; i++) {
			for (var j = 0; j < self.stops.length; j++) {
				bus.push(self.schedules[self.stops[j]][i])
			}
			
			self.buses.push(bus);
		}
	}
	
	
	// --- public methods ---
	/**
	 * add schedule to the line, direction
	 * @param stop 	string, the stop name
	 * @param schedule	Array, time array
	 */
	this.addSchedule = function(stop, schedule) {
		this.stops.push(stop);
		this.schedules[stop] = schedule;
		
		if ( busN < schedule.length) {
			busN = schedule.length;
		}
	}
	
	/**
	 * store the raw data to db
	 */
	this.store2db = function() {
		process(this);
		
		var client = redis.createClient();
		
		var stopArg = '';
		for (var i = 0; i < this.stops.length; i++ ) {
			stopArg = this.stops[i] + ' ';
			var time = '';
			var key = this.line+':'+this.direction+':'+this.stops[i]+':'+this.date;
			for (var j = 0; j < this.schedules[this.stops[i]].length; j++) {
				time = this.schedules[this.stops[i]][j] + ' ';
				client.rpush(key, time);
			}
		}
		var key = this.line+':'+this.direction+':'+this.date;
		client.rpush(key, stopArg);
		
		for (var i = 0; i < busN; i++) {
			var key = this.line + ':' + this.direction + ':' + i + ':' + this.date;
			for (var j = 0; j < this.stops.length; j++) {
				client.rpush(key, this.schedules[this.stops[j]][i]);
			}
		}
		
		client.quit();
	}
}


module.exports = RawData;
