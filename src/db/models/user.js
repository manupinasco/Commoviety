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
      User.belongsToMany(models.Forum, {through: 'forumusers'})
      User.hasMany(models.Message)
    }
  }
  User.init({

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    nickname: {

      type : DataTypes.STRING(60),

      allowNull: false
    },


    firstName: {

      type : DataTypes.STRING(60),

      allowNull: true
    },

    lastName: {

      type : DataTypes.STRING(60),

      allowNull: true
    },

    mail: {
      type : DataTypes.STRING(60),

      allowNull: false

    },

    age: {

      type : DataTypes.INTEGER,

      allowNull: true
    },

    password: {

      type : DataTypes.STRING(60),

      allowNull: false
    },

    reports: {
      type : DataTypes.INTEGER,

      allowNull: false
    },

    createdAt: {
      type: DataTypes.DATE,

      defaultValue: DataTypes.NOW

    },

    updatedAt: {

      type: DataTypes.DATE,

      defaultValue: DataTypes.NOW
    },


  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};