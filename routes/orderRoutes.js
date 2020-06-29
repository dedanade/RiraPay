const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.route('/').get(orderController.getAllOrders);
router.route('/deliver/:OrderId').get(orderController.updateDelivery);

router
  .route('/:id')
  .get(orderController.getOrder)
  .post(orderController.createOrder);

router.route('/ship').patch(orderController.updateShiping);

router.route('/:OrderId').patch(orderController.updateOrder);

module.exports = router;
