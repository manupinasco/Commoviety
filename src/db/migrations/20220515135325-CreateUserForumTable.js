'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('passenger', {
      id: {
        type: Sequelize.Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      userId: {

        type : Sequelize.Datatypes.INTEGER,

        foreignKey: true
      },

      forumId: {

        type : Sequelize.Datatypes.INTEGER,

        foreignKey: true
      },

      createdAt: {
        type: Sequelize.Datatypes.DATE,

        defaultValue: Sequelize.Datatypes.NOW

      },

      updatedAt: {

        type: Sequelize.Datatypes.DATE,

        defaultValue: Sequelize.Datatypes.NOW
      },


    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Person');
  }
};