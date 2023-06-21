'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('organizations', 'approxTime');
    await queryInterface.addColumn('organizations', 'approxTimeInHours',{
      type:Sequelize.INTEGER,
      allowNull: false
    })
    await queryInterface.addColumn('organizations', 'approxTimeInMinutes',{
      type:Sequelize.INTEGER,
      allowNull: false
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('organizations', 'approxTimeInHours');
    await queryInterface.removeColumn('organizations', 'approxTimeInMinutes');
    await queryInterface.addColumn('organizations', 'approxTime', {
      type:Sequelize.DATE,
      allowNull:false
    });
  }
};
