const Event = require('../models/Event');
const Sale = require('../models/Sale');

exports.createEvent = async (req, res) => {
    const event = new Event(req.body);
    await event.save();
    res.json(event);
};

exports.getAllEvents = async (req, res) => {
    const events = await Event.find().populate('sales');
    res.json(events);
};

exports.getEventById = async (req, res) => {
    const event = await Event.findById(req.params.id).populate('sales');
    res.json(event);
};

exports.updateEvent = async (req, res) => {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEvent);
};

exports.getSalesOfEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);
        console.log('---------')
        console.log(req.params.eventId)
        console.log('---------')
        if (!event) {
            return res.status(404).json({ message: 'Evento não encontrado' });
        }
        const sales = await Sale.find({ eventId: event._id });
        res.json(sales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};