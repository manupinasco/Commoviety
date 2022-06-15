'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn('scores', 'UserId', { 
       type: Sequelize.DataTypes.INTEGER
      });
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.removeColumn('UserId');
     
  }
};

