const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.route('/').get(orderController.getAllOrders);

router
  .route('/:id')
  .get(orderController.getOrder)
  .post(orderController.createOrder);

router.route('/:OrderId').patch(orderController.updateOrder);

router.post('/mywebhook', orderController.paystackwebhook);
module.exports = router;
