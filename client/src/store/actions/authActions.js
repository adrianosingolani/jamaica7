import axios from 'axios';

import {
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_LOADING,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  AUTH_LOADING,
  AUTH_SUCCESS,
  AUTH_FAIL,
  ALERT_SET,
  ALERT_RESET,
} from '../types';

// import { loadUser } from './userActions';

export const registerUser = (formData, history) => async (dispatch) => {
  dispatch({ type: REGISTER_LOADING });
  dispatch({ type: ALERT_RESET });

  axios.post('/auth/register', formData)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      history.push('/login');
    })
    .catch(err => {
      dispatch({
        type: REGISTER_FAIL,
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
};

export const logInUser = (formData) => async (dispatch) => {
  dispatch({ type: LOGIN_LOADING });
  dispatch({ type: ALERT_RESET });

  axios.post('/auth/login', formData)
    .then(res => {
      // dispatch(loadUser());

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FAIL,
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
};

export const logOutUser = (history) => async (dispatch) => {
  dispatch({ type: LOGOUT_LOADING });

  axios.post('/auth/logout')
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
      history.push('/login');
    })
    .catch(err => {
      dispatch({
        type: LOGOUT_FAIL,
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

export const checkAuth = () => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });

  axios.post('/auth/check', { withCredentials: true })
    .then(res => {
      if (res.data.authenticated) {
        dispatch({
          type: AUTH_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTH_FAIL,
        });
      }
    })
    .catch(err => {
      dispatch({
        type: AUTH_FAIL,
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