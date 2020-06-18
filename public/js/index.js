/*eslint-disable */

import '@babel/polyfill';
import { login, busLogin, busLogout, logout } from './login';
import { signup, busSignup } from './signup';
import { createProduct, createOrder, createCart } from './create';
import { updatePixel, updateTags, updateOrderEmails } from './update';
import { showAlert } from './alert';
// import { bookOrder } from './paystack';

export const submitlink = (document.getElementById('submitlinkinput') || {})
  .value;
export const orderId = (document.getElementById('orderid') || {}).value;

export const businessId = (document.getElementById('businessId') || {}).value;

const loginForm = document.querySelector('.login-form');
const busloginForm = document.querySelector('.bus-login-form');

const logoutBus = document.querySelector('.logout_bus_btn');
const Logout = document.querySelector('.logout_btn');

const signupForm = document.querySelector('.signup-form');
const busSignupForm = document.querySelector('.signup-bus-form');

const createProductForm = document.querySelector('.create-product-form');
const createCartinput = document.querySelector('.cart-details');
const createOrderForm = document.querySelector('.create-order-form');

const pixelForm = document.getElementById('pixelform');
const tagsForm = document.getElementById('tagsform');
const updateForm = document.getElementById('updateorderform');
const updateFormmobile = document.getElementById('updateFormmobile');

// const addbtn = document.querySelector('#add');
// const subbtn = document.querySelector('#subtract');
// const qtyfield = document.querySelector('#quantity');

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email-login').value;
    const password = document.getElementById('pass-login').value;
    login(email, password);
  });

if (busloginForm)
  busloginForm.addEventListener('submit', e => {
    e.preventDefault();
    const businsessEmail = document.getElementById('email-bus-login').value;
    const busisnessPassword = document.getElementById('pass-bus-login').value;
    busLogin(businsessEmail, busisnessPassword);
  });

if (logoutBus) logoutBus.addEventListener('click', busLogout);
if (Logout) Logout.addEventListener('click', logout);

if (signupForm)
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const firstName = document.getElementById('inputfirstname').value;
    const lastName = document.getElementById('inputlastname').value;
    const email = document.getElementById('inputemail').value;
    const phoneNumber = document.getElementById('inputphonenumber').value;
    const password = document.getElementById('inputpassword').value;
    signup(firstName, lastName, email, phoneNumber, password);
  });

if (busSignupForm)
  busSignupForm.addEventListener('submit', e => {
    e.preventDefault();
    const businessName = document.getElementById('input-bus-name').value;
    const businessEmail = document.getElementById('input-bus-email').value;
    const businessPhoneNumber = document.getElementById('input-bus-phone')
      .value;
    const businessPassword = document.getElementById('input-bus-password')
      .value;
    busSignup(
      businessName,
      businessEmail,
      businessPhoneNumber,
      businessPassword
    );
  });

if (createProductForm)
  createProductForm.addEventListener('submit', e => {
    e.preventDefault();
    const productName = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const stock = document.getElementById('productStock').value;
    const additionalInfo = document.getElementById('additionalInfo').value;

    createProduct(productName, price, stock, additionalInfo);
  });

if (createCartinput)
  createCartinput.addEventListener('submit', e => {
    e.preventDefault();
    const qty = document.getElementById('quantity').value;
    const total = document
      .getElementById('total')
      .value.replace('₦', ' ')
      .replace(/\D/g, '');
    createCart(qty, total);
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

$('#quantity').on('keyup click', function() {
  const tot = $('#price').val() * this.value;
  const total = `That's ₦${tot.toLocaleString()}`;
  $('#total').val(total);
});

// if (addbtn)
//   addbtn.addEventListener('click', () => {
//     qtyfield.value = parseInt(qtyfield.value) + 1;
//   });
// if (subbtn)
//   subbtn.addEventListener('click', () => {
//     qtyfield.value = parseInt(qtyfield.value) - 1;
//   });

if (createOrderForm)
  createOrderForm.addEventListener('submit', e => {
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
  });

const successpage = (document.getElementById('successpage') || {}).value;

const paymentForm = document.getElementById('paymentForm');

if (paymentForm) paymentForm.addEventListener('submit', payWithPaystack, false);

function payWithPaystack(e) {
  e.preventDefault();
  var handler = PaystackPop.setup({
    key: 'pk_test_560e59a119eeba74a6c5698aae0e1b05b63a3260', // Replace with your public key
    email: document.getElementById('email').value,
    amount: document.getElementById('total').value * 100,
    firstname: document.getElementById('name').value,
    reference: document.getElementById('orderid').value,
    metadata: {
      custom_fields: [
        {
          orderId: document.getElementById('orderid').value,
          value: '12323111'
        }
      ]
    },
    onClose: function() {
      alert('Window closed.');
    },
    callback: function(response) {
      window.location = document.getElementById('successpage').value;
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
