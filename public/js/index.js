/*eslint-disable */

import '@babel/polyfill';
import { createProductInput, editProductInput } from './product';
import { createOrderInput, createCartInput } from './orders';

import { busLogout, logout } from './loginAPI';

import {
  updatePixel,
  updateTags,
  updateOrderEmails,
  updateShippingOrder,
  updateDelivery
} from './update';
import { showAlert } from './alert';
import {
  busLoginInput,
  busSignupInput,
  loginInput,
  signupInput
} from './signup_login';
import {
  busForgotPassInput,
  busResetPassInput,
  forgotPassInput,
  resetPassInput
} from './forgot_resetPass';

export const submitlink = (document.getElementById('submitlinkinput') || {})
  .value;

export const token = (document.getElementById('forgotPassToken') || {}).value;
export const busToken = (document.getElementById('forgotBusPassToken') || {})
  .value;

export const orderId = (document.getElementById('orderid') || {}).value;

export const DelOrderId = (document.getElementById('DelOrderId') || {}).value;

export const productId = (document.getElementById('productId') || {}).value;

const loginForm = document.querySelector('.login-form');
const busloginForm = document.querySelector('.bus-login-form');

const logoutBus = document.querySelector('.logout_bus_btn');
const Logout = document.querySelector('.logout_btn');

const signupForm = document.querySelector('.signup-form');
const busSignupForm = document.querySelector('.signup-bus-form');

const forgotForm = document.querySelector('.forgot-form');
const resetPassForm = document.querySelector('.reset-pass-form');

const busForgotForm = document.querySelector('.bus-forgot-form');
const resetBusPassForm = document.querySelector('.reset-bus-pass-form');

const createProductForm = document.querySelector('.create-product-form');
const editProductForm = document.querySelector('.edit-product-form');

const createCartForm = document.querySelector('.cart-details');
const createOrderForm = document.querySelector('.create-order-form');

const pixelForm = document.getElementById('pixelform');
const tagsForm = document.getElementById('tagsform');
const updateForm = document.getElementById('updateorderform');
const updateFormmobile = document.getElementById('updateFormmobile');
const updateShipingForm = document.getElementById('shippingForm');
const updateDeliveryForm = document.getElementById('deliveryForm');

const selectColorOptions = document.querySelector('.selectColorOptions');
const selectSizeOptions = document.querySelector('.selectSizeOptions');
const selectPriceOptions = document.querySelector('.selectPriceOptions');

if (loginForm) loginForm.addEventListener('submit', loginInput);

if (busloginForm) busloginForm.addEventListener('submit', busLoginInput);

if (logoutBus) logoutBus.addEventListener('click', busLogout);
if (Logout) Logout.addEventListener('click', logout);

if (signupForm) signupForm.addEventListener('submit', signupInput);

if (busSignupForm) busSignupForm.addEventListener('submit', busSignupInput);

if (forgotForm) forgotForm.addEventListener('submit', forgotPassInput);

if (resetPassForm) resetPassForm.addEventListener('submit', resetPassInput);

if (busForgotForm) busForgotForm.addEventListener('submit', busForgotPassInput);

if (resetBusPassForm)
  resetBusPassForm.addEventListener('submit', busResetPassInput);

if (createProductForm)
  createProductForm.addEventListener('submit', createProductInput);

if (editProductForm)
  editProductForm.addEventListener('submit', editProductInput);

if (createCartForm) createCartForm.addEventListener('submit', createCartInput);

$('#show_Product_Quantity').on('keyup click', function() {
  const tot = $('#product_price_hidden').val() * this.value;
  const total = `That's ₦${tot.toLocaleString()}`;
  $('#show_Product_total').val(total);
});

const show_product_Price_Qty = document.querySelector('#selectPromoPrice');

if (show_product_Price_Qty)
  show_product_Price_Qty.addEventListener('change', e => {
    e.preventDefault();
    var productTotal = e.target.value.split('=')[1].split(' ')[1];
    const total = `That's ₦${parseInt(productTotal).toLocaleString()}`;
    $('#show_Product_total').val(total);
  });

if (pixelForm)
  pixelForm.addEventListener('submit', e => {
    e.preventDefault();
    const facebookPixel = document.getElementById('pixelId').value;
    updatePixel(facebookPixel);
  });

if (tagsForm)
  tagsForm.addEventListener('submit', e => {
    e.preventDefault();
    const tags = document.getElementById('order-tags').value;
    updateTags(tags);
  });

if (updateForm)
  updateForm.addEventListener('submit', e => {
    e.preventDefault();
    const orders = document.getElementById('ordersemail').value;
    updateOrderEmails(orders);
  });

if (updateFormmobile)
  updateFormmobile.addEventListener('submit', e => {
    e.preventDefault();
    const orders = document.getElementById('ordersemail').value;
    updateOrderEmails(orders);
  });

if (createOrderForm)
  createOrderForm.addEventListener('submit', createOrderInput);

if (updateShipingForm)
  updateShipingForm.addEventListener('submit', e => {
    e.preventDefault();
    const OrderId = document.getElementById('OrderId').value;
    const logisticName = document.getElementById('logName').value;
    const trackingNum = document.getElementById('logNum').value;
    updateShippingOrder(OrderId, logisticName, trackingNum);
  });

if (updateDeliveryForm)
  updateDeliveryForm.addEventListener('submit', e => {
    e.preventDefault();
    updateDelivery();
  });
//
// if (submitbtn)
//

// const paymentForm = document.getElementById('paymentForm');

// if (paymentForm) paymentForm.addEventListener('submit', payWithPaystack, false);

// const order_Id = (document.getElementById('orderid') || {}).value;

// function payWithPaystack(e) {
//   e.preventDefault();
//   var handler = PaystackPop.setup({
//     key: 'pk_live_3ef2940e51a265dcff51c7d3e31dadbdb9889b67', // Replace with your public key
//     email: document.getElementById('email').value,
//     amount: document.getElementById('total').value * 100,
//     firstname: document.getElementById('name').value,
//     lastname: document.getElementById('newOrderID').value,
//     ref: order_Id,
//     onClose: function() {
//       alert('Window closed.');
//     },
//     callback: function(response) {
//       window.location = document.getElementById('successpage').value;
//       alert(message);
//     }
//   });

//   handler.openIframe();
// }

const paymentFormOrderPage = document.getElementById('paymentFormOrderPage');
const orderIdOrderPage = (document.getElementById('orderIdOrderPage') || {})
  .value;

if (paymentFormOrderPage)
  paymentFormOrderPage.addEventListener(
    'submit',
    payWithPaystackOrderPage,
    false
  );
function payWithPaystackOrderPage(e) {
  e.preventDefault();
  var handler = PaystackPop.setup({
    key: 'pk_live_3ef2940e51a265dcff51c7d3e31dadbdb9889b67', // Replace with your public key
    email: document.getElementById('email2').value,
    amount: document.getElementById('total2').value * 100,
    firstname: document.getElementById('name2').value,
    lastname: document.getElementById('newOrderID2').value,
    ref: orderIdOrderPage,
    onClose: function() {
      alert('Window closed.');
    },
    callback: function(response) {
      location.reload();
      +response.reference;
      alert(message);
    }
  });

  handler.openIframe();
}
$('.mini-table[data-href]').on('click', function() {
  window.location = $(this).data('href');
  $(this).css({ background: 'darkgray' });
  return false;
});
$('.mini-table > a').on('click', function(e) {
  e.stopPropagation();
});

$('tr[data-href]').on('click', function() {
  window.location = $(this).data('href');
  return false;
});
$('td > a').on('click', function(e) {
  e.stopPropagation();
});

const clipboard = new ClipboardJS('.btn');

clipboard.on('success', function(e) {
  showAlert('success', 'copied Successfully');

  e.clearSelection();
});

clipboard.on('error', function(e) {
  showAlert('error', 'Unable to Copy, try again later');
});

$(document).ready(function() {
  $.fn.dataTable.moment('dddd, MMMM Do YYYY, h:mm:ss a');
  $('#all-table').DataTable({
    paging: true,
    ordering: true,
    scrollCollapse: true,
    searching: true,
    order: [0, 'desc'],
    bInfo: true
  });
});

$('.sales-today a').click(function(e) {
  e.preventDefault();
  $('.sales-toggle').hide();
  $('#button-sales').html($(this).text());
  var toShow = $(this).attr('href');
  $(toShow).show();
});

$('.trans-today a').click(function(e) {
  e.preventDefault();
  $('#button-trans').html($(this).text());
  $('.trans-toggle').hide();
  var toShow = $(this).attr('href');
  $(toShow).show();
});

$('.toggle-password').click(function() {
  $(this).toggleClass('fa-eye fa-eye-slash');
  var input = $($(this).attr('toggle'));
  if (input.attr('type') == 'password') {
    input.attr('type', 'text');
  } else {
    input.attr('type', 'password');
  }
});
if (selectPriceOptions) {
  const selectPromoPrice = document.getElementById('selectPromoPrice');
  const promoQtyPriceValue = document.getElementById('inputPromoQtyPrice')
    .value;

  // console.log(promoQtyPriceValue);
  const PromoQtyArray = promoQtyPriceValue.split(',');
  const newPromoQtyArray = PromoQtyArray.filter(e => e !== ' 0 = 0 Naira');
  // console.log(PromoQtyArray);

  for (var i = 0; i < newPromoQtyArray.length; i++) {
    var opt = newPromoQtyArray[i];
    var el = document.createElement('option');
    el.textContent = opt;
    el.value = opt;
    selectPromoPrice.appendChild(el);
  }
}
if (selectColorOptions) {
  const selectColours = document.getElementById('selectColours');
  const coloursValue = document.getElementById('productColours').value;
  const coloursOptions = coloursValue.split(',');
  for (var i = 0; i < coloursOptions.length; i++) {
    var opt = coloursOptions[i];
    var el = document.createElement('option');
    el.textContent = opt;
    el.value = opt;
    selectColours.appendChild(el);
  }
}

if (selectSizeOptions) {
  const selectSizes = document.getElementById('selectSizes');
  const sizesValue = document.getElementById('productSizes').value;
  const sizesOptions = sizesValue.split(',');
  for (var i = 0; i < sizesOptions.length; i++) {
    var opt = sizesOptions[i];
    var el = document.createElement('option');
    el.textContent = opt;
    el.value = opt;
    selectSizes.appendChild(el);
  }
}

// const productPriceTypeForm = document.querySelector('#productPriceType');

// if (productPriceTypeForm)
//   productPriceTypeForm.addEventListener('click change', e => {
//     console.log(this.value);
//     if (this.value === 'onePriceForm') {
//       document.getElementById(`onePriceForm`).style.display = 'block';
//       document.getElementById(`promoPriceForm`).style.display = 'none';
//     }
//     if (this.value === 'promoPriceForm') {
//       document.getElementById(`onePriceForm`).style.display = 'none';
//       document.getElementById(`promoPriceForm`).style.display = 'block';
//     }
//   });

$('#productPriceType').on('change', function() {
  if (this.value === 'onePriceForm') {
    $('#onePriceForm').show();
    $('#promoPriceForm').hide();
  }
  if (this.value === 'promoPriceForm') {
    $('#promoPriceForm').show();
    $('#onePriceForm').hide();
  }
});

var x = (document.getElementById('hidden_description') || {}).innerText;
$('#display_description').html(x);
