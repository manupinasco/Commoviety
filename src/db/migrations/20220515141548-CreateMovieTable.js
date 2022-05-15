'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('movie', {
      id: {
        type: Sequelize.Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      name: {
        type : Sequelize.Datatypes.STRING(50),

        allowNull: false
      },

      description: {
        type : Sequelize.Datatypes.STRING(300),

        allowNull: false
      },

      platform: {
        
        type: Sequelize.Datatypes.ENUM('netflix','amazon','HBO'),

      },

      forumId: {
        type: Sequelize.Datatypes.INTEGER,
        foreignKey: true
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
    return queryInterface.dropTable('movie');
  }
};