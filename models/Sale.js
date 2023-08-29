const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    type: String, // 'book' or 'canteen'
    paymentMethod: String,
    customerName: String,
    saleTime: Date,
    description: {
        type: String,
    },
    amount: {
        type: Number,
        required: true,
    },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
});

module.exports = mongoose.model('Sale', saleSchema);
