const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventDate: Date,
    eventType: String,
    numberOfPeople: Number,
    location: String,
    sales: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sale' }]
});

module.exports = mongoose.model('Event', eventSchema);
