import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import fs from 'fs'
import YAML from 'yaml'
import path from 'path'


import userRouter from './routers/userRouter.js'

dotenv.config()
const app = express()
const port = process.env.PORT
const file = fs.readFileSync(path.resolve('swagger.yaml'), 'utf8')
const swaggerDocument = YAML.parse(file)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.send("<a href='/api-doc'>Bấm vào đây để xem hướng dẫn gọi API</a>")
})
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
//Router for user table
app.use('/users', userRouter)

app.listen(port, () => console.log("Server đang chạy tại http://localhost:3000"))
