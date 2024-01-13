import { DataTypes } from "sequelize"
import sequelize from "../config/sequelize.js"
import User from "./user.model.js";
import Product from "./product.model.js";

const Review = sequelize.define('reviews', {
    reviewID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    review_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    avg_rating: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
}, {
    timestamps: false
});

// Review.belongsTo(User, {
//     foreignKey: {
//       name: 'userID',
//       allowNull: false, // Nếu không muốn bài viết không có người dùng
//     },
//     onDelete: 'CASCADE',
//   });

//   Review.belongsTo(Product, {
//     foreignKey: {
//       name: 'productID',
//       allowNull: false, // Nếu không muốn bài viết không có người dùng
//     },
//     onDelete: 'CASCADE',
//   });


export default Review