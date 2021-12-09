import { Request,Response } from 'express'

export const registerCon = (req: Request,res: Response) => {
	res.status(200).json({ data: 'Account Registered' })
	return
}
export const loginCon = (req: Request, res: Response) => {
	res.status(200).json({ 
		data: {
			user: res.locals.user,
			token: res.locals.token
		}
	})

	res.locals.user = ''
	res.locals.token = ''
	
	return
}

export const authCon = (req: Request, res: Response) => {
	const user = res.locals.user
	res.status(200).json({
		data: {
			user: {
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				verified: user.verified,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt
			}
		}
	})
	return
}
