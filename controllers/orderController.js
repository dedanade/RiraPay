const crypto = require('crypto');
const Order = require('./../Model/orderModel');
const Cart = require('./../Model/cart');

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

  if (!req.body.businessUser) req.body.businessUser = req.params.id;
  // if (!req.body.user) req.body.user = user;
  // if (!user) req.user.id = null;

  const newOrder = await Order.create(req.body);

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
    console.log(rirafee);
    console.log(displaytotal);

    if (eventtype === 'charge.success');
    const order = await Order.findById({ _id: ordernum });
    const cart = await Cart.findById(order.cart);

    cart.total = displaytotal;
    await cart.save();

    order.status = 'Paid';
    await order.save();
  }
  res.sendStatus(200);
});
exports.getAllOrders = factory.getAll(Order);
exports.getOrder = factory.getOne(Order);
