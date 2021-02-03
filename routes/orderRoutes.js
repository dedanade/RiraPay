const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.route('/:id').get(orderController.getOrder);
router.route('/').get(orderController.getAllOrders);

router.route('/').post(orderController.createOrder);

module.exports = router;
