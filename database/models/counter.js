'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Counter extends Model {
    
    static associate(models) {
      Counter.belongsTo(models.Admin,{
        foreignKey: 'adminId',
        as:'counters'
      })
      Counter.hasMany(models.User, {
        foreignKey:'counterId',
        as: 'users'
      });
    }
  }
  Counter.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull:true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    helpDeskNo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gpsLocation: {
      type: DataTypes.STRING,
      allowNull:true
    },
    radius: {
      type: DataTypes.STRING,
      allowNull:true
    },
    openingTime: {
      type: DataTypes.DATE,
      allowNull:true
    },
    closingTime: {
      type: DataTypes.DATE,
      allowNull:true
    },
    startBreakTime: {
      type: DataTypes.DATE,
      allowNull:true
    },
    endBreakTime: {
      type: DataTypes.DATE,
      allowNull:true
    },
    image: {
      type: DataTypes.STRING,
      allowNull:true
    },
    approxTimeInHours: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    approxTimeInMinutes:{
      type:DataTypes.INTEGER
    },
    currentTokenNo:{
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue: 0
    },
    adminId:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    url:{
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Counter',
  });
  return Counter;
};