const mongoose = require('mongoose');

const cartShcema = new mongoose.Schema({
  qty: {
    type: Number,
    required: [true, 'Product Quantity is required']
  },
  total: {
    type: Number,
    required: [true, 'Cart Total is Required']
  }
});

const Cart = mongoose.model('Cart', cartShcema);

module.exports = Cart;
