var User = require('../models/user.model')[1];
module.exports = {

	// get all users
	getAllUser: function(req, res){
		User.fetchAll().then(function(model){
			res.json(model);
		});
	},

	// get a single user
	getOneUser: function(req, res){
		new User({username: req.params.username}).fetch().then(function(model){
			res.json(model);
		});
	},

	// create a new user
	createUser: function(req, res){
		User.forge(req.body).save().then(function(model){
			res.json({message: "New User Created"});
		});
	},

	// update a user
	updateUser: function(req, res){
		new User({username: req.body.oldname}).fetch().then(function(model){
			delete req.body.oldname;
			model.save(req.body, {patch: true}).then(function(){
				res.json({message: "User Updated"});
			});			
		});
	},

	// delete a user
	deleteUser: function(req, res){
		new User({'username': req.params.username}).fetch().then(function(model){
			model.destroy();
			res.json({message: "User Deleted"});
		});
	}

};