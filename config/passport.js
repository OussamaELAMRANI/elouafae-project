const jwtStrategie = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

require('dotenv').config();
const User = require('../models/usersModel')
const JWT = process.env.JWT_SECRET

module.exports = (passport) => {
	let opts = {}
	opts.jwtFromRequest = ExtractJwt.fromAuthHeader()
	opts.secretOrKey = JWT

	passport.use(new jwtStrategie(opts, (jwt_payload, done) => {
		// get id from the Token String {{jwt_payload._doc._id}}
		User.getUserById(jwt_payload._doc._id, (err, user) => {
			if (err) return done(err, false)
			if (user) {
				// Envoyer les info User et le recuperer au niveau de Haeder:Authantification via {{token}}
				return done(null, user) //
			}
			else {
				return done(null, false)
			}
		})
	}))
}
