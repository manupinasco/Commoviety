'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      List.belongsToMany(models.Movie, {through: 'listsmovies'})
      List.belongsTo(models.User)
    }
  }
  List.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    name: {

      type : DataTypes.STRING(60),

      allowNull: false
    },

    idUser: {
      type: DataTypes.INTEGER
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
    modelName: 'List',
  });
  return List;
};