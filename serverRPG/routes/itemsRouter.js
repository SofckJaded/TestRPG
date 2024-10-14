import { Router } from 'express'
import {
	addItem,
	adminAddItem,
	adminRemoveItem,
	equipItem,
	removeItem,
} from '../controllers/itemsController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const itemRouter = new Router()

itemRouter.post('/equipitem', authMiddleware, equipItem)
itemRouter.post('/additem', authMiddleware, addItem)
itemRouter.post('/removeItem', authMiddleware, removeItem)
itemRouter.post('/adminAddItem', authMiddleware, adminAddItem)
itemRouter.post('/adminRemoveItem', authMiddleware, adminRemoveItem)

export default itemRouter
