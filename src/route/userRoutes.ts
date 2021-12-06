import express from 'express'
import { registerCon,loginCon } from '../controller/userController'
import registerMiddleware from '../middleware/registerMiddleware'
import loginMiddleware from '../middleware/loginMiddleware'
const router = express.Router()

router.post('/register',registerMiddleware,registerCon)
router.post('/login',loginMiddleware,loginCon)

export default router