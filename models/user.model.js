import { DataTypes } from "sequelize"
import sequelize from "../config/sequelize.js"
import Address from "./address.model.js";
import Review from "./review.model.js";

const User = sequelize.define('users', {
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

User.hasMany(Address, {
    foreignKey: 'userID',
    onDelete: 'CASCADE',
  });

  User.hasMany(Review, {
    foreignKey: 'userID',
    onDelete: 'CASCADE',
  });

export default User