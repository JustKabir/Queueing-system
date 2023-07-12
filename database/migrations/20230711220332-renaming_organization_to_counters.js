'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.renameTable('organizations','Counters')
  },

  async down (queryInterface, Sequelize) {
    queryInterface.renameTable('Counters','organizations')
    
  }
};
