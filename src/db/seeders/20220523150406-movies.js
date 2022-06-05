'use strict';
const {randMovie, randPhrase} = require('@ngneat/falso')
function randomPlatform() {
  let num = Math.floor((Math.random() * (3 - 1 + 1)) + 1);
  if(num == 1){
    return 'netflix'
  } else if (num == 2){
    return 'amazon'
  } else {
    return 'HBO'
  }
}

module.exports = {
  async up (queryInterface, Sequelize) {
    let movies = []
    for (var i = 0; i < 100; i++){
      movies.push({
        name: randMovie(),
        description: randPhrase(),
        platform: randomPlatform(),
        createdAt: new Date,
        updatedAt: new Date,
      })
    }
    await queryInterface.bulkInsert('movies', movies, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('movies', null, {});
  }
};
