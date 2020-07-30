/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alert';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'logged in Successfully!');
      window.setTimeout(() => {
        location.assign('/dashboard');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const busLogin = async (businessEmail, businessPassword) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/businessUsers/login',
      data: {
        businessEmail,
        businessPassword
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'logged in Successfully!');
      window.setTimeout(() => {
        location.assign('/busdashboard');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const busLogout = async () => {
  try {
    const res = await axios({
      method: 'Get',
      url: '/api/v1/users/logout'
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged out Successfully!');
      window.setTimeout(() => {
        location.assign('/buslogin');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', 'Unable to Log out right now. Try again later');
  }
  console.log(`🔥🔥 ${err.response.data.message}`);
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'Get',
      url: '/api/v1/users/logout'
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged out Successfully!');
      window.setTimeout(() => {
        location.assign('/login');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', 'Unable to Log out right now. Try again later');
  }
  console.log(`🔥🔥 ${err.response.data.message}`);
};
