import { DataTypes } from "sequelize"
import sequelize from "../config/sequelize.js"
import Product from "./product.model.js";

const Company = sequelize.define('companies', {
    companyID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    company_name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false
});

// Company.hasMany(Product, {
//     foreignKey: 'productID',
//     onDelete: 'CASCADE',
//   });


export default Company