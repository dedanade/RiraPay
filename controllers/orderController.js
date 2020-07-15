const crypto = require('crypto');
const Order = require('./../Model/orderModel');
const BusinessUser = require('./../Model/businessUserModel');
const Product = require('./../Model/productModel');
const Cart = require('./../Model/cart');
const AllEmail = require('./../utils/email');
const AllBusEmail = require('./../utils/busEmail');

// const User = require('./../Model/userModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.createOrder = catchAsync(async (req, res, next) => {
  // const user = await User.findOne({ _id: req.user.id });

  // if (!req.body.businessUser) req.body.businessUser = req.params.id;
  // if (!req.body.user) req.body.user = user;
  // if (!user) req.user.id = null;

  const newOrder = await Order.create(req.body);
  const order = await Order.findById(newOrder._id);
  const busUser = await BusinessUser.findById(order.businessUser);
  const product = await Product.findById(order.product);
  const cart = await Cart.findById(order.cart);

  product.stock -= cart.qty;
  await product.save();

  const url = `${req.protocol}://${req.get('host')}/orderinfo/${order._id}`;
  const url2 = `${req.protocol}://${req.get('host')}/busdashboard`;

  // console.log(busUser);
  // console.log(product);

  await new AllEmail.OrderEmail(order, url, product, cart).sendOrderEmail();
  await new AllBusEmail.BusOrderEmail(
    busUser,
    url2,
    product,
    order,
    cart
  ).sendBusOrderEmail();

  res.status(201).json({
    status: 'success',
    data: {
      newOrder
    }
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  req.body.tags = req.body.tags.replace(/\s/g, ' ').split(',');
  // 2) Filtered out fields names that are allowed to be updated
  const filteredBody = filterObj(req.body, 'user', 'tags');

  // 3) Update user document
  // Validator not working!!!
  const Updatedorder = await Order.findByIdAndUpdate(
    req.params.OrderId,
    filteredBody,
    {
      new: true,
      upsert: true
    }
  );
  res.status(200).json({
    status: 'success',
    data: {
      Updatedorder
    }
  });
});

exports.updateShiping = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(req.body, 'logisticName', 'trackingNum');

  const Updatedshipedorder = await Order.findByIdAndUpdate(
    req.body.OrderId,
    filteredBody,
    {
      new: true
    }
  );

  Updatedshipedorder.status = 'Shipped';
  Updatedshipedorder.shippedAt = Date.now();
  await Updatedshipedorder.save();

  const order = await Order.findById(Updatedshipedorder._id);
  const product = await Product.findById(order.product);
  const cart = await Cart.findById(order.cart);

  const url = `${req.protocol}://${req.get('host')}/dashboard`;

  await new AllEmail.OrderEmail(order, url, product, cart).sendShipEmail();

  res.status(200).json({
    status: 'success',
    data: {
      Updatedshipedorder
    }
  });
});

exports.updateDelivery = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.OrderId);

  order.status = 'Delivered';
  order.deliveredAt = Date.now();
  await order.save();

  const product = await Product.findById(order.product);
  const cart = await Cart.findById(order.cart);

  const url = `${req.protocol}://${req.get('host')}/dashboard`;

  await new AllEmail.OrderEmail(order, url, product, cart).sendDeliveryEmail();
  res.status(200).json({
    status: 'success',
    data: {
      order
    }
  });
});

exports.paystackwebhook = catchAsync(async (req, res, next) => {
  const secret = process.env.SECRET_KEYS;
  const hash = crypto
    .createHmac('sha512', secret)
    .update(JSON.stringify(req.body))
    .digest('hex');
  if (hash === req.headers['x-paystack-signature']) {
    // Retrieve the request's body
    const event = req.body;
    const eventtype = event.event;
    const ordernum = event.data.reference;
    const discounttotal = event.data.amount / 100;
    const rirafee = discounttotal * 0.025; // discounted total * the 2.5 transaction fee
    const displaytotal = discounttotal - rirafee;

    if (eventtype === 'charge.success');

    const order = await Order.findById({ _id: ordernum });
    const cart = await Cart.findById(order.cart);
    const busUser = await BusinessUser.findById(order.businessUser);
    const product = await Product.findById(order.product);

    const url = `${req.protocol}://${req.get('host')}/dashboard`;
    const url2 = `${req.protocol}://${req.get('host')}/busdashboard`;

    // console.log(busUser);
    // console.log(product);

    await new AllEmail.OrderEmail(order, url, product, cart).sendPayEmail();
    await new AllBusEmail.BusOrderEmail(
      busUser,
      url2,
      product,
      order,
      cart
    ).sendBusPayEmail();

    cart.total = displaytotal;
    await cart.save();

    order.status = 'Paid';
    order.paidAt = Date.now();
    order.createdAt = Date.now();
    await order.save();
  }
  res.sendStatus(200);
});
exports.getAllOrders = factory.getAll(Order);
exports.getOrder = factory.getOne(Order);
