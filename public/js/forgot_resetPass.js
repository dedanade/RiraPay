/* eslint-disable */

import {
  forgotPassword,
  resetPassword,
  busForgotPassword,
  busResetPassword
} from './signupAPI';

export const forgotPassInput = e => {
  e.preventDefault();
  const email = document.getElementById('forgot-email').value;
  forgotPassword(email);
};

export const resetPassInput = e => {
  e.preventDefault();
  const password = document.getElementById('reset-password').value;
  const confirmPassword = document.getElementById('reset-confirm-password')
    .value;
  if (password != confirmPassword) {
    alert('New and confirm password must be the same');
  } else resetPassword(password);
};

export const busForgotPassInput = e => {
  e.preventDefault();
  const businessEmail = document.getElementById('bus-forgot-email').value;
  busForgotPassword(businessEmail);
};

export const busResetPassInput = e => {
  e.preventDefault();
  const businessPassword = document.getElementById('reset-bus-password').value;
  const confirmPassword = document.getElementById('reset-bus-confirm-password')
    .value;
  if (businessPassword != confirmPassword) {
    alert('New and confirm password must be the same');
  } else busResetPassword(businessPassword);
};
