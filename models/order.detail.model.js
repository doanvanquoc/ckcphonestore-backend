import { DataTypes } from "sequelize"
import sequelize from "../config/sequelize.js"
import Product from "./product.model.js";

const OrderDetail = sequelize.define('orderdatails', {
    orderDetailID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
}, {
    timestamps: false
});

// OrderDetail.belongsTo(Order, {
//     foreignKey: 'orderID',
//     onDelete: 'CASCADE',
//   });

//   OrderDetail.belongsTo(Product, {
//     foreignKey: 'productID',
//     onDelete: 'CASCADE',
//   });


export default OrderDetail