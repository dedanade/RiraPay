/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';
import { stopLoadingBtnSpinner } from './index';

export const createOrder = async (
  businessAccount,
  product,
  name,
  email,
  address,
  state,
  area,
  phone,
  altphone,
  qty,
  total,
  colour,
  size,
  submitbtn
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/orders`,
      data: {
        businessAccount,
        product,
        name,
        email,
        address,
        state,
        area,
        phone,
        altphone,
        qty,
        total,
        colour,
        size
      }
    });

    const orderId = res.data.data.newOrder._id;

    if (res.data.status === 'success') {
      showAlert('success', 'Your Order details was created Successfully!');
      window.setTimeout(() => {
        location.assign(`/orderInfo/${orderId}`);
      }, 1000);
    }
  } catch (err) {
    stopLoadingBtnSpinner(submitbtn);
    showAlert('error', err.response.data.message);
  }
};
