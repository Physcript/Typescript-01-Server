require('dotenv').config()

export default {
	MONGO: {
		URL: process.env.MONGO_URL,
		OPTIONS: {
			wtimeoutMS: 50000,
			useUnifiedTopology: true,
			maxPoolSize: 50
		}
	},
	SERVER: {
		HOST: 'localhost',
		PORT: process.env.PORT || 1337,
	},
	JWT: {
		LOGIN: process.env.JWT_SECRET
	}
}