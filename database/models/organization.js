'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      organization.hasMany(models.User, {
        foreignKey:'orgId',
        as: 'users'
      });
    }
  }
  organization.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull:false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    helpDeskNo: {
      type: DataTypes.STRING,
      allowNull: false
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
      allowNull:false
    },
    closingTime: {
      type: DataTypes.DATE,
      allowNull:false
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
    password:{
      type: DataTypes.STRING,
      allowNull: false
    },
    currentTokenNo:{
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'organization',
  });
  return organization;
};