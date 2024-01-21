'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.belongsTo(models.User, {foreignKey: 'userID'})
    }
  }
  Address.init({
    addressID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    address: DataTypes.STRING,
    mame: DataTypes.STRING,
    userID: DataTypes.INTEGER,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Address',
    tableName: 'addresses'
  });
  return Address;
};