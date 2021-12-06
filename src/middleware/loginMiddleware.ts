
import User from '../model/User'
import bcrypt from 'bcrypt'
import config from '../config/index'
import jwt from 'jsonwebtoken'
import { IUser } from '../interface/user'
import { Request,Response,NextFunction } from 'express'

const loginMid = async (req: Request, res: Response, next: NextFunction) => {
	const { email,password } = req.body 
	const user: IUser | null = await CHK_EMAIL(email)

	if(user == null) {
		res.status(400).json({ data: 'Invalid Email/Password' })
		return
	}

	const isMatch = await CHK_PASSWORD(password,user?.password)
	if(isMatch == false){
		res.status(400).json({ data: 'Invalid Email/Password' })
		return
	}

	const token = await GENERATE_TOKEN(user!,res)
	res.locals.token = token

	await SAVING_TOKEN(user?.email,token)
	next()

}


const CHK_EMAIL = async (email: string) => {
	const user = await User.findOne({ email })
	return user
}

const CHK_PASSWORD = async (password: string, userPassword: string) => {
	const isMatch = await bcrypt.compare(password,userPassword)
	return isMatch
}

const GENERATE_TOKEN = async (user: IUser, res: Response) => {

	const userObject = {
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		verified: user.verified,
		createdAt: user.createdAt,
		updatedAt: user.updatedAt
	}

	res.locals.user = userObject
	const token = await jwt.sign(userObject,`${config.JWT.LOGIN}`)
	return token
}

const SAVING_TOKEN = async (email: string,token: string) => {
	const user = await CHK_EMAIL(email)
	user!.loginToken = token
	await user!.save()
	return
}



export default loginMid
