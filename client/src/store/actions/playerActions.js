// import axios from 'axios';

import {
  PLAYER_ADD_TRACK,
  PLAYER_PLAY_TRACK,
  PLAYER_PAUSE_TRACK,
  PLAYER_RESUME_TRACK,
  // ALERT_SET,
  // ALERT_RESET,
} from '../types';

export const addTrackToPlaylist = (track) => async (dispatch) => {  
  dispatch({
    type: PLAYER_ADD_TRACK,
    payload: track,
  });
};

export const playTrack = (playing) => async (dispatch) => {  
  dispatch({
    type: PLAYER_PLAY_TRACK,
    payload: playing,
  });
};

export const pauseTrack = () => async (dispatch) => {  
  dispatch({
    type: PLAYER_PAUSE_TRACK,
  });
};

export const resumeTrack = () => async (dispatch) => {  
  dispatch({
    type: PLAYER_RESUME_TRACK,
  });
};