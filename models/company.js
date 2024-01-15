'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Company.hasMany(models.Product, {foreignKey: 'companyID', as: 'company'})
    }
  }
  Company.init({
    companyID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    company_name: DataTypes.STRING,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Company',
    tableName: 'companies'
  });
  return Company;
};