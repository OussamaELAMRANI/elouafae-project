const passport = require('passport')
const jwt 		 = require('jsonwebtoken')
// const config   = require('../config/db')
require('dotenv').config()
const User     = require('../models/usersModel')
const JWT = process.env.JWT_SECRET

const usersCtr = () => {

	const getUsers = (req, res) => {
		User.getUsers( (err, users) => {
			res.json(users)
		})
	}

	const addUser = (req, res) => {
		let newUser = new User({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			username: req.body.username,
			password: req.body.password,
		})

		User.addUser(newUser, (err, usr) => {
			if (err) res.json({ success: false, msg: 'Faild Add This User !!' })
			else {
				res.json({ success: true, msg: 'user added' })
			}
		})
	}

	const logIn = (req, res, next) => {
		const login = req.body.username
		const psswd = req.body.password

		User.getUserByUsername(login, (err, user) => {
			if (err) throw err;
			//if that user not exist and not active
			if (!user) {
				return res.json({ success: false, msg: 'user not found ! or not active' })
			}
			User.comparePassword(psswd, user.password, (err, isMatch) => {
				if (err) throw err;
				if (isMatch) {
					const token = jwt.sign(user, JWT, {
						expiresIn: 604800, // 1 week
					})
					res.json({
						success: true,
						token: "JWT " + token,
						user: {
							id: user._id,
							name: user.firstName + ' ' + user.lastName,
							username: user.username
						}
					})
				}
				else {
					return res.json({ success: false, msg: 'Wong Password !!' })
				}
			})
		})
	}

	const profile = (req, res, next) => {
		res.json({user: req.user})
	}

	return {
		getUsers,
		addUser,
		logIn,
		profile
	}
}

module.exports = usersCtr
