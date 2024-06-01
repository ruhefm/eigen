/* eslint-disable linebreak-style */
/* eslint-disable max-len */
require('dotenv').config();


const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
});

sequelize.authenticate()
    .then(() => {
      console.log('Conn Established.');
    })
    .catch((err) => {
      console.error('Error:', err);
    });

const Book = require('./models/book')(sequelize);

const Member = require('./models/member')(sequelize);

sequelize.sync({alter: true})
    .then(async () => {
      console.log('DB & Tables synchronized.');
      Member.hasMany(Book, {foreignKey: 'memberId'});
      Book.belongsTo(Member, {foreignKey: 'memberId'});
      const existingMembersCount = await Member.count();
      if (existingMembersCount === 0) {
        Member.bulkCreate([
          {code: 'M001', name: 'Angga'},
          {code: 'M002', name: 'Ferry'},
          {code: 'M003', name: 'Putri'},
          {code: 'M004', name: 'Heru'},
        ]).then(() => {
          console.log('Members seeded');
        });
      } else {
        console.log('Lewat seed, data sudah ada');
      }

      const existingBooksCount = await Book.count();
      if (existingBooksCount === 0) {
        Book.bulkCreate([
          {code: 'JK-45', title: 'Harry Potter', author: 'J.K Rowling', stock: 1},
          {code: 'SHR-1', title: 'A Study in Scarlet', author: 'Arthur Conan Doyle', stock: 1},
          {code: 'TW-11', title: 'Twilight', author: 'Stephenie Meyer', stock: 1},
          {code: 'HOB-83', title: 'The Hobbit, or There and Back Again', author: 'J.R.R. Tolkien', stock: 1},
          {code: 'NRN-7', title: 'The Lion, the Witch and the Wardrobe', author: 'C.S. Lewis', stock: 1},
        ]).then(() => {
          console.log('Books seeded');
        });
      } else {
        console.log('Lewat seed, data sudah ada');
      }
    })
    .catch((error) => {
      console.error('Error synchronizing database & tables:', error);
    });

module.exports = {sequelize, Book, Member};
