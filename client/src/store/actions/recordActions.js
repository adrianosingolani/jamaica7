import axios from 'axios';

import {
  RECORD_LOADING,
  RECORD_SUCCESS,
  RECORD_FAIL,
  RECORD_LIST_LOADING,
  RECORD_LIST_SUCCESS,
  RECORD_LIST_FAIL,
  ALERT_SET,
  ALERT_RESET,
} from '../types';

export const listRecords = () => async (dispatch) => {
  dispatch({ type: RECORD_LIST_LOADING });
  dispatch({ type: ALERT_RESET });

  axios.post('/record/list')
    .then(res => {
      dispatch({
        type: RECORD_LIST_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: RECORD_LIST_FAIL,
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

export const loadRecord = (record) => async (dispatch) => {
  dispatch({ type: RECORD_LOADING });
  dispatch({ type: ALERT_RESET });

  axios.post('/record/', {id: record})
    .then(res => {
      dispatch({
        type: RECORD_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: RECORD_FAIL,
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

export const resetSelected = () => async (dispatch) => {
  dispatch({ type: RECORD_FAIL });
}