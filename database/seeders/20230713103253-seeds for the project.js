'use strict';

const { Admin, Counter, User } = require('../models'); // Adjust the path to your model files

module.exports = {
  async up(queryInterface, Sequelize) {
    // Seed data for Admin
    await Admin.bulkCreate([
      { name: 'Admin 1', email: 'admin1@example.com', password: 'password1' },
      { name: 'Admin 2', email: 'admin2@example.com', password: 'password2' },
      // Add more admin seed data as needed
    ]);

    // Seed data for Counter
    await Counter.bulkCreate([
      {
        name: 'Counter 1',
        address: 'Address 1',
        type: 'Type 1',
        description: 'Description 1',
        helpDeskNo: 'Help Desk No 1',
        openingTime: new Date(),
        closingTime: new Date(),
        startBreakTime: new Date(),
        endBreakTime: new Date(),
        approxTimeInHours: 2,
        approxTimeInMinutes: 30,
        currentTokenNo: 0,
        adminId: 1, // ID of the associated admin
      },
      {
        name: 'Counter 2',
        address: 'Address 2',
        type: 'Type 2',
        description: 'Description 2',
        helpDeskNo: 'Help Desk No 2',
        openingTime: new Date(),
        closingTime: new Date(),
        startBreakTime: new Date(),
        endBreakTime: new Date(),
        approxTimeInHours: 3,
        approxTimeInMinutes: 15,
        currentTokenNo: 0,
        adminId: 2, // ID of the associated admin
      },
      // Add more counter seed data as needed
    ]);

    // Seed data for User
    await User.bulkCreate([
      { counterId: 1, attended: false, email: 'user1@example.com', ip: 'IP 1', tokenNo: 1 },
      { counterId: 1, attended: true, email: 'user2@example.com', ip: 'IP 2', tokenNo: 2 },
      { counterId: 2, attended: false, email: 'user3@example.com', ip: 'IP 3', tokenNo: 1 },
      // Add more user seed data as needed
    ]);

    // Returning a Promise to ensure the migration is completed
    return Promise.resolve();
  },

  async down(queryInterface, Sequelize) {
    // Delete all records from the tables in reverse order
    await User.destroy({ where: {} });
    await Counter.destroy({ where: {} });
    await Admin.destroy({ where: {} });

    // Returning a Promise to ensure the migration is completed
    return Promise.resolve();
  },
};

