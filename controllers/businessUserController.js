// const path = require('path');
const BusinessUser = require('./../Model/businessUserModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMyBusiness = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.businessPassword) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out fields names that are allowed to be updated
  const filteredBody = filterObj(
    req.body,
    'businessPhoneNumber',
    'businessName',
    'businessEmail',
    'facebookPixel'
  );

  // 3) Update user document

  // Validator not working!!!

  const updatedBusinessUser = await BusinessUser.findByIdAndUpdate(
    req.businessUser.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
      context: 'query'
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      businessUser: updatedBusinessUser
    }
  });
});

exports.updateMyPixel = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.businessPassword) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out fields names that are allowed to be updated
  const filteredBody = filterObj(req.body, 'facebookPixel');

  // 3) Update user document

  // Validator not working!!!

  const updatedFacebookPixel = await BusinessUser.findByIdAndUpdate(
    req.businessUser.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
      context: 'query'
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      businessUser: updatedFacebookPixel
    }
  });
});

exports.createBusinessUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};

exports.getMe = (req, res, next) => {
  req.params.id = req.businessUser.id;
  next();
};

exports.getBusinessUser = factory.getOne(BusinessUser);
exports.getAllBusinessUsers = factory.getAll(BusinessUser);
exports.updateBusinessUser = factory.updateOne(BusinessUser);
exports.deleteBusinessUser = factory.deleteOne(BusinessUser);
