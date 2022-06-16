'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      nickname: {

        type : Sequelize.DataTypes.STRING(60),

        allowNull: false
      },


      firstName: {

        type : Sequelize.DataTypes.STRING(60),

        allowNull: true
      },

      lastName: {

        type : Sequelize.DataTypes.STRING(60),

        allowNull: true
      },

      mail: {
        type : Sequelize.DataTypes.STRING(60),

        allowNull: false

      },

      age: {

        type : Sequelize.DataTypes.INTEGER,

        allowNull: true
      },

      password: {

        type : Sequelize.DataTypes.STRING(60),

        allowNull: false
      },


      createdAt: {
        type: Sequelize.DataTypes.DATE,

        defaultValue: Sequelize.DataTypes.NOW

      },

      updatedAt: {

        type: Sequelize.DataTypes.DATE,

        defaultValue: Sequelize.DataTypes.NOW
      },


    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};