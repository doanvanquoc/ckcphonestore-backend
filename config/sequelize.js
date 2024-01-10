import Sequelize from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
        port: process.env.DB_PORT,
        ssl: {
            ca: process.env.CA
        }
    }
})

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Kết nối đến database thành công')
    }
    catch (err) {
        console.log('Kết nối đến database thất bại: ', err)
    }
}

export default sequelize