const express = require('express');
const viewController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', viewController.homepage);

router.get('/login', viewController.login);

router.get('/password', viewController.forgotPass);
router.get('/resetPassword/:token', viewController.resetPassword);

router.get('/signup', viewController.signup);

router.get('/dashboard', authController.protect, viewController.getDashboard);

router.get(
  '/order/:slug/:orderId',
  authController.protect,
  viewController.getorder
);

router.get('/buy/:slug/:productId', viewController.createOrder);
router.get('/orderInfo/:orderId', viewController.myorderinfo);
router.get('/success/:orderId', viewController.getsuccesspage);
router.get('/pod/:orderId', viewController.getPodPage);

// Business Routes

router.get('/business', viewController.busHomepage);

module.exports = router;
