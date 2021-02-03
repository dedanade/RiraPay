const mongoose = require('mongoose');
const validator = require('validator');
const generate = require('meaningful-string');

const orderSchema = new mongoose.Schema(
  {
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
    orderNum: String,
    qty: {
      type: String,
      required: [true, 'Product Quantity is required']
    },
    total: {
      type: Number,
      required: [true, 'Product Total is Required']
    },
    colour: String,
    size: String,
    status: {
      type: String,
      enum: [
        'Incomplete',
        'Paid',
        'Shipped',
        'Delivered',
        'Completed',
        'Canceled'
      ],
      default: 'Incomplete'
    },

    tags: [
      {
        type: String
      }
    ],
    logisticName: {
      type: String,
      default: 'None'
    },
    trackingNum: {
      type: String,
      default: '00000'
    },

    createdAt: { type: Date, default: Date.now },
    paidAt: { type: Date, default: 0 },
    shippedAt: { type: Date, default: 0 },
    deliveredAt: { type: Date, default: 0 },

    businessAccount: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'BusinessAccount',
        required: [true, 'BusinessAccount is required']
      }
    ],
    product: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Product is required']
      }
    ]
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
  this.populate('product');
  this.populate('businessAccount');
  next();
});

orderSchema.pre('save', function(next) {
  if (this.isNew) {
    this.orderNum = generate.random({
      min: 8,
      max: 8,
      allCaps: true,
      onlyNumbers: true,
      startWith: 'R'
    });
    next();
  } else next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
