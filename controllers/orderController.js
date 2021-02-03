// const request = require('request');
const crypto = require('crypto');
const moment = require('moment');
// const { BitlyClient } = require('bitly');
const AppError = require('./../utils/appError');
const Order = require('./../Model/orderModel');
const BusinessAccount = require('./../Model/businessAccount');
const Product = require('./../Model/productModel');
const AllEmail = require('./../utils/email');
const AllBusEmail = require('./../utils/busEmail');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

// const filterObj = (obj, ...allowedFields) => {
//   const newObj = {};
//   Object.keys(obj).forEach(el => {
//     if (allowedFields.includes(el)) newObj[el] = obj[el];
//   });
//   return newObj;
// };

exports.createOrder = catchAsync(async (req, res, next) => {
  const twoMinutesAgo = moment()
    .subtract(2, 'minute')
    .format();

  const duplicateOrder = await Order.find({
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    createdAt: {
      $gte: twoMinutesAgo
    }
  });

  if (duplicateOrder && duplicateOrder.length) {
    return next(new AppError('Duplicate Order!', 401));
  }

  const newOrder = await Order.create(req.body);

  const order = await Order.findById(newOrder._id);
  const busAccount = await BusinessAccount.findById(order.businessAccount);
  const product = await Product.findById(order.product);
  if (product.price > 0) {
    product.stock -= order.qty;
  }
  await product.save();

  const url = `${req.protocol}://${req.get('host')}/orderinfo/${order._id}`;
  const url2 = `${req.protocol}://${req.get('host')}/busdashboard`;

  // console.log(busAccount);
  // console.log(product);

  await new AllEmail.OrderEmail(order, url, product).sendOrderEmail();
  await new AllBusEmail.BusOrderEmail(
    busAccount,
    url2,
    product,
    order
  ).sendBusOrderEmail();

  // const shortName = order.name
  //   .split(' ')
  //   .splice(0, 1)
  //   .join(' ');

  // const shtProductName = product.productName
  //   .split(' ')
  //   .splice(0, 3)
  //   .join(' ');

  // const shrtURL = await bitly.shorten(url);
  // console.log(shrtURL.link);

  // const data = {
  //   to: `234${order.phone}`,
  //   from: 'N-Alert',
  //   sms: `Hi ${shortName}, your ${shtProductName} order has been created. Claim your 7 days money-back here ${
  //     shrtURL.link
  //   } or call us on 09016772472`,
  //   type: 'plain',
  //   api_key: 'TLMwV93ySLFMtfXVYtHGMbqYeOfUs4Bo1riU8r4dzkBcMnuQPwzTz90VNYjd9m',
  //   channel: 'generic'
  // };
  // const options = {
  //   method: 'POST',
  //   url: 'https://termii.com/api/sms/send',
  //   headers: {
  //     'Content-Type': ['application/json', 'application/json']
  //   },
  //   body: JSON.stringify(data)
  // };
  // request(options, function(error, response) {
  //   if (error) throw new Error(error);
  //   console.log(response.body);
  // });

  res.status(201).json({
    status: 'success',
    data: {
      newOrder
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

    console.log(event);

    if (eventtype === 'charge.success');

    const order = await Order.findById({ _id: ordernum });
    const busAccount = await BusinessAccount.findById(order.businessAccount);
    const product = await Product.findById(order.product);

    const url = `${req.protocol}://${req.get('host')}/dashboard`;
    const url2 = `${req.protocol}://${req.get('host')}/busdashboard`;

    // console.log(busAccount);
    // console.log(product);

    await new AllEmail.OrderEmail(order, url, product).sendPayEmail();
    await new AllBusEmail.BusOrderEmail(
      busAccount,
      url2,
      product,
      order
    ).sendBusPayEmail();

    order.total = displaytotal;
    order.status = 'Paid';
    order.paidAt = Date.now();
    order.createdAt = Date.now();
    await order.save();
  }
  res.sendStatus(200);
});

exports.monifyWebhook = catchAsync(async (req, res, next) => {
  const allevents = req.body;
  // console.log(allevents);

  const secret = process.env.SECRET_KEYS_MONIFY;
  const { paymentReference } = allevents;
  const { amountPaid } = allevents;
  const { paidOn } = allevents;
  const { transactionReference } = allevents;

  const transactionhash = `${secret}|${paymentReference}|${amountPaid}|${paidOn}|${transactionReference}`;
  const hash = crypto
    .createHash('sha512')
    .update(`${transactionhash}`)
    .digest('hex');

  if (hash === allevents.transactionHash) {
    //   // Retrieve the request's body
    const ordernum = allevents.metaData.OrderId;
    // console.log(ordernum);
    // const rirafee = amountPaid * 0.02; // discounted total * the 2% transaction fee
    // const displaytotal = amountPaid - rirafee;

    const order = await Order.findById({ _id: ordernum });
    const busAccount = await BusinessAccount.findById(order.businessAccount);
    const product = await Product.findById(order.product);

    const url = `${req.protocol}://${req.get('host')}/dashboard`;
    const url2 = `${req.protocol}://${req.get('host')}/busdashboard`;

    // console.log(busAccount);
    // console.log(product);

    await new AllEmail.OrderEmail(order, url, product).sendPayEmail();
    await new AllBusEmail.BusOrderEmail(
      busAccount,
      url2,
      product,
      order
    ).sendBusPayEmail();

    order.total = amountPaid;
    order.status = 'Paid';
    order.paidAt = Date.now();
    order.createdAt = Date.now();
    await order.save();
  }
  res.sendStatus(200);
});
exports.getAllOrders = factory.getAll(Order);
exports.getOrder = factory.getOne(Order);
