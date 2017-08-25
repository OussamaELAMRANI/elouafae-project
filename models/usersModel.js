const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

// const config = require('../config/db')
// require('dotenv').config()
// const JWT = process.env.JWT_SECRET

const UserSchema = mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
	active: { type: Boolean, default: false },
	group: { type: [String], default: ['no one'] },
	createdAt: { type: Date, default: Date.now() },
	updatedAt: { type: Date, default: Date.now() },

})

const User = module.exports = mongoose.model('usrs', UserSchema)

module.exports.addUser = (newUser, callback) => {
	bcryptjs.genSalt(10, (err, salt) => {
		bcryptjs.hash(newUser.password, salt, (err, hashPsswd) => {
			if (err) throw err;
			newUser.password = hashPsswd
			newUser.save(callback)
		})

	})
}
module.exports.getUsers = (callback) => {
	User.find({}, callback)
}
module.exports.getUserById = (id, callback) => {
	User.findById(id, callback)
}
module.exports.getUserByUsername = (login, callback) => {
	// TODO: Add on query ==> ,active: true
	const query = { username: login}
	User.findOne(query, callback)
}
module.exports.comparePassword = (password, hash, callback) => {
	bcryptjs.compare(password, hash, (err, isMatch) => {
		if (err) throw err
		callback(null, isMatch)
	})
}
