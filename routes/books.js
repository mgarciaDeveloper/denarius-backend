
const express = require('express');
const bookController = require('../controllers/bookController');
const router = express.Router();

router.post('/', bookController.createBook);
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById); // Add route to get a single book
router.put('/:id', bookController.updateBook);
//router.put('/:id/update-stock', bookController.updateStock); // Add route to update stock

module.exports = router;