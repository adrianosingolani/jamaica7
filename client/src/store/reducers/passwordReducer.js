import {
    PASSWORD_LOADING,
    PASSWORD_SUCCESS,
    PASSWORD_FAIL,
} from '../types';

const initialState = {
    loading: false,
    confirmed: null,
    resendTo: null,
};

export default function authReducer(state = initialState, { type, payload }) {
    switch (type) {
        case PASSWORD_LOADING:
            return {
                ...state,
                loading: true,
                resendTo: null,
            };
        case PASSWORD_SUCCESS:
            return {
                loading: false,
                confirmed: true,
                resendTo: null,
            };
        case PASSWORD_FAIL:
            return {
                loading: false,
                confirmed: false,
                resendTo: payload?.email ? payload.email : null,
            };
        default:
            return state;
    }
}