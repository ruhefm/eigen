/* eslint-disable linebreak-style */
/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
// routes/borrow.js
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

module.exports = (Member, Book) => {
  /**
 * @swagger
 * /api/borrow:
 *   post:
 *     summary: Borrow a book
 *     description: Borrow a book from the library
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberId:
 *                 type: integer
 *                 description: The ID of the member
 *               bookId:
 *                 type: integer
 *                 description: The ID of the book
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 *       400:
 *         description: Bad request
 *       403:
 *         description: Member is penalized
 *       404:
 *         description: Member or book not found
 *       500:
 *         description: Internal server error
 */
  router.post('/', async (req, res) => {
    const {memberId, bookId} = req.body;

    try {
      const member = await Member.findByPk(memberId);
      if (!member) {
        return res.status(404).send('Member tidak ditemukan');
      }

      if (member.isPenalized) {
        return res.status(403).send('Member dalam hukuman');
      }

      const borrowedBooks = await Book.findAll({where: {memberId: memberId, isBorrowed: true}});
      if (borrowedBooks.length >= 2) {
        const extractBorrowedBooks = borrowedBooks.map((book) => book.title).join('\n');
        return res.status(400).send(`Member ${member.name} sudah meminjam 2 buku: \n${extractBorrowedBooks}`);
      }

      const book = await Book.findByPk(bookId);
      if (!book) {
        return res.status(404).send('Buku tidak ditemukan');
      }

      if (book.isBorrowed) {
        return res.status(400).send('Buku sudah dipinjam');
      }

      await book.update({isBorrowed: true, borrowDate: new Date()});
      await member.addBook(book);

      res.status(200).send(`Buku "${book.title}" dipinjam oleh: ${member.name}`);
    } catch (error) {
      console.error('Error borrowing book:', error);
      res.status(500).send(`Internal server error`);
    }
  });

  return router;
};
