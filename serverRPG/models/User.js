import mongoose from 'mongoose'

const SkillSchema = new mongoose.Schema({
	skillId: Number,
	lvl: Number,
	active: Boolean,
})

const ItemSchema = new mongoose.Schema({
	itemId: Number,
	active: Boolean,
})

const UserSchema = new mongoose.Schema(
	{
		login: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		passwordHash: {
			type: String,
			required: true,
		},
		mainAttribute: {
			type: String,
			required: true,
		},
		lvl: Number,
		exp: Number,
		locationLevel: Number,
		locationStage: Number,
		strength: Number,
		agility: Number,
		intelligence: Number,
		totalHp: Number,
		currentHp: Number,
		hpRegen: Number,
		baseHpRegen: Number,
		totalMana: Number,
		currentMana: Number,
		manaRegen: Number,
		baseManaRegen: Number,
		whiteDamage: Number,
		greenDamage: Number,
		armor: Number,
		baseArmor: Number,
		magicResistance: Number,
		statusResistance: Number,
		physicalResistance: Number,
		criticalHit: Number,
		evasion: Number,
		attackSpeed: Number,
		bonusAttackSpeed: Number,
		baseAttackSpeed: Number,
		spellApm: Number,
		skills: [SkillSchema],
		items: [ItemSchema],
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('User', UserSchema)
