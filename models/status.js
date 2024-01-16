'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Status.hasMany(models.Order, {foreignKey: 'statusID'})
    }
  }
  Status.init({
    statusID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Status',
    tableName: 'status'
  });
  return Status;
};