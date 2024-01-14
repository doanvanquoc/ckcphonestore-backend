'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderDetail.belongsTo(models.Product, {foreignKey: 'productID'})
      OrderDetail.belongsTo(models.Order, {foreignKey: 'orderID'})
    }
  }
  OrderDetail.init({
    orderDetailID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderID: DataTypes.INTEGER,
    productID: DataTypes.INTEGER,
    price: DataTypes.DOUBLE,
    quantity: DataTypes.INTEGER,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'OrderDetail',
    tableName: 'orderDetails'
  });
  return OrderDetail;
};