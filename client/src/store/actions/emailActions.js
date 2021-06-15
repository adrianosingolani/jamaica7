import axios from 'axios';

import {
  EMAIL_LOADING,
  EMAIL_SUCCESS,
  EMAIL_FAIL,
  ALERT_SET,
} from '../types';

export const confirmEmail = (token) => async (dispatch) => {
  dispatch({ type: EMAIL_LOADING });

  axios.post('/user/confirmemail', { token: token })
    .then(res => {
      dispatch({
        type: EMAIL_SUCCESS,
      });
      dispatch({
        type: ALERT_SET,
        payload: {
          show: true,
          text: res.data.message,
          severity: 'success',
        },
      });
    })
    .catch(err => {
      if (err?.response?.data.email) {
        dispatch({
          type: EMAIL_FAIL,
          payload: { email: err.response.data.email }
        });
      } else {
        dispatch({
          type: EMAIL_FAIL,
        });
      }

      dispatch({
        type: ALERT_SET,
        payload: {
          show: true,
          text: err?.response?.data.message || err.message,
          severity: 'error',
        },
      });
    });
}

export const sendConfirmationEmail = (email, token) => async (dispatch) => {
  dispatch({ type: EMAIL_LOADING });

  axios.post('/user/sendconfirmationemail', { email: email, token: token })
    .then(res => {
      dispatch({
        type: EMAIL_SUCCESS,
      });
      dispatch({
        type: ALERT_SET,
        payload: {
          show: true,
          text: res.data.message,
          severity: 'success',
        },
      });
    })
    .catch(err => {
      dispatch({
        type: EMAIL_FAIL,
      });

      dispatch({
        type: ALERT_SET,
        payload: {
          show: true,
          text: err?.response?.data.message || err.message,
          severity: 'error',
        },
      });
    });
}