var config = require('./config');
var knex = require('knex');

module.exports = function(){
	var db = knex({
		client: 'pg',
		connection: config.db[process.env.NODE_ENV].connection;
	});
	return db;
};