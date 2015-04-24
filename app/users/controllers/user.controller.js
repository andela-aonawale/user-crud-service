var User = require('../models/user.model')[1];
var jwt = require('jsonwebtoken');
var crypto = require('crypto-js/sha256');
var secret = require('../../../config/config').db[process.env.NODE_ENV].secret;
var token;

module.exports = {

	decodeUser: function(req, res){
		jwt.verify(req.body.token, secret, function(err, decoded){
			if(err){
				res.json({message: "token / secret error"});
			}else{
				res.json({username: decoded});
			}
		});
	},

	// get all users
	getAllUser: function(req, res){
		User.query()
		.select("firstname", "lastname", "username", "email", "created_at", "updated_at")
		.then(function(model){
			res.json(model);
		});
	},

	// get a single user
	getOneUser: function(req, res){
		new User({username: req.params.username})
		.fetch({columns : ["firstname", "lastname", "username", "email", "created_at", "updated_at"]})
		.then(function(model){
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
				if(!req.body.username || !req.body.password || !req.body.email){
					res.json({message: "Username, Password and email fields are required"});
				}else{
					token = jwt.sign({username: req.body.username, password: req.body.password}, secret);
					req.body.password = crypto(req.body.password);
					User.forge(req.body).save().then(function(model){
						res.json({message: "Account Created Successfully", "token": token});
					});
				}
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
				token = jwt.sign({username: req.body.username, password: req.body.password}, secret);
				res.json({message: "User Logged in", token: token});
			}else{
				res.json({message: "Invalid username / password"});
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
				token = jwt.sign({username: req.body.username, password: req.body.password}, secret);
				req.body.password = crypto(req.body.password);
				model.save(req.body, {patch: true}).then(function(){
					res.json({message: "User Updated", token: token});
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
				res.json({message: "Account Deleted"});
			}else{
				res.json({message: "User doesn't exist"});
			}
		});
	}

};