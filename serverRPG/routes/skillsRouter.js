import { Router } from 'express'
import {
	adminUpdateSkills,
	equipSkill,
} from '../controllers/skillsController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const skillRouter = new Router()

skillRouter.post('/equipskill', authMiddleware, equipSkill)
skillRouter.post('/adminUpdateSkills', authMiddleware, adminUpdateSkills)

export default skillRouter
