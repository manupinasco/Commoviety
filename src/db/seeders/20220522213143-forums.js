'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    let forums = []
    for (var i = 0; i < 100; i++) {
      forums.push({

      createdAt: new Date,

      updatedAt: new Date
      })
    }

  await queryInterface.bulkInsert('forums', forums, {})},

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('forums', null, {})
  }
};