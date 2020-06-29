const Product = require('./../Model/productModel');
const BusinessUser = require('./../Model/businessUserModel');
const User = require('./../Model/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Cart = require('../Model/cart');
const Order = require('../Model/orderModel');

exports.getDashboard = catchAsync(async (req, res, next) => {
  const user = await User.findById({
    _id: req.user.id
  });
  const product = await Product.find();

  const orders = await Order.find();

  const cart = await Cart.find();

  const raworderemails = await Order.find({ email: user.email }).distinct(
    '_id'
  );

  const orderemails = raworderemails.toString();

  res.status(200).render('dashBoard', {
    title: 'DashBoard',
    user,
    orders,
    product,
    cart,
    orderemails
  });
});

exports.getBusDashboard = catchAsync(async (req, res, next) => {
  const businessUser = await BusinessUser.findById({
    _id: req.businessUser.id
  }).populate('orders');
  const product = await Product.find();

  const orders = await Order.find();

  const cart = await Cart.find();

  res.status(200).render('busDashBoard', {
    title: 'Business DashBoard',
    product,
    orders,
    cart,
    businessUser
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

exports.busLogin = catchAsync(async (req, res, next) => {
  res.status(200).render('busLogin', {
    title: 'Login Business Account'
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  res.status(200).render('signup', {
    title: 'Sign Up'
  });
});

exports.busSignup = catchAsync(async (req, res, next) => {
  res.status(200).render('busSignup', {
    title: 'Sign Up'
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  res.status(200).render('createProduct', {
    title: 'Create a new Product'
  });
});

exports.allProducts = catchAsync(async (req, res, next) => {
  res.status(200).render('allProducts', {
    title: 'All Products'
  });
});

exports.allBusOrders = catchAsync(async (req, res, next) => {
  const businessUser = await BusinessUser.findById({
    _id: req.businessUser.id
  }).populate('orders');
  res.status(200).render('allbusorders', {
    title: 'All Orders',
    businessUser
  });
});

exports.getMyProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({
    _id: req.params.productId
  });
  const businessUser = await BusinessUser.findOne({
    _id: req.businessUser.id
  }).populate('orders');

  const protocol = `${req.protocol}://${req.get('host')}`;

  if (!product || !businessUser) {
    return next(
      new AppError('There is no product with that name and ID.', 404)
    );
  }

  res.status(200).render('getMyProduct', {
    title: `${product.productName}`,
    product,
    businessUser,
    protocol
  });
});

exports.editProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({
    _id: req.params.productId
  });

  if (!product) {
    return next(
      new AppError('There is no product with that name and ID.', 404)
    );
  }

  res.status(200).render('editProduct', {
    title: `${product.productName}`,
    product
  });
});

exports.buyProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({
    _id: req.params.productId
  });

  const businessUser = await BusinessUser.findById({
    _id: req.params.businessUserId
  });

  if (!product || !businessUser) {
    return next(
      new AppError('There is no product with that name and ID.', 404)
    );
  }
  res.status(200).render('buyProduct', {
    title: `Buy ${product.productName}`,
    product,
    businessUser
  });
});

exports.createOrder = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({
    _id: req.params.productId
  });

  const businessUser = await BusinessUser.findById({
    _id: req.params.businessUserId
  });
  const cart = await Cart.findById({
    _id: req.params.cartId
  });

  res.status(200).render('createOrder', {
    title: 'Create your Order',
    cart,
    product,
    businessUser
  });
});

exports.getMyorder = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({
    _id: req.params.productId
  });
  const businessUser = await BusinessUser.findOne({
    _id: req.businessUser.id
  }).populate('orders');

  const order = await Order.findOne({ _id: req.params.orderId });
  const cart = await Cart.findById(order.cart);

  if (!product || !order) {
    return next(new AppError('There is no order with that name and ID.', 404));
  }

  res.status(200).render('busOrderPage', {
    title: `OrderPage | ${businessUser.businessName}`,
    product,
    businessUser,
    order,
    cart
  });
});

exports.getorder = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({
    _id: req.params.productId
  });
  const user = await User.findOne({
    _id: req.user.id
  });

  const order = await Order.findById({ _id: req.params.orderId });

  const cart = await Cart.findById(order.cart);

  const busUser = await BusinessUser.findById(order.businessUser);

  if (!product || !order) {
    return next(new AppError('There is no order with that name and ID.', 404));
  }

  res.status(200).render('orderPage', {
    title: `OrderPage`,
    product,
    user,
    order,
    cart,
    busUser
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

  // Order.findByIdAndUpdate(
  //   req.params.orderId,
  //   { status: 'Paid' },
  //   { new: true }
  // );
  // order.status = 'Paid';
  // await order.save();
  // const cart = await Cart.findById(order.cart);

  // const product = await Cart.findById(order.product);

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
