'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.removeColumn('organizations', 'password');
    queryInterface.removeColumn('organizations','email');
    queryInterface.addColumn('organizations','adminId',{
      type:Sequelize.INTEGER,
      allowNull:false
    });
    queryInterface.addColumn('organizations','url',{
      type:Sequelize.INTEGER,
    });
  },

  async down (queryInterface, Sequelize) {
   queryInterface.addColumn('organizations','password',{
    type:Sequelize.STRING,
    allowNull:false
   })
   queryInterface.addColumn('organizations','email',{
    type:Sequelize.STRING,
    allowNull:false
   })
   queryInterface.removeColumn('organizations', 'adminId');
   queryInterface.removeColumn('organizations', 'url');
  }
};
