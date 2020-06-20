const express = require('express');
const viewController = require('../controllers/viewsController');
const authBusinessController = require('../controllers/authBusinessController');

const router = express.Router();

router.get('/', viewController.busHomepage);

router.get('/login', viewController.busLogin);

router.get('/signup', viewController.busSignup);

router.get(
  '/createproduct',
  authBusinessController.protectBusiness,
  viewController.createProduct
);

router.get(
  '/dashboard',
  authBusinessController.protectBusiness,
  viewController.getBusDashboard
);
router.get(
  '/allproducts',
  authBusinessController.protectBusiness,
  viewController.allProducts
);
router.get(
  '/allOrders',
  authBusinessController.protectBusiness,
  viewController.allBusOrders
);

router.get(
  '/order/:productId/:orderId/:cartId',
  authBusinessController.protectBusiness,
  viewController.getMyorder
);

router.get(
  '/myproduct/:slug/:productId/:businessUserId',
  authBusinessController.protectBusiness,
  viewController.getMyProduct
);

module.exports = router;
