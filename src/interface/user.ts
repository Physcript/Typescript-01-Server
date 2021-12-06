export interface IUser {
	firstName: string,
	lastName: string,
	email: string,
	password: string,
	verified: boolean,
	loginToken: string
	createdAt: Date,
	updatedAt: Date
}

