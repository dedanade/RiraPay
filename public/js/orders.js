/* eslint-disable */
import { createOrder } from './create';

import { loadingBtnSpinner } from './index';

export const createOrderInput = e => {
  e.preventDefault();

  const businessAccount = document.getElementById(
    'create_order_businessAccountID'
  ).value;
  const product = document.getElementById('product_id').value;
  const name = document.getElementById('checkoutname').value;
  const email = document.getElementById('checkoutemail').value;
  const address = document.getElementById('checkoutaddress').value;
  const state = document.getElementById('checkoutstate').value;
  const area = document.getElementById('checkoutarea').value;
  const phone = document.getElementById('checkoutphone').value;
  const altphone = document.getElementById('checkoutphone2').value;

  const one_Order_price = document.querySelector('.place_order_one_price');

  if (one_Order_price) {
    var productQty = document.getElementById('show_Product_Quantity').value;
    const total = document
      .getElementById('show_Product_total')
      .value.replace('₦', ' ')
      .replace(/\D/g, '');
    var productTotal = parseInt(total);
  } else {
    var productQtyValue = document.getElementById('selectPromoPrice').value;
    var productQty = productQtyValue.split('=')[0].replace(/^\s+|\s+$/gm, '');
    const total = productQtyValue.split('=')[1].split(' ')[1];
    var productTotal = parseInt(total);
  }
  const colourSelect = document.getElementById('selectColours');
  if (colourSelect) {
    var colour = colourSelect.options[colourSelect.selectedIndex].value;
  }
  const sizeSelect = document.getElementById('selectSizes');
  if (sizeSelect) {
    var size = sizeSelect.options[sizeSelect.selectedIndex].value;
  }
  const submitButton = e.submitter;
  loadingBtnSpinner(submitButton);
  createOrder(
    businessAccount,
    product,
    name,
    email,
    address,
    state,
    area,
    phone,
    altphone,
    productQty,
    productTotal,
    colour,
    size,
    submitButton
  );
};
