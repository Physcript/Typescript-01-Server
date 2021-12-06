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