const express = require('express');
const BusinessuserController = require('../controllers/businessUserController');
const authBusinessController = require('../controllers/authBusinessController');
const productRouter = require('./productRoutes');

const router = express.Router();

// router.param('id', tourController.checkID);

router.use('/:businessUserId/products', productRouter);

router.post('/signup', authBusinessController.businesssignup);
router.post('/login', authBusinessController.businesslogin);

router.post('/forgotPassword', authBusinessController.forgotBusinessPassword);
router.post(
  '/resetPassword/:token',
  authBusinessController.resetBusinessPassword
);

router.get(
  '/businessdashboard',
  authBusinessController.protectBusiness,
  BusinessuserController.getMe,
  BusinessuserController.getBusinessUser
);

router.get(
  '/me',
  authBusinessController.protectBusiness,
  BusinessuserController.getMe,
  BusinessuserController.getBusinessUser
);
router.patch(
  '/updateMyPassword',
  authBusinessController.protectBusiness,
  authBusinessController.updateBusinessPassword
);
router.patch(
  '/updateMyBusiness',
  authBusinessController.protectBusiness,
  BusinessuserController.updateMyBusiness
);

router.patch(
  '/updateMyPixel',
  authBusinessController.protectBusiness,
  BusinessuserController.updateMyPixel
);

router
  .route('/')
  .get(BusinessuserController.getAllBusinessUsers)
  .post(BusinessuserController.createBusinessUser);

router
  .route('/:id')
  .get(BusinessuserController.getBusinessUser)
  .patch(BusinessuserController.updateBusinessUser)
  .delete(BusinessuserController.deleteBusinessUser);

module.exports = router;
