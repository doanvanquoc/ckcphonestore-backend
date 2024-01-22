'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Notification.belongsTo(models.User, {foreignKey: 'userID'})
      // define association here
    }
  }
  Notification.init({
    notificationID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    notification_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    userID: DataTypes.INTEGER
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Notification',
    tableName: 'notifications'
  });
  return Notification;
};