import { DataTypes } from "sequelize"
import sequelize from "../config/sequelize.js"

const User = sequelize.define('users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false
});

export default User