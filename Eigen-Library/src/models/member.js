/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

const {Model, DataTypes} = require('sequelize');
module.exports = (sequelize) => {
  class Member extends Model {
    get countBooks() {
      return this.Books.length;
    }
  }
  Member.init({
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isPenalized: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'Member',
    tableName: 'members',
  });

  return Member;
};
