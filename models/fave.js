'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fave extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.fave.belongsToMany(models.user, { through: "user_faves"} )
      models.fave.hasMany(models.comment)
    }
  }
  fave.init({
    title: DataTypes.STRING,
    imdbid: DataTypes.STRING,
    poster: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'fave',
  });
  return fave;
};