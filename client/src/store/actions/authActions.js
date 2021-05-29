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
  USER_SUCCESS,
  USER_FAIL,
} from '../types';

export const registerUser = (formData, history) => async (dispatch) => {
  dispatch({ type: REGISTER_LOADING });

  axios.post('/auth/register', formData)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: { user: res.data.user },
      });
      history.push('/usersettings');
    })
    .catch(err => {
      dispatch({
        type: REGISTER_FAIL,
        payload: { error: err?.response?.data.message || err.message },
      });
    });
};

export const logInUser = (formData, history) => async (dispatch) => {
  dispatch({ type: LOGIN_LOADING });

  axios.post('/auth/login', formData)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: res.data.user },
      });
      history.push('/usersettings');
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FAIL,
        payload: { error: err?.response?.data.message || err.message },
      });
    });
};

export const logOutUser = (history) =>  async (dispatch) => {
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
        payload: { error: err?.response?.data.message || err.message },
      });
    });
}


export const loadUser = (formData) => async (dispatch) => {
  dispatch({ type: USER_LOADING });

  axios.post('/auth/user', formData)
    .then(res => {
      console.log(res);
      dispatch({
        type: USER_SUCCESS,
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: USER_FAIL,
        payload: { error: 'something went wrong' },
      });
    });
}