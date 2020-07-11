const mongoose = require('mongoose');

const cartShcema = new mongoose.Schema({
  qty: {
    type: Number,
    required: [true, 'Product Quantity is required']
  },
  total: {
    type: Number,
    required: [true, 'Cart Total is Required']
  },
  colour: String,
  size: String
});

const Cart = mongoose.model('Cart', cartShcema);

module.exports = Cart;
