'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('forums', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    return queryInterface.dropTable('forums');
  }
};