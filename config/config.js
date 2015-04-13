module.exports = {

	db: {

		user: {
			connection: {
				host: 'localhost',
				port: '5432',
				user: 'ahmed',
				password: 'pr0t0c0l',
				database: 'userdb',
				charset: 'utf8'
			},
			name: 'users',
			secret: 'ammyreal'
		},

		test: {
			connection: {
				host: 'localhost',
				port: '5432',
				user: 'ahmed',
				password: 'pr0t0c0l',
				database: 'testdb',
				charset: 'utf8'
			},
			name: 'test',
			secret: 'ammyreal'
		}

	},

	port: process.env.PORT || 8000
	
}

