import axios from 'axios';

import {
  USER_LOADING,
  USER_SUCCESS,
  USER_FAIL,
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
          code: 'userfail'
        },
      });
    });
}

export const loadUserWithToken = () => async (dispatch) => {
  dispatch({ type: USER_LOADING });

  axios.post('/user/loadwithtoken', { withCredentials: true })
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
          code: 'userfail'
        },
      });
    });
}

export const setRandomUsername = () => async (dispatch) => {
  dispatch({ type: USER_LOADING });

  axios.post('/user/randomusername', { withCredentials: true })
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
          code: 'userfail'
        },
      });
    });
}