// import axios from 'axios';

import {
  PLAYER_ADD_TRACK,
  PLAYER_SET_CURRENT_TRACK,
  PLAYER_PLAY_TRACK,
  PLAYER_PAUSE_TRACK,
  PLAYER_SET_VOLUME,
  PLAYER_SET_DURATION,
  PLAYER_SET_CURRENT_TIME,
  // ALERT_SET,
  // ALERT_RESET,
} from '../types';

export const addTrackToPlaylist = (track) => async (dispatch) => {
  dispatch({
    type: PLAYER_ADD_TRACK,
    payload: track,
  });
};

export const setCurrentTrack = (playing) => async (dispatch) => {
  dispatch({
    type: PLAYER_SET_CURRENT_TRACK,
    payload: playing,
  });
};

export const pauseTrack = () => async (dispatch) => {
  dispatch({
    type: PLAYER_PAUSE_TRACK,
  });
};

export const playTrack = () => async (dispatch) => {
  dispatch({
    type: PLAYER_PLAY_TRACK,
  });
};

export const setVolume = (volume) => async (dispatch) => {
  dispatch({
    type: PLAYER_SET_VOLUME,
    payload: volume,
  });
};

export const setDuration = (duration) => async (dispatch) => {
  dispatch({
    type: PLAYER_SET_DURATION,
    payload: duration,
  });
};

export const setCurrentTime = (currentTime) => async (dispatch) => {
  dispatch({
    type: PLAYER_SET_CURRENT_TIME,
    payload: currentTime,
  });
};