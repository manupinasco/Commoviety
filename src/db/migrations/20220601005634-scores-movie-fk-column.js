'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn('scores', 'MovieId', { 
       type: Sequelize.DataTypes.INTEGER
      });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('scores', 'MovieId');
  }
};
