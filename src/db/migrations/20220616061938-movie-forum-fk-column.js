'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn('forums', 'movieId', { 
       type: Sequelize.DataTypes.INTEGER
      });
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.removeColumn('forums', 'movieId'); 
  }
};

