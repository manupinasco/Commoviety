'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('movies', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      name: {
        type : Sequelize.DataTypes.STRING(50),

        allowNull: false
      },

      description: {
        type : Sequelize.DataTypes.STRING(300),

        allowNull: false
      },

      platform: {
        
        type: Sequelize.DataTypes.ENUM('netflix','amazon','HBO'),

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
    return queryInterface.dropTable('movies');
  }
};