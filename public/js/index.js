/*eslint-disable */

import '@babel/polyfill';
import qs from 'qs';
import { login, busLogin, busLogout, logout } from './login';
import {
  signup,
  busSignup,
  forgotPassword,
  resetPassword,
  busForgotPassword,
  busResetPassword
} from './signup';
import { createProduct, createOrder, createCart } from './create';
import {
  updatePixel,
  updateTags,
  updateOrderEmails,
  updateShippingOrder,
  updateDelivery,
  updateProduct
} from './update';
import { showAlert } from './alert';
// import { bookOrder } from './paystack';

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

const createCartinput = document.querySelector('.cart-details');
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

if (forgotForm)
  forgotForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('forgot-email').value;
    forgotPassword(email);
  });

if (resetPassForm)
  resetPassForm.addEventListener('submit', e => {
    e.preventDefault();
    const password = document.getElementById('reset-password').value;
    const confirmPassword = document.getElementById('reset-confirm-password')
      .value;
    if (password != confirmPassword) {
      alert('New and confirm password must be the same');
    } else resetPassword(password);
  });

if (busForgotForm)
  busForgotForm.addEventListener('submit', e => {
    e.preventDefault();
    const businessEmail = document.getElementById('bus-forgot-email').value;
    busForgotPassword(businessEmail);
  });

if (resetBusPassForm)
  resetBusPassForm.addEventListener('submit', e => {
    e.preventDefault();
    const businessPassword = document.getElementById('reset-bus-password')
      .value;
    const confirmPassword = document.getElementById(
      'reset-bus-confirm-password'
    ).value;
    if (businessPassword != confirmPassword) {
      alert('New and confirm password must be the same');
    } else busResetPassword(businessPassword);
  });

if (createProductForm)
  createProductForm.addEventListener('submit', e => {
    e.preventDefault();

    const productName = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value || 0;
    const stock = document.getElementById('productStock').value;
    const additionalInfo = document.getElementById('additionalInfo').value;
    const discount = document.getElementById('inputDiscount').value;
    const colours = document.getElementById('color-tags').value;
    const sizes = document.getElementById('size-tags').value;

    const promoQty = document.getElementById('promoQty').value || 0;
    const promoPrice = document.getElementById('promoPrice').value || 0;

    const promoQty2 = document.getElementById('promoQty2').value || 0;
    const promoPrice2 = document.getElementById('promoPrice2').value || 0;

    const promoQty3 = document.getElementById('promoQty3').value || 0;
    const promoPrice3 = document.getElementById('promoPrice3').value || 0;

    const promoQty4 = document.getElementById('promoQty4').value || 0;
    const promoPrice4 = document.getElementById('promoPrice4').value || 0;

    const promoPriceQty = `${promoQty} = ${promoPrice} Naira, ${promoQty2} = ${promoPrice2} Naira, ${promoQty3} = ${promoPrice3} Naira, ${promoQty4} = ${promoPrice4} Naira`;

    if (price > 0 && promoPriceQty.split(',')[0] != '0 = 0 Naira') {
      alert(`You can't use one Price and Varient at the same time`);
    } else
      createProduct(
        productName,
        price,
        stock,
        additionalInfo,
        discount,
        colours,
        sizes,
        promoPriceQty
      );
  });

if (editProductForm)
  editProductForm.addEventListener('submit', e => {
    e.preventDefault();
    const productName = document.getElementById('editproductName').value;
    const price = (document.getElementById('editproductPrice') || 0).value;
    const stock = document.getElementById('editproductStock').value;
    const additionalInfo = document.getElementById('editadditionalInfo').value;
    const discount = document.getElementById('editinputDiscount').value;
    const colours = document.getElementById('edit-color-tags').value;
    const sizes = document.getElementById('edit-size-tags').value;

    updateProduct(
      productName,
      price,
      stock,
      additionalInfo,
      discount,
      colours,
      sizes
    );
  });

if (createCartinput)
  createCartinput.addEventListener('submit', e => {
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
  });

// let productTotal = ProductQty.split('=')[1].split(' ')[1];
// // const total = `That's ₦${productTotal.toLocaleString()}`;
// // $('#show_Product_total').val(total);
// console.log(productTotal);
$('#show_Product_Quantity').on('keyup click', function() {
  const tot = $('#product_price_hidden').val() * this.value;
  const total = `That's ₦${tot.toLocaleString()}`;
  $('#show_Product_total').val(total);
  console.log('hereee');
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

// if (addbtn)
//   addbtn.addEventListener('click', () => {
//     qtyfield.value = parseInt(qtyfield.value) + 1;
//   });
// if (subbtn)
//   subbtn.addEventListener('click', () => {
//     qtyfield.value = parseInt(qtyfield.value) - 1;
//   });

// $('.create-order-form').on('click', function() {
//   let valid = true;
//   $('[required]').each(function() {
//     if ($(this).is(':invalid') || !$(this).val()) valid = false;
//   });
//   if (valid);
//   $('.submit_order_btn').on('click', e => {
//     e.target.textContent = 'Processing...';
//   });
// });

if (createOrderForm)
  createOrderForm.addEventListener('submit', e => {
    e.preventDefault();
    e.srcElement[10].textContent = 'Processing...';

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

const successpage = (document.getElementById('successpage') || {}).value;

const paymentForm = document.getElementById('paymentForm');

if (paymentForm) paymentForm.addEventListener('submit', payWithPaystack, false);

const order_Id = (document.getElementById('orderid') || {}).value;

function payWithPaystack(e) {
  e.preventDefault();
  var handler = PaystackPop.setup({
    key: 'pk_live_3ef2940e51a265dcff51c7d3e31dadbdb9889b67', // Replace with your public key
    email: document.getElementById('email').value,
    amount: document.getElementById('total').value * 100,
    firstname: document.getElementById('name').value,
    lastname: document.getElementById('newOrderID').value,
    ref: order_Id,
    onClose: function() {
      alert('Window closed.');
    },
    callback: function(response) {
      window.location = document.getElementById('successpage').value;
      alert(message);
    }
  });

  handler.openIframe();
}

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
  const newPromoQtyArray = PromoQtyArray.slice(' 0 = 0 Niara', 2);
  // console.log(newPromoQtyArray);

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

const productPriceTypeForm = document.querySelector('#productPriceType');

if (productPriceTypeForm)
  productPriceTypeForm.addEventListener('change', function() {
    if (this.value === 'onePriceForm') {
      document.getElementById(`onePriceForm`).style.display = 'block';
      document.getElementById(`promoPriceForm`).style.display = 'none';
    }

    if (this.value === 'promoPriceForm') {
      document.getElementById(`onePriceForm`).style.display = 'none';
      document.getElementById(`promoPriceForm`).style.display = 'block';
    }
  });
// $(function() {
//   $('#productPriceType').change(function() {
//     $('.' + $(this).val()).show();
//   });
// });

var x = (document.getElementById('hidden_description') || {}).innerText;
$('#display_description').html(x);

// $(window).on(function() {
//   if ($(this).scrollTop() >= $('#place_order').offset().top) {
//     $('body').css('background-color', 'red');
//   } else {
//     $('#navigation').removeClass('nav-hide');
//   }
// });

// const waypoint = new Waypoint({
//   element: document.getElementById('place_order'),
//   handler: function(direction) {
//     $('#place_order_float_btn').hide();
//     console.log(direction);
//     if (direction === 'up') $('#place_order_float_btn').show();
//   }
// });

// $('#place_order').bind('inview', function(event, visible) {
//   if (visible == true) {
//     console.log('in view');
//   } else {
//     console.log('in view');
//   }
// });

// $(document).ready(function() {
//   if ($('#place_order').style.visibility == 'visible') {
//     // $('#place_order_float_btn').hide();
//     console.log('here');
//   }
// });
