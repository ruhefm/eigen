/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
/* eslint-disable new-cap */


const express = require('express');

module.exports = (Member, Book) => {
  const router = express.Router();


  /**
 * @swagger
 * /api/add/book:
 *   get:
 *     summary: Retrieve a list of all books
 *     description: Untuk cek semua buku
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   code:
 *                     type: string
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 *                   stock:
 *                     type: integer
 *                   isBorrowed:
 *                     type: boolean
 *                   borrowDate:
 *                     type: string
 *                     format: date-time
 *                   memberId:
 *                     type: integer
 *       500:
 *         description: An error occurred while fetching books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
  router.get('/book', (req, res) => {
    Book.findAll()
        .then((books) => {
          console.log('All books:', JSON.stringify(books, null, 2));
          res.status(200).json(books);
        })
        .catch((error) => {
          console.error('Error fetching books:', error);
          res.status(500).json({error: 'An error occurred while fetching books'});
        });
  });


  /**
 * @swagger
 * /api/add/book:
 *   post:
 *     summary: Create a new book
 *     description: Untuk menambah buku baru/
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: The code of the book
 *               title:
 *                 type: string
 *                 description: The title of the book
 *               author:
 *                 type: string
 *                 description: The author of the book
 *               stock:
 *                 type: integer
 *                 description: The stock of the book
 *     responses:
 *       201:
 *         description: Book created successfully
 *       500:
 *         description: An error occurred while creating the book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
  router.post('/book', async (req, res) => {
    try {
      const {code, title, author, stock} = req.body;
      const book = await Book.create({code, title, author, stock});
      console.log('Book created:', book.toJSON());
      res.status(201).json(book);
    } catch (error) {
      console.error('Error creating book:', error);
      res.status(500).json({error: 'An error occurred while creating the book.'});
    }
  });

  /**
 * @swagger
 * /api/add/member:
 *   get:
 *     summary: Retrieve a list of all members
 *     description: Untuk cek semua member.
 *     responses:
 *       '200':
 *         description: A list of members
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
 *                   name:
 *                     type: string
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     example: johndoe@example.com
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2023-01-01T00:00:00.000Z
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2023-01-02T00:00:00.000Z
 *       '500':
 *         description: An error occurred while fetching members
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while fetching members
 */
  router.get('/member', (req, res) => {
    Member.findAll()
        .then((members) => {
          console.log('All members:', JSON.stringify(members, null, 2));
          res.status(200).json(members);
        })
        .catch((error) => {
          console.error('Error fetching members:', error);
          res.status(500).json({error: 'An error occurred while fetching members'});
        });
  });

  /**
 * @swagger
 * /api/add/member:
 *   post:
 *     summary: Create a new member
 *     description: Untuk menambah member baru.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: 'M001'
 *               name:
 *                 type: string
 *                 example: John Doe
 *     responses:
 *       '201':
 *         description: The newly created member
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 code:
 *                   type: string
 *                   example: 'M001'
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2023-01-01T00:00:00.000Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2023-01-01T00:00:00.000Z
 *       '500':
 *         description: An error occurred while creating the member
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while creating the member.
 */
  router.post('/member', async (req, res) => {
    try {
      const {code, name} = req.body;
      const member = await Member.create({code, name});
      console.log('Member created:', member.toJSON());
      res.status(201).json(member);
    } catch (error) {
      console.error('Error creating member:', error);
      res.status(500).json({error: 'An error occurred while creating the member.'});
    }
  });

  return router;
};
