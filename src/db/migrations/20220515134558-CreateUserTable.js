'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: {
        type: Sequelize.Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      nickname: {

        type : Sequelize.Datatypes.STRING(20),

        allowNull: false
      },


      firstName: {

        type : Sequelize.Datatypes.STRING(50),

        allowNull: true
      },

      lastName: {

        type : Sequelize.Datatypes.STRING(50),

        allowNull: true
      },

      mail: {
        type : Sequelize.Datatypes.STRING(20),

        allowNull: false

      },

      age: {

        type : Sequelize.Datatypes.INTEGER,

        allowNull: true
      },

      password: {

        type : Sequelize.Datatypes.STRING(20),

        allowNull: false
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