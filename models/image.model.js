import { DataTypes } from "sequelize"
import sequelize from "../config/sequelize.js"
import Product from "./product.model.js";

const Image = sequelize.define('images', {
    imageID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    image_path: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false
});

// Image.belongsTo(Product, {
//     foreignKey: 'productID',
//     onDelete: 'CASCADE',
//   });


export default Image