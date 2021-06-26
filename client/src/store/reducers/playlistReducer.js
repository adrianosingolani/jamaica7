import {
    PLAYLIST_LOADING,
    PLAYLIST_ADD_TRACK,
    PLAYLIST_PLAY_TRACK,
} from '../types';

const initialState = {
    loading: false,
    tracks: [],
    currentTrack: null,
};

export default function recordReducer(state = initialState, { type, payload }) {
    switch (type) {
        case PLAYLIST_LOADING:
            return {
                ...state,
                loading: true,
            };
        case PLAYLIST_ADD_TRACK:
            return {
                ...state,
                tracks: [...state.tracks, payload]
                // tracks: [...state.tracks.slice(0,2), 'tres', ...state.tracks.slice(2)],
            };
            case PLAYLIST_PLAY_TRACK:
            return {
                ...state,
                currentTrack: payload,
            };
        default:
            return state;
    }
}