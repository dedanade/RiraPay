const express = require('express');
const viewController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', viewController.homepage);

router.get('/login', viewController.login);

router.get('/signup', viewController.signup);

router.get('/dashboard', authController.protect, viewController.getDashboard);

router.get(
  '/order/:slug/:productId/:orderId',
  authController.protect,
  viewController.getorder
);

router.get(
  '/product/:slug/:productId/:businessUserId',
  viewController.getProduct
);
router.get(
  '/createorder/:productId/:businessUserId/:cartId',
  viewController.createOrder
);
router.get('/orderInfo/:orderId', viewController.myorderinfo);
router.get('/success/:orderId', viewController.getsuccesspage);

module.exports = router;
