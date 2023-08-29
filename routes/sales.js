const express = require('express');
const saleController = require('../controllers/saleController');
const router = express.Router();

router.post('/', saleController.addSale);

module.exports = router;
