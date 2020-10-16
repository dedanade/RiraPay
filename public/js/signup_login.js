/* eslint-disable */
import { signup, busSignup } from './signupAPI';
import { login, busLogin } from './loginAPI';

export const signupInput = e => {
  e.preventDefault();
  const firstName = document.getElementById('inputfirstname').value;
  const lastName = document.getElementById('inputlastname').value;
  const email = document.getElementById('inputemail').value;
  const phoneNumber = document.getElementById('inputphonenumber').value;
  const password = document.getElementById('inputpassword').value;
  signup(firstName, lastName, email, phoneNumber, password);
};

export const busSignupInput = e => {
  e.preventDefault();
  const businessName = document.getElementById('input-bus-name').value;
  const businessEmail = document.getElementById('input-bus-email').value;
  const businessPhoneNumber = document.getElementById('input-bus-phone').value;
  const businessPassword = document.getElementById('input-bus-password').value;
  busSignup(businessName, businessEmail, businessPhoneNumber, businessPassword);
};

export const loginInput = e => {
  e.preventDefault();
  const email = document.getElementById('email-login').value;
  const password = document.getElementById('pass-login').value;
  login(email, password);
};

export const busLoginInput = e => {
  e.preventDefault();
  const businsessEmail = document.getElementById('email-bus-login').value;
  const busisnessPassword = document.getElementById('pass-bus-login').value;
  busLogin(businsessEmail, busisnessPassword);
};
