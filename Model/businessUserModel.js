const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const businessUserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please tell us your Full Personal name']
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

  businessEmail: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  businessPassword: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Minimum lenght of your password should be 6'],
    select: true
  },
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
businessUserSchema.set('toObject', { virtuals: true });
businessUserSchema.set('toJSON', { virtuals: true });

// businessUserSchema.plugin(uniqueValidator, {
//   message:
//     'Error, {PATH} must be unique. Try another or Login if you have an account '
// });

businessUserSchema.index(
  { businessUserName: 1, businessPhoneNumber: 1, businessEmail: 1 },
  { unique: true }
);

businessUserSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('businessPassword')) return next();
  // Hash the password with cost of 12
  this.businessPassword = await bcrypt.hash(this.businessPassword, 12);

  next();
});

businessUserSchema.pre('save', function(next) {
  if (!this.isModified('businessPassword') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

businessUserSchema.pre(/^find/, function(next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

businessUserSchema.methods.correctPassword = async function(
  candidatePassword,
  businessuserPassword
) {
  return await bcrypt.compare(candidatePassword, businessuserPassword);
};

businessUserSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
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

businessUserSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const BusinessUser = mongoose.model('BusinessUser', businessUserSchema);

module.exports = BusinessUser;
