var redis = require('redis');
var moment = require('moment');

var client = redis.createClient();

function Schedule() {}
	this.stops = [];	// list of stop 
	this.schedules = [];  // list of stop schedule 

	/**
	 * add a schedule 
	 * @param date 	string, the date of schedule
	 * @param line 	string, the line number/name
	 * @param direction		string, the direction of the line, this direction might not be the real one
	 * @param stop 	string, the stop name
	 * @param schedule 	Array, list of time 
	 */
	function addSchedule(date, line, direction, stop, schedule) {
		// update stop set by line
	
	
		// update schedule of a line, stop
	}

	function getCurrentDate(){

	}
}




// export
module.exports.Data = 

