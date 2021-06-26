// import axios from 'axios';

import {
  // PLAYLIST_LOADING,
  PLAYLIST_ADD_TRACK,
  PLAYLIST_PLAY_TRACK,
  // ALERT_SET,
  // ALERT_RESET,
} from '../types';

export const addTrackToPlaylist = (track) => async (dispatch) => {  
  console.log('add');
  console.log(track);

  dispatch({
    type: PLAYLIST_ADD_TRACK,
    payload: track,
  });
};

export const playTrack = (track) => async (dispatch) => {  
  console.log('play');
  console.log(track);

  dispatch({
    type: PLAYLIST_PLAY_TRACK,
    payload: track,
  });
};