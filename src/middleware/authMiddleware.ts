
import { Request,Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'


const authMid = async (req: Request, res:Response, next: NextFunction) => {
	const cookie = req.cookies.token
	const user = await verifyToken(cookie)
	if(user != null) {
		res.locals.user = user
		next()
	}else{
		res.status(400).json({ error: 'UnAuthorize' })
	}
	
}

const verifyToken = async ( token: string ) => {
	const decode = await jwt.verify(token,`${config.JWT.LOGIN}`, (err,decode) => {
		if(err) {
			return null
		}else {
			return decode
		}
	})

	return decode
}

export default authMid

