var UserModel = require('../../app/users/models/user.model')[1];
var user;

describe('User Model Test', function(){

	beforeEach(function(done){
		user = new UserModel({
			firstname: "ahmed",
  		lastname: "onawale",
			username: "ammyreal",
  		password: "ahmed9999",
 			email: "ahmed@ahmed.co",
  		admin: false,
  		token: "55229454845b8c11009003ee"
		});
		done();
	});

	afterEach(function(done){
		new UserModel({username: "ammyreal"}).fetch().then(function(model){
			model.destroy();
		});
		done();
	});

	it('should create a Schema and save the user detail in a row', function(done){
		user.save().then(function(model){
			expect(model.attributes).toEqual(jasmine.objectContaining({
				firstname: "ahmed",
	  		lastname: "onawale",
				username: "ammyreal",
	  		password: "ahmed9999",
	 			email: "ahmed@ahmed.co",
	  		admin: false,
	  		token: "55229454845b8c11009003ee"
			}));
			done();
		});
	});
});