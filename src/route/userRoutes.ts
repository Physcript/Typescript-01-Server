import express from 'express'
import { registerCon,loginCon,authCon } from '../controller/userController'
import registerMiddleware from '../middleware/registerMiddleware'
import loginMiddleware from '../middleware/loginMiddleware'
import authMiddleware from '../middleware/authMiddleware'

const router = express.Router()

router.post('/register',registerMiddleware,registerCon)
router.post('/login',loginMiddleware,loginCon)
router.get('/auth',authMiddleware,authCon)

export default router