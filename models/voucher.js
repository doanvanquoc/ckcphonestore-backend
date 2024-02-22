'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Voucher extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Voucher.belongsTo(models.Product, { foreignKey: 'productID' })
        }
    }
    Voucher.init({
        voucherID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        code: DataTypes.STRING,
        promotion: DataTypes.INTEGER
    }, {
        timestamps: false,
        sequelize,
        modelName: 'Voucher',
        tableName: 'vouchers'
    });
    return Voucher;
};