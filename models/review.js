'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, {foreignKey: 'userID', as: 'user'})
      Review.belongsTo(models.Product, {foreignKey: 'productID'})
    }
  }
  Review.init({
    reviewID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: DataTypes.STRING,
    review_date: DataTypes.DATE,
    rating: DataTypes.DOUBLE,
    productID: DataTypes.INTEGER,
    userID: DataTypes.INTEGER,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Review',
    tableName: 'reviews'
  });
  return Review;
};