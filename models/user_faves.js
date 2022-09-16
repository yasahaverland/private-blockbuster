'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_faves extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_faves.init({
    userId: DataTypes.INTEGER,
    faveId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_faves',
  });
  return user_faves;
};