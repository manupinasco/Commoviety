'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movie.belongsToMany(models.List, {through: 'listsmovies'})
      Movie.hasMany(models.Score)
    }
  }
  Movie.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    name: {
      type : DataTypes.STRING(50),
      allowNull: false
    },

    description: {
      type : DataTypes.STRING(300),
      allowNull: false
    },

    platform: {
      type: DataTypes.ENUM('netflix','amazon','HBO'),
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
    modelName: 'Movie',
  });
  return Movie;
};