import express from 'express'
import dotenv from 'dotenv'

import userRouter from './routers/userRouter.js'

dotenv.config()
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Router for user table
app.use('/', userRouter)

app.listen(port, () => console.log("Server đang chạy tại http://localhost:3000"))
