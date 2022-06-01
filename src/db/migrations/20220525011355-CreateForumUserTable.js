'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('forumusers', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      forumId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false

      },

      userId: {
        type: Sequelize.DataTypes.INTEGER,
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ForumUser');
  }
};