const Sale = require('../models/Sale');
const Book = require('../models/Book');

exports.addSale = async (req, res) => {
    if (req.body.type === 'book') {
        const book = await Book.findById(req.body.product);
        if (book.stock < 1) {
            return res.status(400).send("Not enough stock");
        }
        book.stock--;
        await book.save();
    }

    const sale = new Sale(req.body);
    await sale.save();
    res.json(sale);
};
