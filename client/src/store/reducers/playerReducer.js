import {
    PLAYER_ADD_TRACK,
    PLAYER_PLAY_TRACK,
    PLAYER_PAUSE_TRACK,
    PLAYER_RESUME_TRACK,
} from '../types';

const initialState = {
    playlist: [],
    currentPlaying: null,
    playing: false,
};

export default function recordReducer(state = initialState, { type, payload }) {
    switch (type) {
        case PLAYER_ADD_TRACK:
            return {
                ...state,
                playlist: [...state.playlist, payload]
                // tracks: [...state.playlist.slice(0,2), 'tres', ...state.playlist.slice(2)],
            };
        case PLAYER_PLAY_TRACK:
            return {
                ...state,
                currentPlaying: payload,
            };
        case PLAYER_PAUSE_TRACK:
            return {
                ...state,
                playing: false,
            };
        case PLAYER_RESUME_TRACK:
            return {
                ...state,
                playing: true,
            };
        default:
            return state;
    }
}