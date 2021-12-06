
import mongoose, { Schema } from 'mongoose'

import { IUser } from '../interface/user'
const userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: {
		type: String,
		lowercase: true
	},
	password: String,
	verified: {
		type: Boolean,
		default: false
	},
	loginToken: String
}, { timestamps: true })
const User = mongoose.model<IUser>('User',userSchema)
export default User

