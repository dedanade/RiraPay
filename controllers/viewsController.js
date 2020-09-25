const moment = require('moment');
// const newEscape = require('escape-html');
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
  // Date Calculation

  //Today
  const startToday = moment()
    .startOf('day')
    .toDate(); // set to 12:00 am today
  const endToday = moment()
    .endOf('day')
    .toDate(); // set to 23:59 pm today

  // This Week
  const startWeek = moment()
    .startOf('isoWeek')
    .toDate(); // set to 12:00am of Monday according to ISO 8601
  const endWeek = moment()
    .endOf('isoWeek')
    .toDate(); // set to 23:59 pm of Sunday

  // This Month
  const startMonth = moment()
    .startOf('month')
    .toDate(); // set to 12:00 for the first day of th month
  const endMonth = moment()
    .endOf('month')
    .toDate(); // set to 23:59 pm of the last day of the week

  // Sales Today Calculation
  const salesorders = await Order.find({
    _id: businessUser.orders,
    createdAt: {
      $gte: startToday,
      $lte: endToday
    }
  });
  const arraySalesOrder = [];

  salesorders.forEach(e => {
    const eachSalesToday = e.cart;
    eachSalesToday.forEach(esales => {
      arraySalesOrder.push(esales.total);
    });
  });

  // const cartSalesToday = await Cart.find(
  //   { _id: arraySalesOrder },
  //   'total -_id'
  // );

  // // const cartesalles = cartSalesToday.map(e => {
  // //   console.log(e);
  // //   return e.cart;
  // // });

  // console.log(cartesalles);

  const sumOfCartSalesToday = arraySalesOrder
    .reduce((a, b) => {
      return a + b;
    }, 0)
    .toLocaleString();

  // Sales This week

  const salesOrdersWeek = await Order.find({
    _id: businessUser.orders,
    createdAt: {
      $gte: startWeek,
      $lte: endWeek
    }
  });

  const arraySalesWeek = [];

  salesOrdersWeek.forEach(e => {
    const eachSalesWeek = e.cart;
    eachSalesWeek.forEach(esales => {
      arraySalesWeek.push(esales.total);
    });
  });

  const sumOfCartSalesWeek = arraySalesWeek
    .reduce((a, b) => {
      return a + b;
    }, 0)
    .toLocaleString();

  //Sales This Month

  const salesOrdersMonth = await Order.find({
    _id: businessUser.orders,
    createdAt: {
      $gte: startMonth,
      $lte: endMonth
    }
  });

  const arraySalesMonth = [];

  salesOrdersMonth.forEach(e => {
    const eachSalesMonth = e.cart;
    eachSalesMonth.forEach(esales => {
      arraySalesMonth.push(esales.total);
    });
  });

  const sumOfCartSalesMonth = arraySalesMonth
    .reduce((a, b) => {
      return a + b;
    }, 0)
    .toLocaleString();

  // Transactions Today

  const transactionToday = await Order.find({
    _id: businessUser.orders,
    status: ['Paid', 'Shipped', 'Delivered', 'Completed', 'Canceled'],
    paidAt: {
      $gte: startToday,
      $lte: endToday
    }
  });

  const ArrayTranToday = [];

  transactionToday.forEach(e => {
    const eachtrantoday = e.cart;
    eachtrantoday.forEach(etran => {
      ArrayTranToday.push(etran.total);
    });
  });

  const sumOfcartTranToday = ArrayTranToday.reduce((a, b) => {
    return a + b;
  }, 0).toLocaleString();

  // Transactions This Week

  const transactionWeek = await Order.find({
    _id: businessUser.orders,
    status: ['Paid', 'Shipped', 'Delivered', 'Completed', 'Canceled'],
    paidAt: {
      $gte: startWeek,
      $lte: endWeek
    }
  });

  const ArrayTranWeek = [];

  transactionWeek.forEach(e => {
    const eachtranweek = e.cart;
    eachtranweek.forEach(etran => {
      ArrayTranWeek.push(etran.total);
    });
  });

  const sumOfcartTranWeek = ArrayTranWeek.reduce((a, b) => {
    return a + b;
  }, 0).toLocaleString();

  // Transactions This Month
  const transactionMonth = await Order.find({
    _id: businessUser.orders,
    status: ['Paid', 'Shipped', 'Delivered', 'Completed', 'Canceled'],
    paidAt: {
      $gte: startMonth,
      $lte: endMonth
    }
  });

  const ArrayTranMonth = [];

  transactionMonth.forEach(e => {
    const eachtranMonth = e.cart;
    eachtranMonth.forEach(etran => {
      ArrayTranMonth.push(etran.total);
    });
  });

  const sumOfcartTranMonth = ArrayTranMonth.reduce((a, b) => {
    return a + b;
  }, 0).toLocaleString();

  res.status(200).render('busDashBoard', {
    title: 'Business DashBoard',
    product,
    orders,
    cart,
    businessUser,
    salesToday: sumOfCartSalesToday,
    salesWeek: sumOfCartSalesWeek,
    salesMonth: sumOfCartSalesMonth,
    transToday: sumOfcartTranToday,
    transWeek: sumOfcartTranWeek,
    transMonth: sumOfcartTranMonth
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

exports.busForgotPass = catchAsync(async (req, res, next) => {
  res.status(200).render('busForgotPass', {
    title: 'Retrieve your Password'
  });
});

exports.forgotPass = catchAsync(async (req, res, next) => {
  res.status(200).render('forgotPass', {
    title: 'Retrieve your Password'
  });
});

exports.busResetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  res.status(200).render('busResetPass', {
    title: 'New Password',
    token
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  res.status(200).render('resetPass', {
    title: 'New Password',
    token
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

  // const newEdit = product.additionalInfo.html();

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

  // const newDescription = (product.additionalInfo);
  // console.log(newDescription);

  // const newEscape = new newEscape();
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

exports.purchasePixel = catchAsync(async (req, res, next) => {
  const businessUser = await BusinessUser.findById({
    _id: req.params.businessUserId
  });

  res.status(200).render('purchasePixel', {
    title: 'Check purchase Pixel',
    businessUser
  });
});
