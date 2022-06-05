'use strict';
const { randFloat } =  require ('@ngneat/falso')

module.exports = {
  async up (queryInterface, Sequelize) {
    let scores = []
    for (var i = 0; i < 1000; i++) {
      scores.push({
        value: randFloat({ min: 0, max: 10, fraction: 1 }),
        createdAt: new Date,
        updatedAt: new Date
      })
    }
    
    await queryInterface.bulkInsert('scores', scores, {});
   
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('passengers', null, {});
      
  }
};
