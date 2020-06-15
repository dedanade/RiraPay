/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alert';

export const signup = async (
  firstName,
  lastName,
  email,
  phoneNumber,
  password
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        password
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Signup Successfully!');
      window.setTimeout(() => {
        location.assign('/dashboard');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const busSignup = async (
  businessName,
  businessEmail,
  businessPhoneNumber,
  businessPassword
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/businessUsers/signup',
      data: {
        businessName,
        businessEmail,
        businessPhoneNumber,
        businessPassword
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Signup Successfully!');
      window.setTimeout(() => {
        location.assign('/busdashboard');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
