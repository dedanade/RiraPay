/* eslint-disable */

import { forgotPassword, resetPassword } from './signup_loginAPI';

export const forgotPassInput = e => {
  e.preventDefault();
  const email = document.getElementById('forgot-email').value;
  forgotPassword(email);
};

export const resetPassInput = e => {
  e.preventDefault();
  const password = document.getElementById('reset-password').value;
  const confirmPassword = document.getElementById('reset-confirm-password');
  const token = document.getElementById('forgotPassToken').value;
  if (password != confirmPassword) {
    alert('New and confirm password must be the same');
  } else resetPassword(password, token);
};
