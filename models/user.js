'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Address, { foreignKey: 'userID', as: 'addresses' })
      User.hasMany(models.Notification, { foreignKey: 'userID', as: 'notifications' })
      User.hasMany(models.Order, { foreignKey: 'userID' })
      User.hasOne(models.Cart, { foreignKey: 'userID' })
    }
  }
  User.init({
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    fullname: DataTypes.STRING,
    birthday: DataTypes.DATE,
    phone_number: DataTypes.STRING,
    avatar: DataTypes.STRING,
    sex: DataTypes.STRING,
    // role: {
    //   type: DataTypes.INTEGER,
    //   defaultValue: 2
    // }
  }, {
    timestamps: false,
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });
  return User;
};