import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import fs from 'fs'
import YAML from 'yaml'
import path from 'path'
import http from 'http'
import {Server} from 'socket.io'


import authRouter from './routers/auth.js'
import userRouter from './routers/user.js'
import productRouter from './routers/product.js'
import companyRouter from './routers/company.js'
import reviewRouter from './routers/review.js'
import orderRouter from './routers/order.js'
import cartRouter from './routers/cart.js'
import orderDetailRouter from './routers/order_detai.js'
import addressRouter from './routers/address.js'
import bannerController from './routers/banner.js'
import admin from './config/firebase.js'
import notificationRouter from './routers/notification.js'


dotenv.config()
const app = express()
const server = http.createServer(app)
const io = new Server(server)
const port = process.env.PORT
const file = fs.readFileSync(path.resolve('swagger.yaml'), 'utf8')
const swaggerDocument = YAML.parse(file)

//connect socket
io.on('connection', (socket) => {
    console.log('Client kết nối đến socket')
    socket.on('disconnect', () => {
        console.log('Client ngắt kết nối với socket')
    })
    socket.on('updated_order_ui', (data) => {
        console.log(data)
        admin
          .send({
            notification: {
              title: "Thông báo",
              body: `Đơn hàng của bạn đã được cập nhật`,
            },
            data: {
              click_action: "FLUTTER_NOTIFICATION_CLICK",
            },
            token: data,
          }).then(data=>{
            console.log('Thành công: ', data);
          }).catch(err=>{
            console.log('Thất bại', err)
          })
    })

    socket.on('add_order', (data) => {
      console.log('data từ client:', data);
      io.emit('order_updated', data)
    })
})

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
app.use('/review', reviewRouter)
app.use('/order', orderRouter)
app.use('/cart', cartRouter)
app.use('/order-detail', orderDetailRouter)
app.use('/address', addressRouter)
app.use('/banners', bannerController)
app.use('/notification', notificationRouter)

server.listen(port, () => console.log("Server đang chạy tại http://localhost:3000"))
export {io}