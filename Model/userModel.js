const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please tell us your First name']
  },
  lastName: {
    type: String,
    required: [true, 'Please tell us your last name']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Your Phone Number is Needed'],
    unique: [
      true,
      'Your phone number has been used. Try and Login with your phone number'
    ],
    minlenght: [11, 'Your Phone Nmber should be up to 11'],
    maxlenght: [11, 'Your Phone Nmber should not be more than 11']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: [
      true,
      'Seems you have an account with this email Address. Request for a new Password or signup with another Email Address'
    ],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Minimum lenght of your password should be 6'],
    select: false
  },
  orders: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Order'
    }
  ],
  date: { type: Date, default: Date.now },

  passwordChangedAt: {
    type: Date,
    select: false
  },
  passwordResetToken: {
    type: String,
    select: false
  },
  passwordResetExpires: {
    type: Date,
    select: false
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

userSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'orders',
    select: ''
  });

  next();
});

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

userSchema.plugin(uniqueValidator, {
  message:
    ' Your {PATH} must be unique. Try another or Login if you have an account '
});
userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function(next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
