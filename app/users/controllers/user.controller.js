var User = require('../models/user.model')[1];
var jwt = require('jsonwebtoken');
var crypto = require('crypto-js/sha256');
var secret = require('../../../config/config').db[process.env.NODE_ENV].secret;
var token;

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
			if(model){
				res.json(model);
			}else{
				res.json({message: "User not found"});
			}
		});
	},

	// create a new user
	createUser: function(req, res){
		new User({username: req.body.username}).fetch()
		.then(function(model){
			if(!model){
				token = jwt.sign({username: req.body.username, password: req.body.email}, secret);
				req.body.token = token;
				req.body.password = crypto(req.body.password);
				User.forge(req.body).save().then(function(model){
					res.json({message: "User Created", "token": model.attributes.token});
				});
			}else if(model){
				model.attributes.email === req.body.email ? 
				res.json({message: "Email is associated with another account"}) :
				res.json({message: "Username is unavailable"});
			}
		});		
	},

	// signIn to user account
	signInUser: function(req, res){
		new User({username: req.body.username, password: crypto(req.body.password)})
		.fetch().then(function(model){
			if(model){
				token = jwt.sign({username: req.body.username, password: req.body.email}, secret);
				req.body.token = token;
				model.set({"token": token});
				model.save();
				res.json({message: "User Logged in", token: token});
			}else{
				res.json({message: "User doesn't exist"});
			}	
		});
	},

	// signOut from user account
	signOutUser: function(req, res){
		new User({username: req.params.username}).fetch().then(function(model){
			if(model){
				model.set({"token": ""});
				model.save();
				res.json({message: "User Logged Out"});
			}else{
				res.json({message: "User doesn't exist"});
			}
		});
	},

	// update a user
	updateUser: function(req, res){
		new User({username: req.params.username}).fetch().then(function(model){
			if(model){
				model.save(req.body, {patch: true}).then(function(){
					res.json({message: "User Updated"});
				});
			}else{
				res.json({message: "User doesn't exist"});
			}		
		});
	},

	// delete a user
	deleteUser: function(req, res){
		new User({'username': req.params.username}).fetch().then(function(model){
			if(model){
				model.destroy();
				res.json({message: "User Deleted"});
			}else{
				res.json({message: "User doesn't exist"});
			}
		});
	}

};