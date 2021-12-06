
import config from './config/index'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import router from './route'
import { createServer } from 'http'

// var

const app = express()
const httpServer = createServer(app)

const corsOptions = {
	origin: true,
	credentials: true
}

// use
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors(corsOptions))
app.use(cookieParser())

// cors policy
app.use((req,res,next)=> {
	res.setHeader('access-control-allow-origin', '*')
	res.setHeader('access-control-allow-methods', 'PUT,GET,POST,OPTIONS,DELETE,PATCH')
	res.setHeader('access-control-allow-headers','X-Requested-With,Content-Type')
	res.setHeader('access-control-allow-credentials', 'true')
	next()
})

// app middleware
app.use((req,res,next) => {
	console.log(`METHOD: ${req.method} URL: ${req.url}`)
	next()
})

// route 
app.use('/api',router.userRoute)


// error
app.use((req,res,next) => {
	res.status(404).json({error: 'Not Found'})
})

// up
mongoose
	.connect(`${ config.MONGO.URL}`,config.MONGO.OPTIONS)
	.then(() => console.log(`DATABASE CONNECTED`))
	.catch((err) => console.log(`DATABASE ERROR CONNECTION ${err}`))

httpServer
	.listen(config.SERVER.PORT, () => console.log(`SERVER: ${config.SERVER.HOST}:${config.SERVER.PORT}`))