'use strict';
const {randPhrase, randNumber} = require('@ngneat/falso')

module.exports = {
  async up (queryInterface, Sequelize) {
    let messages = []
    for (var i = 0; i < 100; i++){
      messages.push({
        text: randPhrase(),
        userId: randNumber({ min: 10, max: 100}),
        createdAt: new Date,
        updatedAt: new Date,
      })
    }
    await queryInterface.bulkInsert('messages', messages, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('messages', null, {});
  }
};