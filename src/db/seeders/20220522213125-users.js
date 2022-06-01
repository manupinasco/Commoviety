'use strict';
const { randEmail, randPassword, randNumber, randFirstName, randLastName, randUserName } = require('@ngneat/falso');

module.exports = {
  
  async up (queryInterface, Sequelize) {

      let users = []
      for (var i = 0; i < 100; i++) {
        users.push({
          nickname: randUserName(),

        firstName: randFirstName(),

        lastName: randLastName(),

        mail: randEmail({ nameSeparator: '.' }),

        age: randNumber({min: 18, max: 100}),

        password: randPassword(),

        createdAt: new Date,

        updatedAt: new Date
        })
      }

    await queryInterface.bulkInsert('users', users, {})},

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
};
