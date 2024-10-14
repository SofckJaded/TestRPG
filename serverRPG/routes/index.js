import { Router } from 'express'
import itemRouter from './itemsRouter.js'
import skillRouter from './skillsRouter.js'
import userRouter from './userRouter.js'

const router = new Router()

router.use('/auth', userRouter)
router.use('/skill', skillRouter)
router.use('/item', itemRouter)

export default router
