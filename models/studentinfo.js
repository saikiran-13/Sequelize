'use strict';
const { Model } = require('sequelize');
const { User } = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Studentinfo extends Model {
    static associate(models) {
      // define association here
      Studentinfo.belongsTo(models.User, {
        foreignKey: {
          // allowNull: false,
          defaultValue: 1,
        },
      });
    }
  }
  Studentinfo.init(
    {
      name: {
        type: DataTypes.STRING,
        defaultValue: 'abc',
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      course: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          notEmpty: true,
        },
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          min: 18,
          max: 25,
        },
      },
      feePaid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        validate: {
          notEmpty: true,
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Studentinfo',
      timestamps: false,
    },
  );
  return Studentinfo;
};
