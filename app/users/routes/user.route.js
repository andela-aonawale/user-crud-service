var users = require('../controllers/user.controller');

module.exports = function(router){
	router.route('/signup').post(users.createUser);
	router.route('/signin').post(users.signInUser);
	router.route('/users').get(users.getAllUser);
	router.route('/user/:username')
	.get(users.getOneUser)
	.put(users.updateUser)
	.delete(users.deleteUser)
	.post(users.signOutUser);
};