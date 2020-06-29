const express = require('express');
const viewController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const authBusinessController = require('../controllers/authBusinessController');

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

router.get('/buy/:slug/:productId/:businessUserId', viewController.buyProduct);
router.get(
  '/createorder/:productId/:businessUserId/:cartId',
  viewController.createOrder
);
router.get('/orderInfo/:orderId', viewController.myorderinfo);
router.get('/success/:orderId', viewController.getsuccesspage);

// Business Routes

router.get('/business', viewController.busHomepage);

router.get('/buslogin', viewController.busLogin);

router.get('/bussignup', viewController.busSignup);

router.get(
  '/createproduct',
  authBusinessController.protectBusiness,
  viewController.createProduct
);

router.get(
  '/busdashboard',
  authBusinessController.protectBusiness,
  viewController.getBusDashboard
);
router.get(
  '/allproducts',
  authBusinessController.protectBusiness,
  viewController.allProducts
);
router.get(
  '/myorders',
  authBusinessController.protectBusiness,
  viewController.allBusOrders
);

router.get(
  '/myorder/:productId/:orderId/:cartId',
  authBusinessController.protectBusiness,
  viewController.getMyorder
);

router.get(
  '/myproduct/:slug/:productId/:businessUserId',
  authBusinessController.protectBusiness,
  viewController.getMyProduct
);

module.exports = router;
