import { DataTypes } from "sequelize"
import sequelize from "../config/sequelize.js"
import User from "./user.model.js";
import Product from "./product.model.js";

const Cart = sequelize.define('carts', {
    cartID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: false
});

// Cart.belongsTo(User, {
//     foreignKey: {
//       name: 'userID',
//       allowNull: false, // Nếu không muốn bài viết không có người dùng
//     },
//     onDelete: 'CASCADE',
//   });

//   Cart.belongsTo(Product, {
//     foreignKey: {
//       name: 'productID',
//       allowNull: false, // Nếu không muốn bài viết không có người dùng
//     },
//     onDelete: 'CASCADE',
//   });


export default Cart