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
} from '../types';

const initialState = {
    isLoading: false,
    error: null,
    isAuthenticated: false,
    user: null,
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
        case USER_SUCCESS_LOGGED:
            return {
                ...state,
                isLoading: false,
                error: null,
                isAuthenticated: true,
                user: payload,
            };
        case LOGOUT_SUCCESS:
        case USER_SUCCESS_NOT_LOGGED:
            return {
                ...state,
                isLoading: false,
                error: null,
                isAuthenticated: false,
                user: null,
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