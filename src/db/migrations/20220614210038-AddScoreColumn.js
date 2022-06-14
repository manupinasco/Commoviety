'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn('movies', 'score', { 
       type: Sequelize.DataTypes.INTEGER
      });
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.removeColumn('score');
     
  }
};
