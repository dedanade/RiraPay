const mongoose = require('mongoose');
const validator = require('validator');

const businessAccountSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: [true, 'Please tell us your Business name']
  },
  businessPhoneNumber: {
    type: String,
    required: [true, 'please provide your Phone Number'],
    unique: [
      true,
      'Your Business phone number has been used. Try and Login with your phone number'
    ],
    minlenght: [11, 'Your Business Phone Nmber should be up to 11'],
    maxlenght: [11, 'Your Business Phone Nmber should not be more than 11']
  },
  businessAccountEmail: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  facebookPixelId: {
    type: String
  },
  facebookCurrency: {
    type: String,
    default: 'USD'
  },
  facebookValue: {
    type: String
  }
});
businessAccountSchema.set('toObject', { virtuals: true });
businessAccountSchema.set('toJSON', { virtuals: true });

businessAccountSchema.virtual('businessUsers', {
  ref: 'BusinessUser',
  foreignField: 'businessAccount',
  localField: '_id'
});

businessAccountSchema.virtual('products', {
  ref: 'Product',
  foreignField: 'businessAccount',
  localField: '_id'
});

businessAccountSchema.virtual('orders', {
  ref: 'Order',
  foreignField: 'businessAccount',
  localField: '_id'
});

businessAccountSchema.virtual('product', {
  ref: 'Product',
  foreignField: 'orders',
  localField: '_id'
});

businessAccountSchema.pre(/^find/, function(next) {
  this.populate('businessUsers', '_id');
  this.populate('products');
  // this.populate('orders');
  next();
});

const BusinessAccount = mongoose.model(
  'BusinessAccount',
  businessAccountSchema
);

module.exports = BusinessAccount;
