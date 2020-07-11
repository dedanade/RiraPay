/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';
import { submitlink } from './index';

export const createProduct = async (
  productName,
  price,
  stock,
  additionalInfo,
  discount,
  colours,
  sizes
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/products',
      data: {
        productName,
        price,
        stock,
        additionalInfo,
        discount,
        colours,
        sizes
      }
    });

    const productSlug = res.data.data.newProduct.slug;
    const productId = res.data.data.newProduct._id;
    if (res.data.status === 'success') {
      showAlert('success', 'Product created Successfully!');
      window.setTimeout(() => {
        location.assign(`/myproduct/${productSlug}/${productId}`);
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const createCart = async (qty, total, colour, size) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/products/cart',
      data: {
        qty,
        total,
        colour,
        size
      }
    });

    const cartId = res.data.data.newCart._id;
    if (res.data.status === 'success') {
      showAlert('success', 'Your Cart created Successfully!');
      window.setTimeout(() => {
        location.assign(`/createorder/${submitlink}/${cartId}`);
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const createOrder = async (
  businessUser,
  cart,
  product,
  name,
  email,
  address,
  state,
  area,
  phone,
  altphone,
  user
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/orders`,
      data: {
        businessUser,
        cart,
        product,
        name,
        email,
        address,
        state,
        area,
        phone,
        altphone,
        user
      }
    });

    const orderId = res.data.data.newOrder._id;

    if (res.data.status === 'success') {
      showAlert('success', 'Your Order details was created Successfully!');
      window.setTimeout(() => {
        location.assign(`/orderInfo/${orderId}`);
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
