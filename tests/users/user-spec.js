var app = require('../../server');
var request = require('supertest');
var User = require('')
var user;

describe('User Controller Test', function(){

	beforeEach(function(done){
		user = new User({
			user_id: '1',
			username: 'ahmed',
			password: 'ahmed9999'
		});
		user.save(function(err){
			if(err) console.log(err);
		});
		done();
	});

	afterEach(function(done){
		User.remove(function(err){
			if(err) console.log(err);
		});
	});

	it('should get all the list of users', function(done){
		request(app)
		.get('/api/v1/users')
		.set('Accept', 'application/json')
		.expect('Content-Typee', /json/)
		.expect(200)
		.end(function(err, res){
			if(err) console.log(err);
			expect(res.body.length).toEqual(1);
			expect(res.body[0]).toEqual(jasmine.objectContaining({
					username: 'ahmed',
					password: 'ahmed9999'
			}));
			done();
		});
	});

	it('should get a single user', function(done){
		request(app)
		.get('/api/v1/users/1')
		.set('Accept', 'application/json')
		.expect('Content-Typee', /json/)
		.expect(200)
		.end(function(err, res){
			if(err) console.log(err);
			expect(res.body.length).toEqual(1);
			expect(res.body).toEqual({
				user_id: '1',
				username: 'ahmed',
				password: 'ahmed9999'
			});
			done();
		});
	});

	it('should create a new user', function(){
		request(app)
		.post('/api/v1/users/1')
		.send({
			username: "gnerkus",
			password: "gnerkus9999"
		})
		.set('Accept', 'application/json')
		.expect('Content-Typee', /json/)
		.expect(200)
		.end(function(err, res){
			if(err) console.log(err);
			expect(res.body).toEqual({message: "Created New User"});
			done();
		});
	});

	it('should grant login with user with right password and id', function(done){
		// body...
	});

	it('should update a user account', function(){
		request(app)
		.put('/api/v1/users/1')
		.set('Accept', 'application/json')
		.expect('Content-Typee', /json/)
		.expect(200)
		.end(function(err, res){
			if(err) console.log(err);
			expect(res.body).toEqual({message: User Updated});
			done();
		});
	});

	it('should delete a user', function(){
		request(app)
		.delete('/api/v1/users/1')
		.set('Accept', 'application/json')
		.expect('Content-Typee', /json/)
		.expect(200)
		.end(function(err, res){
			if(err) console.log(err);
			expect(res.body).toEqual({message: "Deleted User"});
			expect(res.body.length).toEqual(0);
			done();
		});
	});

});