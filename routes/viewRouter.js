const express = require('express');
const viewController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const authBusinessController = require('../controllers/authBusinessController');

const router = express.Router();

router.get('/', viewController.homepage);

router.get('/login', viewController.login);

router.get('/password', viewController.forgotPass);
router.get('/resetPassword/:token', viewController.resetPassword);

router.get('/signup', viewController.signup);

router.get('/dashboard', authController.protect, viewController.getDashboard);

router.get(
  '/order/:slug/:productId/:orderId',
  authController.protect,
  viewController.getorder
);

router.get('/buy/:businessUserId/:productId/', viewController.buyProduct);
router.get('/buy/:slug/:productId/:businessUserId', viewController.createOrder);
router.get('/orderInfo/:orderId', viewController.myorderinfo);
router.get('/success/:orderId', viewController.getsuccesspage);

// Business Routes

router.get('/business', viewController.busHomepage);

router.get('/buslogin', viewController.busLogin);

router.get('/buspassword', viewController.busForgotPass);

router.get('/busresetpassword/:token', viewController.busResetPassword);

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
  '/allbusorders',
  authBusinessController.protectBusiness,
  viewController.allBusOrders
);

router.get(
  '/myorder/:productId/:orderId',
  authBusinessController.protectBusiness,
  viewController.getMyorder
);

router.get(
  '/myproduct/:slug/:productId',
  authBusinessController.protectBusiness,
  viewController.getMyProduct
);

router.get(
  '/edit/:slug/:productId',
  authBusinessController.protectBusiness,
  viewController.editProduct
);

router.get('/purchasepixel/:businessUserId', viewController.purchasePixel);

module.exports = router;
