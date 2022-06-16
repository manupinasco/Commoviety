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
      Movie.belongsToMany(models.List, {through: 'listmovies'})
      Movie.hasMany(models.Score)
      Movie.hasOne(models.Forum)
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
    },

    quantScores: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },

    totalScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },

    averageScore: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};