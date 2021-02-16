const express = require('express');
const cors = require('cors');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

const app = express();
const router = express.Router();

router.route('/:id').get(orderController.getOrder);
router
  .route('/:orderId')
  .patch(
    authController.protect,
    orderController.uploadRefundMedia,
    orderController.editOrderRefundMedia,
    orderController.orderReturnRequest
  );

router.route('/').get(orderController.getAllOrders);

router.route('/').post(app.use(cors()), orderController.createOrder);

module.exports = router;
