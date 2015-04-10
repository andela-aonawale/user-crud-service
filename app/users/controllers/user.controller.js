var User = require('../models/model')[0];
module.exports = {

	// get all users
	getAllUser: function(req, res){
		User.fetchAll().then(function(model){
			res.send(model.toJSON());
		});
	},

	// get a single user
	getOneUser: function(req, res){
		User({username: req.params.username}).fetch().then(function(model){
			res.send(model.toJSON());
		});
	},

	// create a new user
	createUser: function(req, res){
		User.forge(req).save().then(function(){
			res.send("New User Created").toJSON();
		});
	},

	// update a user
	updateUser: function(req, res){
		User({username: req.params.username}).fetch().then(function(model){
			model().save(req, {patch: true}).then(function(){
				res.send("User Updated").toJSON();
			});
		});
	},

	// delete a user
	deleteUser: function(req, res){
		User({username: req.params.username}).fetch().then(function(model){
			model.destroy();
		});
	}

};