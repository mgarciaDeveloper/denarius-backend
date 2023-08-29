const Book = require('../models/Book');

exports.createBook = async (req, res) => {
    const book = new Book(req.body);
    await book.save();
    res.json(book);
};

exports.getAllBooks = async (req, res) => {
    const books = await Book.find();
    res.json(books);
};

exports.getBookById = async (req, res) => {
    const book = await Book.findById(req.params.id)
    res.json(book);
};
exports.updateBook = async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(book);
};
