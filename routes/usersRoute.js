const express = require('express')
const passport = require('passport')
const routes = express.Router()

const usersCtr = require('../controllers/usersControlles')()

routes.get('', usersCtr.getUsers)
routes.get('/profile',
	passport.authenticate('jwt', { session: false }), // change jwt to Bear...
	usersCtr.profile)

routes.post('/sign-up', usersCtr.addUser)
routes.post('/login', usersCtr.logIn)


module.exports = routes

