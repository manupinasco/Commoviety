'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn('users', 'reports', { 
       type: Sequelize.DataTypes.INTEGER,
       defaultValue: 0
      });
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.removeColumn('users', 'reports');    
  }
};