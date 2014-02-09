var RawData = require('../lib/RawData');
var redis = require('redis');

module.exports = {
	setUp: function(callback) {
		this.rawData = new RawData('1970-01-01', '1', 'AMPHORES');

		this.rawData.addSchedule('STOP1', ['8:00','|','10:00']);
		this.rawData.addSchedule('STOP2', ['8:30','8:40','10:30']);
		this.rawData.addSchedule('STOP3', ['8:40','9:40','10:40']);

		this.rawData.store2db();
		
		this.client = redis.createClient();
		
		callback();
	},
	
	tearDown: function(callback) {
		this.client.del(
			'1:AMPHORES:STOP1:1970-01-01', 
			'1:AMPHORES:STOP2:1970-01-01', 
			'1:AMPHORES:STOP3:1970-01-01');
		
		this.client.del('1:AMPHORES:1970-01-01');
		
		this.client.del(
			'1:AMPHORES:0:1970-01-01', 
			'1:AMPHORES:1:1970-01-01', 
			'1:AMPHORES:2:1970-01-01');
		
		this.client.del('testSET');
	
		this.client.unref();
		
		callback();
	},
	
	testAddSchedule : function(test) {
		test.equal(this.rawData.stops.length, 3);
		test.equal(this.rawData.stops[0], 'STOP1');
		test.equal(this.rawData.stops[1], 'STOP2');
		test.equal(this.rawData.stops[2], 'STOP3');
		
		this.client.llen('1:AMPHORES:STOP1:1970-01-01', function(err, res){
			test.equal(res, 3);
			test.done();
		});
	},
	
	testSchedule : function(test) {
		this.client.lrange('1:AMPHORES:STOP1:1970-01-01', 0, 3, function(err, res){
			test.equal(res[0].replace(/\s+/g, ''), '8:00');
			test.equal(res[1].replace(/\s+/g, ''), '|');
			test.equal(res[2].replace(/\s+/g, ''), '10:00');
			test.done()
		});
	},

	testBus : function(test) {
		this.client.lrange('1:AMPHORES:0:1970-01-01', 0, 3, function(err, res) {
			test.equal(res[0], '8:00');				
			test.equal(res[1], '8:30');
			test.equal(res[2], '8:40');
				
			test.done();
		});
	},
	
	testBusNum : function(test) {
		this.client.get('1:AMPHORES:3:1970-01-01', function(err, res) {
			test.equal(res, null);				
			test.done();
		});
	},
	
}

