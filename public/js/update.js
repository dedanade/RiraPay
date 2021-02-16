/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alert';
import { stopLoadingBtnSpinner } from './index';

export const updateOrderEmails = async () => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/updateOrders`
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Order Updated successfully');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    showAlert(
      'error',
      'It seems we cannot find any order with your email Address. If you think this is an error, kindly contact us'
    );
    console.log(`🔥🔥🔥 ${err.response.data.message}`);
  }
};
export const updateRefundRequest = async (data, submitButton, orderId) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/orders/${orderId}`,
      data
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Order Updated successfully');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    stopLoadingBtnSpinner(submitButton);
    showAlert('error', `Something is wrong. Please try again later`);
    console.log(`🔥🔥🔥 ${err.response.data.message}`);
  }
};
