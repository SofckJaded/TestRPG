import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import 'dotenv/config.js'
import { intelligenceBase } from '../baseStats/IntelligenceBase.js'
import { strengthBase } from '../baseStats/StrengthBase.js'
import { agilityBase } from '../baseStats/AgilityBase.js'

import UserModel from '../models/User.js'

export const register = async (req, res, next) => {
	try {
		const candidate = await UserModel.findOne({ email: req.body.email })

		if (candidate) {
			return res.status(500).json({
				message: 'Wrong email or password',
			})
		}

		const password = req.body.password
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(password, salt)
		const err = () => {
			throw new SyntaxError('No main attribute')
		}

		const setStat = (stat, attribute) => {
			if (stat === 'strength') {
				if (attribute === 'strength') {
					return strengthBase.strength
				} else if (attribute === 'agility') {
					return agilityBase.strength
				} else {
					return intelligenceBase.strength
				}
			}

			if (stat === 'agility') {
				if (attribute === 'strength') {
					return strengthBase.agility
				} else if (attribute === 'agility') {
					return agilityBase.agility
				} else {
					return intelligenceBase.agility
				}
			}

			if (stat === 'intelligence') {
				if (attribute === 'strength') {
					return strengthBase.intelligence
				} else if (attribute === 'agility') {
					return agilityBase.intelligence
				} else {
					return intelligenceBase.intelligence
				}
			}

			if (stat === 'baseHpRegen') {
				if (attribute === 'strength') {
					return strengthBase.baseHpRegen
				} else if (attribute === 'agility') {
					return agilityBase.baseHpRegen
				} else {
					return intelligenceBase.baseHpRegen
				}
			}

			if (stat === 'baseManaRegen') {
				if (attribute === 'strength') {
					return strengthBase.baseManaRegen
				} else if (attribute === 'agility') {
					return agilityBase.baseManaRegen
				} else {
					return intelligenceBase.baseManaRegen
				}
			}

			if (stat === 'baseArmor') {
				if (attribute === 'strength') {
					return strengthBase.baseArmor
				} else if (attribute === 'agility') {
					return agilityBase.baseArmor
				} else {
					return intelligenceBase.baseArmor
				}
			}

			if (stat === 'physicalResistance') {
				if (attribute === 'strength') {
					return strengthBase.physicalResistance
				} else if (attribute === 'agility') {
					return agilityBase.physicalResistance
				} else {
					return intelligenceBase.physicalResistance
				}
			}

			if (stat === 'baseAttackSpeed') {
				if (attribute === 'strength') {
					return strengthBase.baseAttackSpeed
				} else if (attribute === 'agility') {
					return agilityBase.baseAttackSpeed
				} else {
					return intelligenceBase.baseAttackSpeed
				}
			}
		}

		const doc = new UserModel({
			login: req.body.login,
			email: req.body.email,
			passwordHash: hash,
			mainAttribute:
				req.body.mainAttribute === 'agility'
					? 'agility'
					: req.body.mainAttribute === 'strength'
					? 'strength'
					: req.body.mainAttribute === 'intelligence'
					? 'intelligence'
					: undefined,
			lvl: 1,
			exp: 0,
			locationLevel: 1,
			locationStage: 1,
			strength: setStat('strength', req.body.mainAttribute),
			agility: setStat('agility', req.body.mainAttribute),
			intelligence: setStat('intelligence', req.body.mainAttribute),
			totalHp: 200,
			currentHp: 200,
			hpRegen: 0,
			baseHpRegen: setStat('baseHpRegen', req.body.mainAttribute),
			totalMana: 75,
			currentMana: 75,
			manaRegen: 0,
			baseManaRegen: setStat('baseManaRegen', req.body.mainAttribute),
			whiteDamage: 0,
			greenDamage: 0,
			armor: 0,
			baseArmor: setStat('baseArmor', req.body.mainAttribute),
			magicResistance: 25,
			statusResistance: 0,
			physicalResistance: setStat('physicalResistance', req.body.mainAttribute),
			criticalHit: 0,
			evasion: 0,
			attackSpeed: 0,
			bonusAttackSpeed: 0,
			baseAttackSpeed: setStat('baseAttackSpeed', req.body.mainAttribute),
			spellApm: 0,
			skills: [
				{
					skillId: 1,
					lvl: 1,
					active: true,
				},
				{
					skillId: 2,
					lvl: 2,
					active: true,
				},
				{
					skillId: 3,
					lvl: 3,
					active: false,
				},
				{
					skillId: 4,
					lvl: 4,
					active: false,
				},
			],
			items: [
				{
					itemId: 1,
					active: true,
				},
				{
					itemId: 2,
					active: true,
				},
				{
					itemId: 1,
					active: true,
				},
				{
					itemId: 12,
					active: true,
				},
				{
					itemId: 13,
					active: true,
				},
			],
		})

		const user = await doc.save()

		const token = jwt.sign(
			{
				_id: user._id,
			},
			process.env.SECRET_KEY,
			{
				expiresIn: '30d',
			}
		)

		const { passwordHash, ...userData } = user._doc

		return res.json({ ...userData, token })
	} catch (err) {
		console.log(err)
		return res.status(500).json({
			message: 'Something went wrong...',
		})
	}
}

export const login = async (req, res, next) => {
	try {
		const user = await UserModel.findOne({ email: req.body.email })

		if (!user) {
			return res.status(500).json({
				message: 'Wrong email or password',
			})
		}

		const isValidPass = await bcrypt.compare(
			req.body.password,
			user._doc.passwordHash
		)

		if (!isValidPass) {
			return res.status(500).json({
				message: 'Wrong email or password',
			})
		}

		const token = jwt.sign(
			{
				_id: user._id,
			},
			process.env.SECRET_KEY,
			{
				expiresIn: '30d',
			}
		)

		const { passwordHash, ...userData } = user._doc

		return res.json({
			...userData,
			token,
		})
	} catch (err) {
		console.log(err)
		return res.status(500).json({
			message: 'Something went wrong',
		})
	}
}

export const checkUser = async (req, res) => {
	try {
		const user = await UserModel.findOne({ email: req.body.email })

		if (!user) {
			return res.status(404).json({
				message: 'NOT FOUND',
			})
		}

		return res.status(200).json({
			message: 'OK',
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Server Error',
		})
	}
}

export const getMe = async (req, res) => {
	try {
		const user = await UserModel.findById(req.userId)

		if (!user) {
			return res.status(404).json({
				message: 'User is not found',
			})
		}

		const { passwordHash, ...userData } = user._doc

		return res.json(userData)
	} catch (err) {
		res.status(500).json({
			message: 'Not authorized',
		})
	}
}

export const getUser = async (req, res) => {
	try {
		const user = await UserModel.findOne({ login: req.body.login })

		if (!user) {
			return res.status(404).json({
				message: 'User is not found',
			})
		}

		const { __v, createdAt, updatedAt, passwordHash, ...userData } = user._doc

		return res.json(userData)
	} catch (err) {
		res.status(500).json({
			message: 'Not authorized',
		})
	}
}

export const check = async (req, res) => {
	try {
		const token = jwt.sign(
			{
				_id: user._id,
			},
			process.env.SECRET_KEY,
			{
				expiresIn: '30d',
			}
		)
		return res.json({ message: 'success' })
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Not authorized',
		})
	}
}

export const setStat = async (req, res) => {
	try {
		const { stat, value } = req.body
		const user = await UserModel.findOneAndUpdate(
			{ _id: req.userId },
			{ [stat]: value }
		)

		if (!user) {
			return res.status(404).json({
				message: 'User is not found',
			})
		}

		return res.json({ stat, value })
	} catch (err) {
		res.status(500).json({
			message: 'Not authorized',
		})
	}
}

export const setHpMana = async (req, res) => {
	try {
		const data = JSON.parse(req.body)
		const { currentHp, currentMana, id } = data

		const user = await UserModel.findOneAndUpdate(
			{ _id: id },
			{ currentHp: currentHp, currentMana: currentMana }
		)

		if (!user) {
			return res.status(404).json()
		}

		res.status(201).json()
	} catch (err) {
		res.status(500).json({
			message: 'Not authorized',
		})
	}
}

export const updateUser = async (req, res) => {
	try {
		const { user } = req.body
		const data = await UserModel.findOneAndUpdate({ _id: user._id }, user)
		if (!user) {
			return res.status(404).json({
				message: 'User is not found',
			})
		}

		return res.json({ message: 'OK' })
	} catch (err) {
		res.status(500).json({
			message: 'Not authorized',
		})
	}
}
