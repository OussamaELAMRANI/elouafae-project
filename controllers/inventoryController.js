const Inventory = require('../models/inventoryModel')
const Place = require('../models/placesModel')
const Source = require('../models/sourcesModel')

const invCtr = () => {
	const addInv = (req, res) => {

		let newInv = new Inventory({
			design: req.body.design,
			source: req.body.source,
			codage: req.body.codage,
			initialValue: req.body.initialValue,
			actualValue: req.body.actualValue,
			enteredAt: req.body.enteredAt,
			exitAt: req.body.exitAt,
			details: req.body.details
		})

		Inventory.addInventory(newInv, (err, inv) => {
			if (err) res.json({ success: false, msg: 'Faild add new Inventory' })
			else {
				res.json({ success: true, msg: 'Inventory Added' })
			}
		})
	}

	const getInv = (req, res) => {
		Inventory.getInventories((err, invs) => {
			if (err) res.json({ success: false, msg: err })
			else {
				res.json(invs)
			}
		})
	}

	const getDetails = (req, res) => {
		Inventory.getDetailsById((req.params.id), (err, inv) => {
			if (err) res.json({ success: false, msg: err })
			else {
				res.json(inv)
			}
		})
		// console.log(req.params.id)
	}
	const getSources= (req, res)=>{
		Source.getSoureces((err, srcs) => {
			if (err) res.json({ success: false, msg: err })
			else {
				res.json(srcs)
			}
		})
	}

	const getPlaces= (req, res)=>{
		Place.getPlaces((err, plcs) => {
			if (err) res.json({ success: false, msg: err })
			else {
				res.json(plcs)
			}
		})
	}
	const addPlace = (req, res) => {
		let newPlace = new Place({
			place: req.body.place
		})
		Place.addPlace(newPlace, (err, place) => {
			if (err) res.json({ success: false, msg: 'Faild add new Place' })
			else {
				res.json({ success: true, msg: 'Add new place' })
			}
		})
	}
	const addSrc = (req, res) => {
		let newSource = new Source({
			source: req.body.source
		})
		Source.addSource(newSource, (err, source) => {
			if (err) res.json({ success: false, msg: 'Faild add new Source' })
			else {
				res.json({ success: true, msg: 'Added new Source' })
			}
		})
	}

	return {
		addInv,
		getInv,
		getDetails,
		addPlace,
		addSrc,
		getSources,
		getPlaces
	}
}

module.exports = invCtr
