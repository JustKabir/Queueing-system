'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users','orgId');
    await queryInterface.addColumn('Users', 'orgId',{
      type:Sequelize.INTEGER,
      allowNull:false
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users','orgId');
    await queryInterface.addColumn('Users', 'orgId',{
      type:Sequelize.STRING,
      allowNull:false
    })
  }
};
