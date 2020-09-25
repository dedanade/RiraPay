const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const BusinessUser = require('./../Model/businessUserModel');
const AllBusEmail = require('./../utils/busEmail');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  });
  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      BusinessUser
    }
  });
};

exports.businesssignup = catchAsync(async (req, res, next) => {
  const newBusinessUser = await BusinessUser.create({
    businessName: req.body.businessName,
    businessPhoneNumber: req.body.businessPhoneNumber,
    businessEmail: req.body.businessEmail,
    businessPassword: req.body.businessPassword,
    facebookPixel: req.body.facebookPixel
  });
  const url = `${req.protocol}://${req.get('host')}/busdashboard`;
  // console.log(url);
  await new AllBusEmail.BusEmail(newBusinessUser, url).sendBusWelcome();

  createSendToken(newBusinessUser, 201, req, res);
});

exports.businesslogin = catchAsync(async (req, res, next) => {
  const { businessEmail, businessPassword } = req.body;

  // 1) Check if email and password exist
  if (!businessEmail || !businessPassword) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const businessUser = await BusinessUser.findOne({ businessEmail }).select(
    '+businessPassword'
  );

  if (
    !businessUser ||
    !(await businessUser.correctPassword(
      businessPassword,
      businessUser.businessPassword
    ))
  ) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(businessUser, 200, req, res);
});

exports.protectBusiness = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    res.redirect('/buslogin');
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentBusinessUser = await BusinessUser.findById(decoded.id);

  if (!currentBusinessUser) {
    if (process.env.NODE_ENV === 'production') {
      res.redirect('/buslogin');
    } else
      return next(
        new AppError('You need to Login before creating a Product!', 401)
      );
  }

  // 4) Check if user changed password after the token was issued
  if (currentBusinessUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // // GRANT ACCESS TO PROTECTED ROUTE
  req.businessUser = currentBusinessUser;
  res.locals.businessUser = currentBusinessUser;

  next();
});

exports.forgotBusinessPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const businessUser = await BusinessUser.findOne({
    businessEmail: req.body.businessEmail
  });
  if (!businessUser) {
    return next(
      new AppError('There is no businessUser with that email address.', 404)
    );
  }

  // 2) Generate the random reset token
  const resetToken = businessUser.createPasswordResetToken();
  await businessUser.save({ validateBeforeSave: false });

  // 3) Send it to businessUser's email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/busresetpassword/${resetToken}`;

  // const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await new AllBusEmail.BusEmail(businessUser, resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
      email: businessUser.businessEmail
    });
  } catch (err) {
    businessUser.passwordResetToken = undefined;
    businessUser.passwordResetExpires = undefined;
    await businessUser.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

exports.resetBusinessPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const businessUser = await BusinessUser.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!businessUser) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  businessUser.Password = req.body.businessPassword;
  businessUser.passwordResetToken = undefined;
  businessUser.passwordResetExpires = undefined;
  await businessUser.save();

  // 3) Update changedPasswordAt property for the businessUser
  // 4) Log the businessUser in, send JWT
  createSendToken(businessUser, 200, req, res);
});

exports.updateBusinessPassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const businessUser = await BusinessUser.findById(req.businessUser.id).select(
    '+businessPassword'
  );

  // 2) Check if POSTed current password is correct
  if (
    !(await businessUser.correctPassword(
      req.body.passwordCurrent,
      businessUser.businessPassword
    ))
  ) {
    return next(new AppError('Your current password is wrong.', 401));
  }
  // 3) If so, update password
  businessUser.password = req.body.businessPassword;
  await businessUser.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(businessUser, 200, req, res);
});
