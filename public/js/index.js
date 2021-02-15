/*eslint-disable */

import '@babel/polyfill';
import { createOrderInput } from './orders';

import { logout } from './signup_loginAPI';

import { updateOrderEmails } from './update';
import { showAlert } from './alert';
import { loginInput, signupInput } from './signup_login';
import { forgotPassInput, resetPassInput } from './forgot_resetPass';

const loginForm = document.querySelector('.login-form');

const Logout = document.querySelector('.logout_btn');

const signupForm = document.querySelector('.signup-form');

const forgotForm = document.querySelector('.forgot-form');
const resetPassForm = document.querySelector('.reset-pass-form');

const createOrderForm = document.querySelector('.create-order-form');

const updateordersbtn = document.querySelector('#refresh_ordersbtn');
const updateordersbtnmobile = document.querySelector(
  '#refresh_mobile_ordersbtn'
);

const selectColorOptions = document.querySelector('.selectColorOptions');
const selectSizeOptions = document.querySelector('.selectSizeOptions');
const selectPriceOptions = document.querySelector('.selectPriceOptions');

if (loginForm) loginForm.addEventListener('submit', loginInput);

if (Logout) Logout.addEventListener('click', logout);

if (signupForm) signupForm.addEventListener('submit', signupInput);

if (forgotForm) forgotForm.addEventListener('submit', forgotPassInput);

if (resetPassForm) resetPassForm.addEventListener('submit', resetPassInput);

$('#show_Product_Quantity').on('keyup click', function() {
  const tot = $('#product_price_hidden').val() * this.value;
  const total = `That's ₦${tot.toLocaleString()}`;
  $('#show_Product_total').val(total);
});

// LOADING BUTTON

export function loadingBtnSpinner(submitButton) {
  submitButton.classList.add('btnLoadingSpiner');
  submitButton.disabled = true;

  setTimeout(() => {
    submitButton.classList.remove('btnLoadingSpiner');
  }, 20000);
}

export function stopLoadingBtnSpinner(submitButton) {
  submitButton.classList.remove('btnLoadingSpiner');
  submitButton.disabled = false;
}

const show_product_Price_Qty = document.querySelector('#selectPromoPrice');

if (show_product_Price_Qty)
  show_product_Price_Qty.addEventListener('change', e => {
    e.preventDefault();
    var productTotal = e.target.value.split('=')[1].split(' ')[1];
    const total = `That's ₦${parseInt(productTotal).toLocaleString()}`;
    $('#show_Product_total').val(total);
  });

if (updateordersbtn)
  updateordersbtn.addEventListener('click', () => {
    updateOrderEmails();
  });

if (updateordersbtnmobile)
  updateordersbtnmobile.addEventListener('click', () => {
    updateOrderEmails();
  });

if (createOrderForm)
  createOrderForm.addEventListener('submit', createOrderInput);

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
