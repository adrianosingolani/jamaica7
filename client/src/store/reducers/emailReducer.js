import {
    EMAIL_LOADING,
    EMAIL_SUCCESS,
    EMAIL_FAIL,
} from '../types';

const initialState = {
    loading: false,
    confirmed: null,
    resendTo: null,
};

export default function authReducer(state = initialState, { type, payload }) {
    switch (type) {
        case EMAIL_LOADING:
            return {
                ...state,
                loading: true,
                resendTo: null,
            };
        case EMAIL_SUCCESS:
            return {
                loading: false,
                confirmed: true,
                resendTo: null,
            };
        case EMAIL_FAIL:
            return {
                loading: false,
                confirmed: false,
                resendTo: payload?.email ? payload.email : null,
            };
        default:
            return state;
    }
}