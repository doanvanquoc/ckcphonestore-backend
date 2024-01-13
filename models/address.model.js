import { DataTypes } from "sequelize"
import sequelize from "../config/sequelize.js"
import User from "./user.model.js";

const Address = sequelize.define('addresses', {
    addressID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false
});

// Address.belongsTo(User, {
//     foreignKey: 'userID',
//     onDelete: 'CASCADE',
//   });

export default Address