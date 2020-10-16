/* eslint-disable */
import { createOrder, createCart } from './create';

export const createOrderInput = e => {
  e.preventDefault();

  const businessUser = document.getElementById('businessUser').value;
  const cart = document.getElementById('cart').value;
  const product = document.getElementById('product_id').value;
  const name = document.getElementById('checkoutname').value;
  const email = document.getElementById('checkoutemail').value;
  const address = document.getElementById('checkoutaddress').value;
  const state = document.getElementById('checkoutstate').value;
  const area = document.getElementById('checkoutarea').value;
  const phone = document.getElementById('checkoutphone').value;
  const altphone = document.getElementById('checkoutphone2').value;

  createOrder(
    businessUser,
    cart,
    product,
    name,
    email,
    address,
    state,
    area,
    phone,
    altphone
  );
  e.srcElement[10].textContent = 'Processing...';
};

export const createCartInput = e => {
  e.preventDefault();
  const one_Order_price = document.querySelector('.place_order_one_price');

  if (one_Order_price) {
    var productQty = document.getElementById('show_Product_Quantity').value;
    var productTotal = document
      .getElementById('show_Product_total')
      .value.replace('₦', ' ')
      .replace(/\D/g, '');
  }
  const select_order_price = document.querySelector(
    '.place_order_select_price'
  );

  if (select_order_price) {
    var productQty = document.getElementById('selectPromoPrice').value;
    var productTotal = productQty.split('=')[1].split(' ')[1];
  }
  const colourSelect = document.getElementById('selectColours');
  if (colourSelect) {
    var colour = colourSelect.options[colourSelect.selectedIndex].value;
  }
  const sizeSelect = document.getElementById('selectSizes');
  if (sizeSelect) {
    var size = sizeSelect.options[sizeSelect.selectedIndex].value;
  }
  createCart(productQty, productTotal, colour, size);
};
