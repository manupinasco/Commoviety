'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn('movies', 'averageScore', { 
       type: Sequelize.DataTypes.FLOAT,
       defaultValue: 0
      });
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.removeColumn('movies', 'averageScore'); 
  }
};
