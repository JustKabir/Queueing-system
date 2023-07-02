'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users','ip');
    await queryInterface.addColumn('Users', 'ip',{
      type:Sequelize.STRING,
      allowNull:false
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users','ip');
    await queryInterface.addColumn('Users', 'ip',{
      type:Sequelize.INTEGER,
      allowNull:false
    })
  }
};
