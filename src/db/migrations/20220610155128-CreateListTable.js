'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('lists', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      name: {

        type : Sequelize.DataTypes.STRING(60),

        allowNull: false
      },

      UserId: {
        type: Sequelize.DataTypes.INTEGER
      },


      createdAt: {
        type: Sequelize.DataTypes.DATE,

        defaultValue: Sequelize.DataTypes.NOW

      },

      updatedAt: {

        type: Sequelize.DataTypes.DATE,

        defaultValue: Sequelize.DataTypes.NOW
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('lists');
  }
};
