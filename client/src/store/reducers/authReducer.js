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

const initialState = {
    isLoading: false,
    error: null,
};

export default function authReducer(state = initialState, { type, payload }) {
    switch (type) {
        case REGISTER_LOADING:
        case LOGIN_LOADING:
        case USER_LOADING:
        case LOGOUT_LOADING:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
            };
        case USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case USER_FAIL:
        case LOGOUT_FAIL:
            return {
                ...state,
                isLoading: false,
                error: payload.error,
            };
        default:
            return state;
    }
}