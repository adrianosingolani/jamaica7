import {
    USER_LOADING,
    USER_SUCCESS,
    USER_FAIL,
    USER_RESET,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS
} from '../types';

const initialState = {
    loading: false,
    data: null,
};

export default function authReducer(state = initialState, { type, payload }) {
    switch (type) {
        case USER_LOADING:
            return {
                ...state,
                loading: true,
            };
        case USER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: payload.user,
            };
        case USER_FAIL:
        case USER_RESET:
        case LOGOUT_FAIL:
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                data: null,
            };
        default:
            return state;
    }
}