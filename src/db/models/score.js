'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Score extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Score.belongsTo(models.Movie)
    }
  }
  Score.init({
    value: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Score',
    tableName: 'scores'
  });
  return Score;
};