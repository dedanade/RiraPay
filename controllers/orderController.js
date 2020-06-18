const crypto = require('crypto');

const secret = process.env.SECRET_KEYS;
const Order = require('./../Model/orderModel');
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
  const hash = crypto
    .createHmac('sha512', secret)
    .update(JSON.stringify(req.body))
    .digest('hex');
  if (hash === req.headers['x-paystack-signature']) {
    // Retrieve the request's body
    const event = req.body;
    // Do something with event
    // if (event === 'charge.success');
    console.log(event);
  }
  res.send(200);
});
exports.getAllOrders = factory.getAll(Order);
exports.getOrder = factory.getOne(Order);
