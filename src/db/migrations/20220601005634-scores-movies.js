'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn('scores', 'movie_id', { 
       type: Sequelize.DataTypes.INTEGER
      });
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.removeColumn('movie_id');
     
  }
};
