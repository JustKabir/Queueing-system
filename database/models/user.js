'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.belongsTo(models.Counter, {
        foreignKey: 'counterId',
        as: 'counter'
      });
    }
  }
  User.init({
    counterId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attended: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tokenNo: {
      type: DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};