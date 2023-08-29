const Event = require('../models/Event');

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
