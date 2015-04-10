var users = require('../controllers/user.controller');

module.exports = function(router){
	router.route('/users').get(users.getAllUser);
	router.route('/users/:username').get(users.getOneUser);
	router.route('/users').post(users.createUser);
	router.route('/users/:username').put(users.updateUser);
	router.route('/users/:username').delete(users.deleteUser);
};