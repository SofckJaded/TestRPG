import UserModel from '../models/User.js'

export const equipSkill = async (req, res) => {
	try {
		const data = await UserModel.updateOne(
			{ _id: req.userId, 'skills.skillId': req.body.skillId },
			{ $set: { 'skills.$.active': req.body.active } }
		)

		return res.json({
			skillId: req.body.skillId,
			active: req.body.active,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Not authorized',
		})
	}
}

export const adminUpdateSkills = async (req, res) => {
	try {
		const { userId, rawSkills } = req.body
		await UserModel.findOneAndUpdate(
			{ _id: userId },
			{
				skills: rawSkills,
			}
		)

		return res.json({ message: 'OK' })
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: err.message,
		})
	}
}
