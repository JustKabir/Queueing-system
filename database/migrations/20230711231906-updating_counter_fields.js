'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  queryInterface.changeColumn('Counters', 'address',{
    type:Sequelize.STRING,
    allowNull:true
  });
  queryInterface.changeColumn('Counters', 'type',{
    type:Sequelize.STRING,
    allowNull:true
  });

  queryInterface.changeColumn('Counters', 'helpDeskNo',{
    type:Sequelize.STRING,
    allowNull:true
  });

  queryInterface.changeColumn('Counters', 'openingTime',{
    type:Sequelize.DATE,
    allowNull:true
  });

  queryInterface.changeColumn('Counters', 'closingTime',{
    type:Sequelize.DATE,
    allowNull:true
  });
  
  },

  async down (queryInterface, Sequelize) {
    queryInterface.changeColumn('Counters', 'address',{
      type:Sequelize.STRING,
      allowNull:false
    });
    queryInterface.changeColumn('Counters', 'type',{
      type:Sequelize.STRING,
      allowNull:false
    });
  
    queryInterface.changeColumn('Counters', 'helpDeskNo',{
      type:Sequelize.STRING,
      allowNull:false
    });
  
    queryInterface.changeColumn('Counters', 'openingTime',{
      type:Sequelize.DATE,
      allowNull:false
    });
  
    queryInterface.changeColumn('Counters', 'closingTime',{
      type:Sequelize.DATE,
      allowNull:false
    });
  }
};
