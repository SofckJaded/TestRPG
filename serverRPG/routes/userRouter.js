import { Router } from 'express'
import {
	check,
	login,
	register,
	checkUser,
	getMe,
	setStat,
	setHpMana,
	getUser,
	updateUser,
} from '../controllers/userController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import validationErrorsMiddleware from '../middleware/validationErrorsMiddleware.js'
import {
	loginValidation,
	registerValidation,
} from '../middleware/validationMiddleware.js'

const userRouter = new Router()

userRouter.post(
	'/registration',
	registerValidation,
	validationErrorsMiddleware,
	register
)
userRouter.post('/login', loginValidation, validationErrorsMiddleware, login)
userRouter.get('/check', authMiddleware, check)
userRouter.post('/checkUser', checkUser)
userRouter.post('/setstat', authMiddleware, setStat)
userRouter.post('/sethpmana', setHpMana)
userRouter.get('/getme', authMiddleware, getMe)
userRouter.post('/getUser', authMiddleware, getUser)
userRouter.post('/updateUser', authMiddleware, updateUser)

export default userRouter
