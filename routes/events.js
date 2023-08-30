const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();

router.post('/', eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.get('/:eventId/sales', eventController.getSalesOfEvent);
router.put('/:id', eventController.updateEvent);

module.exports = router;
