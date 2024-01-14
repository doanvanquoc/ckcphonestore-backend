import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import fs from 'fs'
import YAML from 'yaml'
import path from 'path'


import authRouter from './routers/auth.js'
import userRouter from './routers/user.js'
import productRouter from './routers/product.js'
import companyRouter from './routers/company.js'


dotenv.config()
const app = express()
const port = process.env.PORT
const file = fs.readFileSync(path.resolve('swagger.yaml'), 'utf8')
const swaggerDocument = YAML.parse(file)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.send("<a href='/api-doc'><h1>Bấm vào đây để xem hướng dẫn gọi API</h1></a>")
})
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
//Router for user table
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/product', productRouter)
app.use('/company', companyRouter)

app.listen(port, () => console.log("Server đang chạy tại http://localhost:3000"))
