'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('organizations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type:Sequelize.STRING,
        allowNull:false
      },
      description: {
        type:Sequelize.STRING,
        allowNull: true
      },
      helpDeskNo: {
        type:Sequelize.STRING,
        allowNull: false
      },
      gpsLocation: {
        type:Sequelize.STRING,
        allowNull:true
      },
      radius: {
        type:Sequelize.STRING,
        allowNull:true
      },
      openingTime: {
        type:Sequelize.DATE,
        allowNull:false
      },
      closingTime: {
        type:Sequelize.DATE,
        allowNull:false
      },
      startBreakTime: {
        type:Sequelize.DATE,
        allowNull:true
      },
      endBreakTime: {
        type:Sequelize.DATE,
        allowNull:true
      },
      image: {
        type:Sequelize.STRING,
        allowNull:true
      },
      approxTime: {
        type:Sequelize.DATE,
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
    await queryInterface.dropTable('organizations');
  }
};