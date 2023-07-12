'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.renameColumn('Users', 'orgId', 'counterId');
  },

  async down (queryInterface, Sequelize) {
    queryInterface.renameColumn('Users', 'counterId', 'orgId');

  }
};
