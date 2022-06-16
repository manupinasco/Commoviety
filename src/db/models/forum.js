'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Forum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Forum.belongsToMany(models.User, {through: 'forumusers'})
      Forum.hasMany(models.Message)
    }
  }
  Forum.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
    modelName: 'Forum',
  });
  return Forum;
};