import { DataTypes } from "sequelize"
import sequelize from "../config/sequelize.js"
import Product from "./product.model.js";
import User from "./user.model.js";

const Order = sequelize.define('orders', {
    orderID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    total_price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    order_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    timestamps: false
});

// Order.belongsTo(User, {
//     foreignKey: 'userID',
//     onDelete: 'CASCADE',
//   });

//   Order.belongsToMany(Product, {
//     through: 'OrderDatail',
//     foreignKey: 'orderID'
//   })


export default Order