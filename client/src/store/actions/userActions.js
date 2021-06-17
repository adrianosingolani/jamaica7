import axios from 'axios';

import {
  USER_LOADING,
  USER_SUCCESS,
  USER_FAIL,
  USER_UPDATE_FAIL,
  ALERT_SET,
} from '../types';

export const loadUser = () => async (dispatch) => {
  dispatch({ type: USER_LOADING });

  axios.post('/user/load', { withCredentials: true })
    .then(res => {
      dispatch({
        type: USER_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: USER_FAIL,
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

export const updateUser = (formData) => async (dispatch) => {
  dispatch({ type: USER_LOADING });

  axios.patch('/user/update', formData, { withCredentials: true })
    .then(res => {
      dispatch({
        type: USER_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: ALERT_SET,
        payload: { 
          show: true,
          text: 'Saved',
          severity: 'success',
          timeout: 3000,
        },
      });
    })
    .catch(err => {
      dispatch({
        type: USER_UPDATE_FAIL,
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