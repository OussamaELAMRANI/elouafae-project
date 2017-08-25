const mongoose = require('mongoose')


const sourceSchema = mongoose.Schema({
	source: { type: String, required: true },
})

module.exports = sources = mongoose.model('sources', sourceSchema)

module.exports.getSoureces = (callback) => {
	sources.find({}, callback)
}
module.exports.addSource = (newSource, callback) => {
	newSource.save(callback)
}


