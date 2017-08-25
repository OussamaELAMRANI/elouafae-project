const mongoose = require('mongoose')

const articles = mongoose.Schema({
	nInventory: { type: Number, required: true },
	affected: { type: [String], required: true },
	lossNumber: { type: Number },
	lossDate: { type: Date },
	justification: { type: String }
})

const inventorySchema = mongoose.Schema({
	design: { type: String, required: true },
	source: { type: String, required: true },
	codage: { type: Number, required: true },
	initialValue: { type: Number, required: true },
	actualValue: { type: Number, required: true },
	lifeTime: { type: Number },
	enteredAt: { type: Date },
	exitAt: { type: Date },
	details: [ articles ]
})

const inventory = mongoose.model('inventory', inventorySchema)
module.exports = inventory

module.exports.getInventories = (callback) => {
	inventory.find({}, callback)
}

module.exports.getDetailsById = (id, callback) => {
	inventory.findById(id, callback)
}

module.exports.addInventory = (newInv, callback) => {
	newInv.save(callback)
}
