/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alert';
import { orderId, DelOrderId, productId } from './index';

export const updatePixel = async facebookPixel => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/businessUsers/updateMyPixel',
      data: {
        facebookPixel
      }
    });
    if (res.data.status === 'success') {
      showAlert(
        'success',
        'Your Pixel has been Updated. Refresh this page and check your facebook pixel Helper Extention'
      );
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    showAlert(
      'success',
      'Your Pixel has been Updated. Refresh this page and check your facebook pixel Helper Extention'
    );
    console.log(err.response.data.message);
  }
};

export const updateTags = async tags => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/orders/${orderId}`,
      data: {
        tags
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Tags Created');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const updateOrderEmails = async orders => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/updateOrders`,
      data: {
        orders
      }
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

export const updateShippingOrder = async (
  OrderId,
  logisticName,
  trackingNum
) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/orders/ship`,
      data: {
        OrderId,
        logisticName,
        trackingNum
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Order has been marked as shipped');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    showAlert(
      'error',
      'Opps! Unable to update order. Try again later. If the error persist, kindly contact us ASAP'
    );
    console.log(`🔥🔥🔥 ${err.response.data.message}`);
  }
};

export const updateProduct = async (
  productName,
  price,
  stock,
  additionalInfo,
  discount,
  codOption,
  colours,
  sizes,
  promoQtyPrice
) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/products/${productId}`,
      data: {
        productName,
        price,
        stock,
        additionalInfo,
        discount,
        codOption,
        colours,
        sizes,
        promoQtyPrice
      }
    });
    const productSlug = res.data.data.data.slug;
    const updateproductid = res.data.data.data._id;
    if (res.data.status === 'success') {
      showAlert('success', 'Product Updated!');
      window.setTimeout(() => {
        location.assign(`/myproduct/${productSlug}/${updateproductid}`);
      }, 1500);
    }
  } catch (err) {
    showAlert(
      'error',
      'Opps! Unable to update product. Try again later. If the error persist, kindly contact us ASAP'
    );
    console.log(`🔥🔥🔥 ${err.response.data.message}`);
  }
};

export const updateDelivery = async getupdatedorder => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/v1/orders/deliver/${DelOrderId}`,
      data: {
        getupdatedorder
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Order has been marked as Delivered');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    showAlert(
      'error',
      'Opps! Unable to update order. Try again later. If the error persist, kindly contact us ASAP'
    );
    console.log(`🔥🔥🔥 ${err.response.data.message}`);
  }
};
