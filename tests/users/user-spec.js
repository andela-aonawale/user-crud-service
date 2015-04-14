var app = require('../../server');
var request = require('supertest');
var User = require('../../app/users/models/user.model')[1];

describe('User Controller Test', function(){

beforeEach(function(done){

		User.forge({
			firstname: "ahmed",
  		lastname: "onawale",
			username: "ammyreal",
  		password: "ahmed9999",
 			email: "ahmed@ahmed.co",
  		admin: false
		})
		.save().then(function(err){
			console.log("Created");
			done();
		});
	});

	afterEach(function(done){
		new User({username: "ammyreal"}).fetch().then(function(model){
			model.destroy();
			console.log("Deleted");
		});
		done();
	});


	it('should get all the list of users', function(done){
		request(app)
		.get('/api/v1/users')
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200)
		.end(function(err, res){
			if(err) console.log(err);
			//expect(res.body.length).toEqual(1);
			expect(res.body).toEqual(jasmine.objectContaining({
					firstname: "ahmed",
		  		lastname: "onawale",
					username: "ammyreal"
			}));
			done();
		});
	});

	it('should get a single user', function(done){
		request(app)
		.get('/api/v1/users/ammyreal')
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200)
		.end(function(err, res){
			if(err) console.log(err);
			//expect(res.body.length).toEqual(1);
			expect(res.body).toEqual(jasmine.objectContaining({
					firstname: "ahmed",
		  		lastname: "onawale",
					email: "ahmed@ahmed.co"
			}));
			done();
		});
	});

	it('should create a new user', function(){
		request(app)
		.post('/api/v1/users/signup')
		.send({
			username: "gnerkus",
			password: "gnerkus9999",
			firstname: "gnerkus-first",
			lastname: "gnerkus-last",
			email: "gnerkus@gnerkus.co",
			admin: false,
		})
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200)
		.end(function(err, res){
			if(err) console.log(err);
			expect(res.body).toEqual(jasmine.objectContaining({message: "User Created"}));
			done();
		});
	});

	it('should grant login with user with right password and id', function(done){
		request(app)
		.post('/api/v1/users/signin')
		.send({
			username: "gnerkus",
			password: "gnerkus9999"
		})
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200)
		.end(function(err, res){
			if(err) console.log(err);
			expect(res.body).toEqual(jasmine.objectContaining({message: "User Logged in"}));
			done();
		});
	});

	it('should update a user account', function(done){
		request(app)
		.put('/api/v1/users/edit')
		.send({
			oldname: "ammyreal",
			lastname: "ahmed",
  		firstname: "onawale"
		})
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200)
		.end(function(err, res){
			if(err) console.log(err);
			expect(res.body).toEqual({message: "User Updated"});
			done();
		});
	});

	it('should delete a user', function(done){
		request(app)
		.delete('/api/v1/users/delete')
		.send({username: "ammyreal"})
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200)
		.end(function(err, res){
			if(err) console.log(err);
			expect(res.body).toEqual(jasmine.objectContaining({message: "User Deleted"}));
			done();
		});
	});


});