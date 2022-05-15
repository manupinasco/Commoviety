'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('scores', { 
      id: {
        type: Sequelize.Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: Sequelize.Datatypes.INTEGER,
        allowNull: false
      },
      value: {
        type: Sequelize.Datatypes.FLOAT,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.Datatypes.DATE,
        defaultValue: Sequelize.Datatypes.NOW
      },
      updatedAt: {
        type: Sequelize.Datatypes.DATE,
        defaultValue: Sequelize.Datatypes.NOW
      }

    });
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.dropTable('scores');
     
  }
};
