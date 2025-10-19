const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

// FIX: put get-all-books before :id
router.post('/add-book', bookController.addBook);
router.get('/get-all-books', bookController.getAllBooks);

router.get('/get-book/:id', bookController.getBookById);
router.put('/update-book/:id', bookController.updateBook);
router.delete('/delete-book/:id', bookController.deleteBook);


module.exports = router;