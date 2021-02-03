/* eslint-disable */
import { signup, login } from './signup_loginAPI';
import { loadingBtnSpinner } from './index';

export const signupInput = e => {
  e.preventDefault();
  const firstName = document.getElementById('inputfirstname').value;
  const lastName = document.getElementById('inputlastname').value;
  const email = document.getElementById('inputemail').value;
  const phoneNumber = document.getElementById('inputphonenumber').value;
  const password = document.getElementById('inputpassword').value;
  const submitButton = e.submitter;
  loadingBtnSpinner(submitButton);
  signup(firstName, lastName, email, phoneNumber, password, submitButton);
};

export const loginInput = e => {
  e.preventDefault();
  const email = document.getElementById('email-login').value;
  const password = document.getElementById('pass-login').value;
  const submitButton = e.submitter;
  loadingBtnSpinner(submitButton);
  login(email, password, submitButton);
};
