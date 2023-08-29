// routes/event.js

const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Sale = require('../models/Sale');

// Obter todas as vendas associadas a um evento
router.get('/:eventId/sales', async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);
        if (!event) {
            return res.status(404).json({ message: 'Evento não encontrado' });
        }
        const sales = await Sale.find({ eventId: event._id });
        res.json(sales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Criar uma nova venda associada a um evento
router.post('/:eventId/sales', async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);
        if (!event) {
            return res.status(404).json({ message: 'Evento não encontrado' });
        }
        const saleData = {
            eventId: event._id,
            amount: req.body.amount,
            description: req.body.description,
        };
        const newSale = new Sale(saleData);
        const savedSale = await newSale.save();
        res.status(201).json(savedSale);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
