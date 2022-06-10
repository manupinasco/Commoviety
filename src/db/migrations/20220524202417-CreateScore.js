'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('scores', { 
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      value: {
        type: Sequelize.DataTypes.FLOAT,
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

  async down (queryInterface, Sequelize) {
   
     await queryInterface.dropTable('scores');
     
  }
};