// const newEscape = require('escape-html');
const Product = require('./../Model/productModel');
const BusinessUser = require('./../Model/businessUserModel');
const BusinessAccount = require('./../Model/businessAccount');
const User = require('./../Model/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Cart = require('../Model/cart');
const Order = require('../Model/orderModel');

exports.getDashboard = catchAsync(async (req, res, next) => {
  const user = await User.findById({
    _id: req.user.id
  });
  // console.log(user.orders);
  // const product = await Product.find();

  // const orders = await Order.find();

  // const cart = await Cart.find();'

  // console.log(user);

  res.status(200).render('dashBoard', {
    title: 'DashBoard',
    user
  });
});

exports.homepage = catchAsync(async (req, res, next) => {
  res.status(200).render('homepage/homepage', {
    title: 'Homepage'
  });
});

exports.busHomepage = catchAsync(async (req, res, next) => {
  res.status(200).render('homepage/bushomepage', {
    title: 'Homepage'
  });
});

exports.login = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Login to your Account'
  });
});

exports.forgotPass = catchAsync(async (req, res, next) => {
  res.status(200).render('forgotPass', {
    title: 'Retrieve your Password'
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  res.status(200).render('resetPass', {
    title: 'New Password',
    token
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  res.status(200).render('signup', {
    title: 'Sign Up'
  });
});

exports.createOrder = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({
    _id: req.params.productId
  });

  const businessAccount = await BusinessAccount.findById({
    _id: product.businessAccount
  });

  res.status(200).render('createOrder', {
    title: 'Create your Order',
    product,
    businessAccount
  });
});

exports.getorder = catchAsync(async (req, res, next) => {
  const user = await User.findOne({
    _id: req.user.id
  });

  const order = await Order.findById({ _id: req.params.orderId });

  const product = await Product.findById(order.product);

  const busAccount = await BusinessAccount.findById(order.businessAccount);

  if (!product || !order) {
    return next(new AppError('There is no order with that name and ID.', 404));
  }

  res.status(200).render('orderPage', {
    title: `OrderPage`,
    product,
    user,
    order,
    busAccount
  });
});

exports.myorderinfo = catchAsync(async (req, res, next) => {
  const order = await Order.findById({
    _id: req.params.orderId
  });

  const cart = await Cart.findById(order.cart);

  const product = await Product.findById(order.product);

  const businessUser = await BusinessUser.findById(order.businessUser);

  const protocol = `${req.protocol}://${req.get('host')}`;

  // const fbCurrency = product.facebookCurrency;

  if (!order && !cart && !product) {
    return next(new AppError('There is no order with that ID.', 404));
  }

  res.status(200).render('orderInfo', {
    title: 'My OrderInfo',
    order,
    product,
    cart,
    businessUser,
    protocol
  });
});

exports.getsuccesspage = catchAsync(async (req, res, next) => {
  const order = await Order.findById({
    _id: req.params.orderId
  });

  const businessUser = await BusinessUser.findById(order.businessUser);

  if (!order) {
    return next(new AppError('There is no order with that ID.', 404));
  }

  res.status(200).render('success_page', {
    title: 'Success Page',
    order,
    businessUser
  });
});

exports.getPodPage = catchAsync(async (req, res, next) => {
  const order = await Order.findById({
    _id: req.params.orderId
  });

  const businessUser = await BusinessUser.findById(order.businessUser);

  const product = await Product.findById(order.product);

  if (!order) {
    return next(new AppError('There is no order with that ID.', 404));
  }

  res.status(200).render('podOrder', {
    title: 'Pod Page',
    order,
    businessUser,
    product
  });
});
