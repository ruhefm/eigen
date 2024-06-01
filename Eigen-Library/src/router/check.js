/* eslint-disable linebreak-style */
/* eslint-disable max-len */
// routes/check.js
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
// const sequelize = require('../server');

module.exports = (Member, Book) => {
  /**
 * @swagger
 * /api/check/books:
 *   get:
 *     summary: Retrieve a list of available books
 *     description: Ambil semua data buku yang belum dipinjam.
 *     responses:
 *       '200':
 *         description: A list of available books or a message indicating no available books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: Introduction to Programming
 *                   author:
 *                     type: string
 *                     example: John Doe
 *                   isBorrowed:
 *                     type: boolean
 *                     example: false
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2023-01-01T00:00:00.000Z
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2023-01-01T00:00:00.000Z
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Stok buku habis terpinjam
 *       '500':
 *         description: An error occurred while fetching books
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Internal Server Error
 */
  router.get('/books', async (req, res) => {
    try {
      const books = await Book.findAll({
        where: {
          isBorrowed: false,
        },
      });

      if (books.length === 0) {
        res.status(200).send('Stok buku habis terpinjam');
      } else {
        res.status(200).json(books);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  router.get('/books', async (req, res) => {
    try {
      const books = await Book.findAll({
        where: {
          isBorrowed: false,
        },
      });

      if (books==0) {
        res.status(200).send('Stok buku habis terpinjam');
      } else {
        res.status(200).json(books);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).send('Internal Server Error');
    }
  });


  /**
 * @swagger
 * /api/check/members:
 *   get:
 *     summary: Retrieve a list of members with the count of borrowed books
 *     description: Ambil semua data member yang meminjam buku dengan jumlah nya.
 *     responses:
 *       '200':
 *         description: A list of members with borrowed books count
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: string
 *                     example: 'M001'
 *                   name:
 *                     type: string
 *                     example: John Doe
 *                   borrowedBooksCount:
 *                     type: integer
 *                     example: 3
 *       '500':
 *         description: An error occurred while fetching members
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Internal Server Error
 */
  router.get('/members', async (req, res) => {
    try {
      const members = await Member.findAll();

      // eslint-disable-next-line max-len
      const membersWithBorrowedBooksCount = await Promise.all(members.map(async (member) => {
        const borrowedBooksCount = await Book.count({
          where: {
            memberId: member.id,
            isBorrowed: true,
          },
        });
        return {
          code: member.code,
          name: member.name,
          borrowedBooksCount: borrowedBooksCount,
        };
      }));

      res.status(200).json(membersWithBorrowedBooksCount);
    } catch (error) {
      console.error('Error fetching members:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  return router;
};

