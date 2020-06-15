const express = require('express');
const viewController = require('./../controllers/viewsController');
const authBusinessController = require('./../controllers/authBusinessController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/', viewController.homepage);
router.get('/business', viewController.busHomepage);

router.get('/login', viewController.login);
router.get('/buslogin', viewController.busLogin);

router.get('/signup', viewController.signup);
router.get('/bussignup', viewController.busSignup);

router.get(
  '/createproduct',
  authBusinessController.protectBusiness,
  viewController.createProduct
);

router.get('/dashboard', authController.protect, viewController.getDashboard);
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
  '/allbusorders',
  authBusinessController.protectBusiness,
  viewController.allBusOrders
);

router.get(
  '/myorder/:productId/:orderId/:cartId',
  authBusinessController.protectBusiness,
  viewController.getMyorder
);

router.get(
  '/order/:slug/:productId/:orderId',
  authController.protect,
  viewController.getorder
);

router.get(
  '/myproduct/:slug/:productId/:businessUserId',
  authBusinessController.protectBusiness,
  viewController.getMyProduct
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
