'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, {foreignKey: 'userID', as: 'user'})
      Cart.belongsTo(models.Product, {foreignKey: 'productID', as: 'product'})
    }
  }
  Cart.init({
    cartID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productID: DataTypes.INTEGER,
    userID: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Cart',
    tableName: 'carts'
  });
  return Cart;
};