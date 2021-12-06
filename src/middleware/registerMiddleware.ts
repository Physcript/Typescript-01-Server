
import { Request,Response,NextFunction } from 'express'
import { IUserRegister } from '../interface/error'
import { IUser } from '../interface/user'
import bcrypt from 'bcrypt'
import User from '../model/User'
import validator from 'validator'


const registerMid = async (req:Request,res:Response,next:NextFunction) => {
	const { firstName,lastName,email,password,confirmPassword } = req.body

	let error = CHK_EMPTY(firstName,lastName,email,password,confirmPassword)

	if(Object.keys(error).length >= 1) {
		res.status(400).json({
			error
		})
		return
	}

	if(await CHK_VALID_EMAIL(email)) error.email = 'Invalid Email'
	if(await CHK_EMAIL(email)) error.email = 'Email already exist'
	if(await CHK_PASSWORD(password)) error.password = 'Password at least 6 characters'
	if(await CHK_VALID_PASSWORD(password)) error.password = 'Invalid Password'
	if(await CHK_PASSWORD_MATCH(password,confirmPassword)) error.password = 'Password not match'


	if(Object.keys(error).length >= 1) {
		res.status(400).json({
		error
	})
		return
	}

	const encrypt = await HASH_PASSWORD(password)

	const user = new User({
		firstName,
		lastName,
		email,
		password: encrypt
	})
	await user.save()
	next()
} 
const CHK_EMPTY = (firstName:string,lastName: string,email: string, password: string, confirmPassword: string) => {
	const error:IUserRegister = {}

	if(firstName.trim() === '' ) error.firstName = 'Firstname required'
	if(lastName.trim() === '' ) error.lastName = 'Lastname required'
	if(email.trim() === '' ) error.email = 'Email required'
	if(password.trim() === '' ) error.password = 'Password required'
	if(confirmPassword.trim() === '' ) error.confirmPassword = 'Confirm Password required'	

	return error
}

const CHK_VALID_EMAIL  = async (email: string) => {
	if(validator.isEmail(email)) {
		return false
	}else {
		return true
	} 
}
const CHK_EMAIL = async (email: string) => {
	const user = await User.findOne({ email })
	if(user) return true
	return false
}
const CHK_PASSWORD = async (password: string) => {
	if(password.length <= 5) return true
	return false
}
const CHK_VALID_PASSWORD = async (password: string) => {
	if(password.includes(' ')) return true
	return false
}

const CHK_PASSWORD_MATCH = async (password: string,confirmPassword: string) => {
	if(password !== confirmPassword) return true
	return false
}
const HASH_PASSWORD = async (password:string) => {
	return await bcrypt.hash(password,8)
}
export default registerMid

