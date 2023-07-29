'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('Users', 'deleted', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull:false
    })
  },

  async down (queryInterface, Sequelize) {
   queryInterface.removeColumn('Users', 'deleted');
  }
};
