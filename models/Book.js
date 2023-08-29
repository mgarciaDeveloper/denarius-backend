const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    description: {
        type: String,
    },
    cost:Number,
    stock: Number
});

module.exports = mongoose.model('Book', bookSchema);
