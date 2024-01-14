'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.hasMany(models.OrderDetail, {foreignKey: 'orderID'})
    }
  }
  Order.init({
    orderID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    total_price: DataTypes.DOUBLE,
    order_date: DataTypes.DATE,
    userID: DataTypes.INTEGER
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Order',
    tableName: 'orders'
  });
  return Order;
};