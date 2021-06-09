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
    AUTH_LOADING,
    AUTH_SUCCESS,
    AUTH_FAIL,
    USER_FAIL,
} from '../types';

const initialState = {
    loading: true,
    authenticated: false,
};

export default function authReducer(state = initialState, { type, payload }) {
    switch (type) {
        case REGISTER_LOADING:
        case LOGIN_LOADING:
        case AUTH_LOADING:
        case LOGOUT_LOADING:
            return {
                ...state,
                loading: true,
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
        case AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                authenticated: true,
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_FAIL:
        case LOGOUT_FAIL:
        case LOGOUT_SUCCESS:
        case USER_FAIL:
            return {
                ...state,
                loading: false,
                authenticated: false,
            };
        default:
            return state;
    }
}