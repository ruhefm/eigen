/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */

const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  class Book extends Model {}
  Book.init({
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    isBorrowed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    borrowDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    memberId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'members',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Book',
    tableName: 'books',
  });

  return Book;
};
