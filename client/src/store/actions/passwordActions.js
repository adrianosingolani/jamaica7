import axios from 'axios';

import {
  PASSWORD_LOADING,
  PASSWORD_SUCCESS,
  PASSWORD_FAIL,
  ALERT_SET,
} from '../types';

export const changePassword = (password, token) => async (dispatch) => {
  dispatch({ type: PASSWORD_LOADING });

  axios.post('/user/changepassword', { password: password, token: token })
    .then(res => {
      dispatch({
        type: PASSWORD_SUCCESS,
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
          type: PASSWORD_FAIL,
          payload: { email: err.response.data.email }
        });
      } else {
        dispatch({
          type: PASSWORD_FAIL,
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

export const sendPasswordEmail = (email) => async (dispatch) => {
  dispatch({ type: PASSWORD_LOADING });

  axios.post('/user/sendpasswordemail', { email: email })
    .then(res => {
      dispatch({
        type: PASSWORD_SUCCESS,
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
        type: PASSWORD_FAIL,
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