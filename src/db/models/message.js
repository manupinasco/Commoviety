'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Message.belongsTo(models.User)
      Message.belongsTo(models.Forum)
    }
  }
  Message.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    text: {
      type : DataTypes.STRING(200),
      allowNull: false
    },

    reports: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },

    userId: {
      type: DataTypes.INTEGER,
    },

    forumId: {
      type: DataTypes.INTEGER,
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },

    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};