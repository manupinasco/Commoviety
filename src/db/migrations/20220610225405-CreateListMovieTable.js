'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('listmovies', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      listId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false

      },

      movieId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false

      },


      createdAt: {
        type: Sequelize.DataTypes.DATE,

        defaultValue: Sequelize.DataTypes.NOW

      },

      updatedAt: {

        type: Sequelize.DataTypes.DATE,

        defaultValue: Sequelize.DataTypes.NOW
      }


    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('listMovies');
  }
};