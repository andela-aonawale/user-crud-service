module.exports = {

	db: {

		user: {
			connection: {
				host: 'ec2-54-221-249-3.compute-1.amazonaws.com',
				port: '5432',
				user: 'uckedtmwbbavrc',
				password: 'Tyq-83IyZY9qkjYmA43M4AgU5w',
				database: 'ddnbiadjc5oll8',
				charset: 'utf8'
			},
			name: 'user',
			secret: '@ammyreal'
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

