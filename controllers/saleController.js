const Sale = require('../models/Sale');
const Book = require('../models/Book');

exports.createSale = async (req, res) => {
    const { type, paymentMethod, customerName, saleTime, description, amount, productId, eventId } = req.body;

    try {
        // Find the product by its ID
        const product = await Book.findById(productId);
        console.log(productId)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Create a new sale with the product reference
        const sale = new Sale({
            type,
            paymentMethod,
            customerName,
            saleTime,
            description,
            amount,
            productId: productId, // Assign the product ID
            eventId,
        });

        await sale.save();

        // Update the stock of the product if it's a book
        if (type === 'book') {
            product.stock -= 1;
            await product.save();
        }

        res.status(201).json(sale);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error creating sale', error });
    }
};
