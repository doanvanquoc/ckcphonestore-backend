'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Review, {foreignKey: 'productID'})
      Product.hasMany(models.OrderDetail, {foreignKey: 'productID'})
      Product.hasMany(models.Image, {foreignKey: 'productID', as: 'images'})
      Product.hasMany(models.Cart, {foreignKey: 'productID'})
      Product.belongsTo(models.Company, {foreignKey: 'companyID'})
    }
  }
  Product.init({
    productID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    description: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    screen_size: DataTypes.DOUBLE,
    os: DataTypes.STRING,
    cpu: DataTypes.STRING,
    ram: DataTypes.INTEGER,
    internal_storage: DataTypes.INTEGER,
    main_cam_resolution: DataTypes.INTEGER,
    front_cam_resolution: DataTypes.INTEGER,
    battery: DataTypes.INTEGER,
    weight: DataTypes.DOUBLE,
    post_date: DataTypes.DATE,
    companyID: DataTypes.INTEGER
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Product',
    tableName: 'products'
  });
  return Product;
};