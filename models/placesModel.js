const mongoose = require('mongoose')

const placeSchema = mongoose.Schema({
	place: { type: String, required: true },
})

module.exports = places = mongoose.model('places', placeSchema)

module.exports.getPlaces = (callback) => {
	places.find({}, callback)
}
module.exports.addPlace = (newPlace, callback) => {
	// const exist = places.find({})
	newPlace.save(callback)
}


