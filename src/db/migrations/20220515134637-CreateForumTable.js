'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('forum', {
      id: {
        type: Sequelize.Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Person');
  }
};