import {
    PLAYER_ADD_TRACK,
    PLAYER_PLAY_TRACK,
    PLAYER_PAUSE_TRACK,
    PLAYER_SET_CURRENT_TRACK,
    PLAYER_SET_VOLUME,
    PLAYER_SET_DURATION,
    PLAYER_SET_CURRENT_TIME,
} from '../types';

const initialState = {
    playlist: [],
    playing: false,
    volume: 80,
    currentPlaying: {
        trackIndex: null,
        currentTime: 0,
        duration: 0,
    },
};

export default function recordReducer(state = initialState, { type, payload }) {
    switch (type) {
        case PLAYER_ADD_TRACK:
            return {
                ...state,
                playlist: [...state.playlist, payload]
                // tracks: [...state.playlist.slice(0,2), 'tres', ...state.playlist.slice(2)],
            };
        case PLAYER_SET_CURRENT_TRACK:
            return {
                ...state,
                currentPlaying: {
                    ...state.currentPlaying,
                    trackIndex: payload,
                }
            };
        case PLAYER_SET_DURATION:
            return {
                ...state,
                currentPlaying: {
                    ...state.currentPlaying,
                    duration: payload,
                }
            };
        case PLAYER_SET_CURRENT_TIME:
            return {
                ...state,
                currentPlaying: {
                    ...state.currentPlaying,
                    currentTime: payload,
                }
            };
        case PLAYER_PAUSE_TRACK:
            return {
                ...state,
                playing: false,
            };
        case PLAYER_PLAY_TRACK:
            return {
                ...state,
                playing: true,
            };
        case PLAYER_SET_VOLUME:
            return {
                ...state,
                volume: payload,
            };
        default:
            return state;
    }
}