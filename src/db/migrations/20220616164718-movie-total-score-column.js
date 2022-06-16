'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn('movies', 'totalScore', { 
       type: Sequelize.DataTypes.INTEGER,
       defaultValue: 0
      });
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.removeColumn('movies', 'totalScore'); 
  }
};

