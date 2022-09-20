'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  profile.init({
    userId: DataTypes.INTEGER,
    img_icon: DataTypes.TEXT,
    fove_movie_kid: DataTypes.STRING,
    fave_movie_alltimes: DataTypes.STRING,
    fave_quote: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'profile',
  });
  return profile;
};