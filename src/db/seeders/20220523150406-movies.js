'use strict';
const {randMovie, randPhrase, rand} = require('@ngneat/falso')

module.exports = {
  async up (queryInterface, Sequelize) {
    let movies = []
    for (var i = 0; i < 100; i++){
      movies.push({
        name: randMovie(),
        description: randPhrase(),
        platform: rand(['netflix', 'amazon', 'HBO']),
        createdAt: new Date,
        updatedAt: new Date,
        score: randNumber({ min: 0, max: 10 }),
        quantScores: randNumber({ precision: 1 })
      })
    }
    await queryInterface.bulkInsert('movies', movies, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('movies', null, {});
  }
};
