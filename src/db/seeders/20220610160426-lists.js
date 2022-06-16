'use strict';

function randomName() {
  let num = Math.floor((Math.random() * (3 - 1 + 1)) + 1);
  if(num == 1){
    return 'horrorMovies'
  } else if (num == 2){
    return 'favouriteMovies'
  } else {
    return 'moviesToBeHappy'
  }
}

module.exports = {
  async up (queryInterface, Sequelize) {
    let lists = []
    for (var i = 0; i < 100; i++){
      lists.push({
        name: randomName(),
        createdAt: new Date,
        updatedAt: new Date,
      })
    }
    await queryInterface.bulkInsert('lists', lists, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('lists', null, {});
  }
};
