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
  USER_LOADING,
  USER_SUCCESS_LOGGED,
  USER_SUCCESS_NOT_LOGGED,
  USER_FAIL,
  ALERT_SET,
  ALERT_RESET,
} from '../types';

export const registerUser = (formData, history) => async (dispatch) => {
  dispatch({ type: REGISTER_LOADING });
  dispatch({ type: ALERT_RESET });

  axios.post('/auth/register', formData)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: { user: res.data.user },
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
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: res.data.user },
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

export const loadUser = () => async (dispatch) => {
  dispatch({ type: USER_LOADING });

  axios.post('/auth/user')
    .then(res => {
      dispatch({
        type: USER_SUCCESS_LOGGED,
        payload: { user: res.data.user },
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

export const checkAuth = () => async (dispatch) => {
  dispatch({ type: USER_LOADING });

  axios.post('/auth/check')
    .then(res => {
      if (res.data.authenticated) {
        dispatch(loadUser());
      } else {
        dispatch({
          type: USER_SUCCESS_NOT_LOGGED,
        });
      }
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