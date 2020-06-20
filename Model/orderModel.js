const mongoose = require('mongoose');
const validator = require('validator');
const generate = require('meaningful-string');

const orderSchema = new mongoose.Schema(
  {
    orderID: String,
    email: {
      type: String,
      required: [true, 'Email address is Required'],
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email']
    },
    name: {
      type: String,
      required: [true, 'Your Name is Required']
    },

    address: {
      type: String,
      required: [true, 'Your Full address is required']
    },

    state: {
      type: String,
      required: [true, 'Your State is required']
    },

    area: {
      type: String,
      required: [true, 'Your Area is required']
    },
    phone: {
      type: String,
      required: [true, 'please provide your Phone Number'],
      min: [11, 'Your Business Phone Nmber should be up to 11'],
      max: [11, 'Your Business Phone Nmber should not be more than 11']
    },
    altPhone: {
      type: String,
      min: [11, 'Your Business Phone Nmber should be up to 11'],
      max: [11, 'Your Business Phone Nmber should not be more than 11']
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    businessUser: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'BusinessUser',
        required: [true, 'BusinessUser is required']
      }
    ],

    cart: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Cart',
        required: [true, 'Cart is required']
      }
    ],
    product: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Product is required']
      }
    ],
    status: {
      type: String,
      enum: ['Incomplete', 'Paid', 'Shipped', 'Completed', 'Canceled'],
      default: 'Incomplete'
    },

    tags: [
      {
        type: String
      }
    ],

    date: { type: Date, default: Date.now }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// orderSchema.plugin(require('mongoose-autopopulate'));

orderSchema.virtual('user', {
  ref: 'User',
  foreignField: 'orders',
  localField: '_id'
});

orderSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'product',
    select: ''
  });
  next();
});

orderSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'cart',
    select: ''
  });
  next();
});
orderSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'businessUser',
    select: ''
  });
  next();
});

orderSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'orderID',
    select: ''
  });
  next();
});

orderSchema.pre('save', function(next) {
  this.orderID = generate.random({
    min: 8,
    max: 8,
    allCaps: true,
    onlyNumbers: true,
    startWith: 'R'
  });
  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
