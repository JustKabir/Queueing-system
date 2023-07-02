'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orgId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      attended: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ip: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      tokenNo: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};