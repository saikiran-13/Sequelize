'use strict';
const { Model, sequelize, DataTypes } = require('sequelize');
const { Studentinfo } = require('./studentinfo');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Studentinfo);
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: true,
      paranoid: true,
      deletedAt: 'DeleteTimestamp',
    },
  );

  return User;
};
