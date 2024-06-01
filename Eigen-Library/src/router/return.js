/* eslint-disable linebreak-style */
/* eslint-disable max-len */
// routes/return.js
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

module.exports = (Member, Book) => {
  /**
 * @swagger
 * /api/return:
 *   post:
 *     summary: Return a book
 *     description: Mengembalikan buku, jika telat maka penalti
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
 *         description: Book returned successfully
 *       400:
 *         description: Bad request
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
        return res.status(404).send('Member not found');
      }

      const book = await Book.findByPk(bookId);
      if (!book) {
        return res.status(404).send('Book not found');
      }

      const borrowedBook = await member.getBooks({
        where: {
          id: bookId,
          isBorrowed: true,
        },
      });

      if (borrowedBook.length === 0) {
        return res.status(400).send(`Buku ini tidak dipinjam oleh ${member.name}`);
      }

      const borrowDate = borrowedBook[0].borrowDate;
      const returnDate = new Date();
      const diffDays = Math.ceil((returnDate - borrowDate) / (1000 * 60 * 60 * 24));

      if (diffDays > 7) {
        member.isPenalized = true;
        await member.save();
        return res.status(400).send('Member diberikan penalti karena telat');
      }

      await book.update({isBorrowed: false, borrowDate: null});
      await member.removeBook(book);

      res.status(200).send(`Buku: "${book.title}" telah dikembalikan oleh: ${member.name}`);
    } catch (error) {
      console.error('Error returning book:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  return router;
};
