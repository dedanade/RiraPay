/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alert';
import { stopLoadingBtnSpinner } from './index';

const login_Signup_Update_OrderEmail = async () => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/updateOrders`
    });
  } catch (err) {
    console.log(`🔥🔥🔥 ${err.response.data.message}`);
  }
};

export const signup = async (
  firstName,
  lastName,
  email,
  phoneNumber,
  password,
  submitButton
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
      login_Signup_Update_OrderEmail();
      showAlert('success', 'Signup Successfully!');
      window.setTimeout(() => {
        location.assign('/dashboard');
      }, 1500);
    }
  } catch (err) {
    if (err.response.data.error._message) {
      if (err.response.data.error._message === 'User validation failed') {
        const dataErrors = err.response.data.error.errors;
        const rawErrorMsg = {};
        const keys = Object.keys(dataErrors);

        keys.forEach(key => {
          let message = dataErrors[key].message;

          if (
            dataErrors[key].properties &&
            dataErrors[key].properties.message
          ) {
            message = dataErrors[key].properties.message.replace(
              '`{PATH}`',
              key
            );
          }

          message = message
            .replace('Path ', '')
            .replace(key, '')
            .trim();
          rawErrorMsg[key] = message;
        });

        var validationErrorMessage = [];

        for (const [key, value] of Object.entries(rawErrorMsg)) {
          validationErrorMessage.push(value);
        }
        showAlert('error', validationErrorMessage);
        stopLoadingBtnSpinner(submitButton);
      }
    } else {
      showAlert('error', err.response.data.message);
      stopLoadingBtnSpinner(submitButton);
    }
  }
};

export const login = async (email, password, submitButton) => {
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
      login_Signup_Update_OrderEmail();
      showAlert('success', 'logged in Successfully!');
      window.setTimeout(() => {
        location.assign('/dashboard');
      }, 1500);
    }
  } catch (err) {
    stopLoadingBtnSpinner(submitButton);
    showAlert('error', err.response.data.message);
  }
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

export const forgotPassword = async email => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/forgotPassword',
      data: {
        email
      }
    });
    if (res.data.status === 'success') {
      showAlert(
        'success',
        `Successfully! Check Your email Address ${email} for Instruction`
      );
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const resetPassword = async (password, token) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/users/resetPassword/${token}`,
      data: {
        password
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', `Your Password was succesfully Changed`);
      window.setTimeout(() => {
        location.assign('/dashboard');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
