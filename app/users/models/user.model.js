var config = require('../../config/config');
var knex = require('../../config/postgresql');
var bookshelf = require('bookshelf')(knex);

bookshelf.knex.schema.hasTable(config.db[process.env.NODE_ENV].name).then(function(exists){
	if(!exists){
		bookshelf.knex.schema.createTable(config.db[process.env.NODE_ENV].name, function(t){
			t.increments('id').primary();
			t.string('firstname');
			t.string('lastname');
			t.string('username').notNullable();
			t.string('password').notNullable();
			t.string('email');
			t.boolean('admin').defaultTo(false);
			t.timestamps();
		})
		.then(function(){
			console.log('Schema Created');
		});
	}
});

var User = bookshelf.Model.extend({
	tableName: 'users',
	hasTimestamps: true
});

module.exports = [bookshelf, User];