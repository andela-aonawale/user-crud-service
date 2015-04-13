var users = require('../controllers/user.controller');

module.exports = function(router){
	router.route('/users').get(users.getAllUser);
	router.route('/users/:username').get(users.getOneUser);
	router.route('/users/signup').post(users.createUser);
	router.route('/users/edit').put(users.updateUser);
	router.route('/users/delete').delete(users.deleteUser);
	router.route('/users/signin').post(users.signInUser);
	router.route('/users/signout').post(users.signOutUser);
};