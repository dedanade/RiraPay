const Product = require('./../Model/productModel');
const Cart = require('./../Model/cart');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

exports.createProduct = catchAsync(async (req, res, next) => {
  if (!req.body.businessUser) req.body.businessUser = req.businessUser.id;
  const newProduct = await Product.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      newProduct
    }
  });
});

exports.createCart = catchAsync(async (req, res, next) => {
  const newCart = await Cart.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      newCart
    }
  });
});

exports.getAllProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
