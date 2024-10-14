import UserModel from '../models/User.js'

export const equipItem = async (req, res) => {
	try {
		const data = await UserModel.updateOne(
			{ _id: req.userId, 'items._id': req.body._id },
			{ $set: { 'items.$.active': req.body.active } }
		)

		return res.json({
			message: 'OK',
			_id: req.body._id,
			active: req.body.active,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Not authorized',
		})
	}
}

export const addItem = async (req, res) => {
	try {
		const data = await UserModel.findOneAndUpdate(
			{ _id: req.userId },
			{ $addToSet: { items: req.body } },
			{ new: true }
		)
		const { items } = data

		return res.json(items.pop())
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: err.message,
		})
	}
}

export const removeItem = async (req, res) => {
	try {
		const data = await UserModel.findOneAndUpdate(
			{ _id: req.userId },
			{ $pull: { items: { _id: req.body._id } } }
		)

		return res.json(req.body)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: err.message,
		})
	}
}

export const adminAddItem = async (req, res) => {
	try {
		const { rawItems, userId } = req.body
		const data = await UserModel.findOneAndUpdate(
			{ _id: userId },
			{ $addToSet: { items: { $each: rawItems } } }
		)

		return res.json({ message: 'OK' })
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: err.message,
		})
	}
}

export const adminRemoveItem = async (req, res) => {
	try {
		const { rawItems, userId } = req.body
		const data = await UserModel.findOneAndUpdate(
			{ _id: userId },
			{ $pull: { items: { _id: rawItems } } }
		)

		return res.json({ message: 'OK' })
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: err.message,
		})
	}
}
