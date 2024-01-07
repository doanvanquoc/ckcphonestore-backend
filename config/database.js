import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
         ca: process.env.CA
          },
    insecureAuth: true,
    connectionLimit: 10
})

pool.getConnection((err) => {
    if (err) console.log('Kết nối đến database thất bại: ', err)
    console.log('Kết nối đến database thành công')
})

export default pool