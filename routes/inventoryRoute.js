const express = require('express')
// const passport = require('passport')
const routes = express.Router()

const invCtr = require('../controllers/inventoryController')()

routes.post('/new-place', invCtr.addPlace)
routes.post('/new-source', invCtr.addSrc)

routes.post('/new', invCtr.addInv)

routes.get('', invCtr.getInv)
routes.get('/sources', invCtr.getSources)
routes.get('/places', invCtr.getPlaces)
routes.get('/:id/details', invCtr.getDetails)
// routes.get('/profile',
// 	passport.authenticate('jwt', { session: false }),
// 	usersCtr.profile)

// routes.post('/sign-up', usersCtr.addUser)
// routes.post('/login', usersCtr.logIn)


module.exports = routes

